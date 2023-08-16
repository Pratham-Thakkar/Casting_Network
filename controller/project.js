const Project = require("../model/project");
const { v4: uuidv4 } = require("uuid");
const LocationEntity = require("../model/mapping/locationEntity");
const { fetchLocation } = require("../utils/addLocations");
const { dateInRange } = require("../utils/dateInRange");
const { indvidualDate } = require("../utils/individualDate");
const Date = require("../model/lookup/date");

exports.addProject = async (req, res) => {
  try {
    const {
      body: {
        createdBy,
        projectName,
        internalProjectName,
        projectType,
        union,
        projectDescription,
        projectLocation,
        published,
        active,
        showAuditionLocationToTalent,
        auditionLocation,
        auditionDateInRange,
        auditionDate,
        showWorkLocation,
        workLocation,
        workDateInRange,
        workDate,
        synopsis,
      },
    } = req;
    if (
      !createdBy ||
      !projectName ||
      !internalProjectName ||
      !projectType ||
      !union ||
      !projectDescription ||
      !projectLocation ||
      !published ||
      !active ||
      !showAuditionLocationToTalent ||
      !auditionLocation ||
      !auditionDateInRange ||
      !auditionDate ||
      !showWorkLocation ||
      !workLocation ||
      !workDateInRange ||
      !workDate ||
      !synopsis
    )
      throw Error("Required Field is not given");

    const project = new Project({
      projectId: uuidv4(),
      createdBy,
      projectName,
      internalProjectName,
      projectType,
      union,
      projectDescription,
      projectLocation,
      published,
      active,
      showAuditionLocationToTalent,
      auditionLocation,
      auditionDateInRange,
      auditionDate,
      showWorkLocation,
      workLocation,
      workDateInRange,
      workDate,
      synopsis,
    });

    await project.save();

    // fetch location array
    const locations = await fetchLocation(
      project.projectId,
      projectLocation,
      auditionLocation,
      workLocation
    );

    const result = await LocationEntity.insertMany(locations);
    if (!result) throw Error("Unable to add locations");

    //fetch date array
    if (workDateInRange === "true") {
      const dates = await dateInRange(
        workDate,
        project.projectId,
        "projectWork"
      );
      await Date.insertMany(dates);
    } else {
      const dates = await indvidualDate(
        workDate.split(","),
        project.projectId,
        "projectWork"
      );
      await Date.insertMany(dates);
    }
    if (auditionDateInRange === "true") {
      const dates = await dateInRange(
        auditionDate,
        project.projectId,
        "projectAudition"
      );
      await Date.insertMany(dates);
    } else {
      const dates = await indvidualDate(
        auditionDate.split(","),
        project.projectId,
        "projectAudition"
      );
      await Date.insertMany(dates);
    }

    await res.send({
      status: "success",
      message: "project added",
      data: project,
    });
  } catch (e) {
    res.status(500).send({ status: "failed", message: e.message });
  }
};

exports.listProject = async (req, res) => {
  try {
    const {
      body: { userId },
    } = req;
    if (!userId) throw Error("User id is not given");
    const projects = await Project.aggregate([
      {
        $lookup: {
          from: "users",
          localField: "createdBy",
          foreignField: "userId",
          as: "creatordetails",
          pipeline: [
            {
              $project: {
                _id: 0,
                firstName: 1,
                email: 1,
              },
            },
          ],
        },
      },
      {
        $lookup: {
          from: "locationentities",
          localField: "projectId",
          foreignField: "entityId",
          pipeline: [
            {
              $project: {
                _id: 0,
                entityType: 1,
                locationId: 1,
                creatordetails: 1,
              },
            },
            {
              $lookup: {
                from: "locations",
                localField: "locationId",
                foreignField: "id",
                pipeline: [
                  {
                    $project: {
                      _id: 0,
                      id: 0,
                      __v: 0,
                    },
                  },
                ],
                as: "locationName",
              },
            },
          ],
          as: "locations",
        },
      },
    ]);
    if (!projects) throw Error("No project is created by this user");
    res.send({ status: "success", data: projects });
  } catch (e) {
    res.status(500).send({ status: "failed", message: e.message });
  }
};

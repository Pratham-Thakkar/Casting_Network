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
    if (req.userId !== userId) throw Error("You can only view your projects");
    const projects = await Project.aggregate([
      {
        $match: {
          createdBy: userId,
        },
      },
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

exports.updateProject = async (req, res) => {
  try {
    const {
      params: { projectId },
    } = req;
    const {
      body: { projectName },
    } = req;
    if (!projectId) throw Error("Project Id is necessary");
    const project = await Project.findOne({ projectId });
    if (!project) throw Error("This project does not exist");
    if (project.createdBy !== req.userId)
      throw Error("You can only update your project");
    await project.updateOne({ projectName });
    res.send({ status: "success", message: "project updated" });
  } catch (e) {
    res.status(500).send({ status: "failed", message: e.message });
  }
};

exports.deleteProject = async (req, res) => {
  try {
    const {
      params: { projectId },
    } = req;
    if (!projectId) throw Error("Project Id is necessary");
    const project = await Project.findOne({ projectId });
    if (!project) throw Error("This project does not exist");
    if (project.createdBy !== req.userId)
      throw Error("You can only delete your project");
    await project.deleteOne({ projectId });
    res.send({ status: "success", message: "project deleted" });
  } catch (e) {
    res.status(500).send({ status: "failed", message: e.message });
  }
};

exports.duplicateProject = async (req, res) => {
  try {
    const {
      params: { projectId },
    } = req;
    if (!projectId) throw Error("Project Id is necessary");
    const project = await Project.findOne({ projectId });
    if (!project) throw Error("This project does not exist");
    if (project.createdBy !== req.userId)
      throw Error("You can only duplicate project created by you");
    const details = { ...project };
    delete details._doc._id,
      delete details._doc.__v,
      delete details._doc.createdAt,
      delete details._doc.updatedAt;
    const newProject = new Project(details._doc);
    newProject.projectId = uuidv4();
    await newProject.save();
    res.send({
      status: "success",
      message: "project duplicatted",
      data: newProject,
    });
  } catch (e) {
    res.status(500).send({ status: "failed", message: e.message });
  }
};

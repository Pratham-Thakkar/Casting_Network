const ProjectType = require("../model/lookup/projecttype");

exports.addProjectType = async (req, res) => {
  try {
    const {
      body: { projectType },
    } = req;
    if (!projectType) throw Error("project type is not given");
    const result = await ProjectType.findOne({
      projectType: projectType.toLowerCase(),
    });
    if (result) throw Error("This project type already exits");
    const newProjectType = new ProjectType({
      projectType: projectType.toLowerCase(),
    });
    await newProjectType.save();
    return res.send({
      status: "success",
      message: "project type added",
      data: newProjectType,
    });
  } catch (e) {
    res.status(500).send({ status: "failed", message: e.message });
  }
};

exports.getProjectType = async (req, res) => {
  try {
    const projectTypes = await ProjectType.find({}, { _id: 0, __v: 0 });
    if (!projectTypes) throw Error("No project type exist");
    res.send({ status: "success", data: projectTypes });
  } catch (e) {
    res.status(500).send({ status: "failed", menubar: e.message });
  }
};

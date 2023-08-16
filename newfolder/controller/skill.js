const Skill = require("../model/lookup/skill");

exports.addSkills = async (req, res) => {
  try {
    const {
      body: { skillName },
    } = req;
    if (!skillName) throw Error("Skill name is not given");
    const result = await Skill.findOne({
      skillName: skillName.toLowerCase(),
    });
    if (result) throw Error("This skill name already exits");
    const newSkill = new Skill({
      skillName: skillName.toLowerCase(),
    });
    await newSkill.save();
    return res.send({
      status: "success",
      message: "Skill added",
      data: newSkill,
    });
  } catch (e) {
    res.status(500).send({ status: "failed", message: e.message });
  }
};

exports.getSkills = async (req, res) => {
  try {
    const skills = await Skill.find({}, { _id: 0, __v: 0 });
    if (!skills) throw Error("No skills exist");
    res.send({ status: "success", data: skills });
  } catch (e) {
    res.status(500).send({ status: "failed", menubar: e.message });
  }
};

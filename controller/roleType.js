const RoleType = require("../model/lookup/roletype");

exports.addRoleType = async (req, res) => {
  try {
    const {
      body: { roleType },
    } = req;
    if (!roleType) throw Error("Role type is not given");
    const result = await RoleType.findOne({
      roleType: roleType.toLowerCase(),
    });
    if (result) throw Error("This Role type already exits");
    const newRoleType = new RoleType({
      roleType: roleType.toLowerCase(),
    });
    await newRoleType.save();
    return res.send({
      status: "success",
      message: "Role type added",
      data: newRoleType,
    });
  } catch (e) {
    res.status(500).send({ status: "failed", message: e.message });
  }
};

exports.getRoleType = async (req, res) => {
  try {
    const roleTypes = await RoleType.find({}, { _id: 0, __v: 0 });
    if (!roleTypes) throw Error("No Role type exist");
    res.send({ status: "success", data: roleTypes });
  } catch (e) {
    res.status(500).send({ status: "failed", menubar: e.message });
  }
};

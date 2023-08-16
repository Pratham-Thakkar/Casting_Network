const Ethinicity = require("../model/lookup/ethnicity");

exports.addEthnicity = async (req, res) => {
  try {
    const {
      body: { ethnicityType },
    } = req;
    if (!ethnicityType) throw Error("ethinicity type is not given");
    const result = await Ethinicity.findOne({
      ethnicityType: ethnicityType.toLowerCase(),
    });
    if (result) throw Error("This ethnicity already exits");
    const newEthnicity = new Ethinicity({
      ethnicityType: ethnicityType.toLowerCase(),
    });
    await newEthnicity.save();
    return res.send({
      status: "success",
      message: "ethnicity added",
      data: newEthnicity,
    });
  } catch (e) {
    res.status(500).send({ status: "failed", message: e.message });
  }
};

exports.getEthnicity = async (req, res) => {
  try {
    const ethicities = await Ethinicity.find({}, { _id: 0, __v: 0 });
    if (!ethicities) throw Error("No ethnicities exist");
    res.send({ status: "success", data: ethicities });
  } catch (e) {
    res.status(500).send({ status: "failed", menubar: e.message });
  }
};

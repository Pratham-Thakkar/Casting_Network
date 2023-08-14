const Gender = require("../model/lookup/gender");

exports.addGender = async (req, res) => {
  try {
    const {
      body: { genderType },
    } = req;
    if (!genderType) throw Error("gender type is not given");
    const result = await Gender.findOne({
      genderType: genderType.toLowerCase(),
    });
    if (result) throw Error("This gender already exits");
    const newGender = new Gender({
      genderType: genderType.toLowerCase(),
    });
    await newGender.save();
    return res.send({
      status: "success",
      message: "gender added",
      data: newGender,
    });
  } catch (e) {
    res.status(500).send({ status: "failed", message: e.message });
  }
};

exports.getGender = async (req, res) => {
  try {
    const genders = await Gender.find({}, { _id: 0, __v: 0 });
    if (!genders) throw Error("No genders exist");
    res.send({ status: "success", data: genders });
  } catch (e) {
    res.status(500).send({ status: "failed", menubar: e.message });
  }
};

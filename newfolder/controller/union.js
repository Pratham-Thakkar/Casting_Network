const Union = require("../model/lookup/union");

exports.addUnion = async (req, res) => {
  try {
    const {
      body: { unionName },
    } = req;
    if (!unionName) throw Error("Union name is not given");
    const result = await Union.findOne({
      unionName: unionName.toLowerCase(),
    });
    if (result) throw Error("This union name already exits");
    const newUnion = new Union({
      unionName: unionName.toLowerCase(),
    });
    await newUnion.save();
    return res.send({
      status: "success",
      message: "Union added",
      data: newUnion,
    });
  } catch (e) {
    res.status(500).send({ status: "failed", message: e.message });
  }
};

exports.getUnion = async (req, res) => {
  try {
    const unions = await Union.find({}, { _id: 0, __v: 0 });
    if (!unions) throw Error("No unions exist");
    res.send({ status: "success", data: unions });
  } catch (e) {
    res.status(500).send({ status: "failed", menubar: e.message });
  }
};

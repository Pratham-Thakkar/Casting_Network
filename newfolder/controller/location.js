const Location = require("../model/lookup/location");

exports.addLocation = async (req, res) => {
  try {
    const {
      body: { locationName },
    } = req;
    if (!locationName) throw Error("Location name is required");

    const location = new Location({ locationName });
    const result = await location.save();

    if (!result) throw Error("Unable to add");

    res.send({ status: "success", message: "location added", data: location });
  } catch (e) {
    res.status(500).send({ status: "failed", message: e.message });
  }
};
exports.getLocation = async (req, res) => {
  try {
    const locations = await Location.find({}, { _id: 0, __v: 0 });
    if (!locations) throw Error("No locations exist");
    res.send({ status: "success", data: locations });
  } catch (e) {
    res.status(500).send({ status: "failed", menubar: e.message });
  }
};

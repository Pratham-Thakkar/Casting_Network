const bcrypt = require("bcrypt");
const generator = require("generate-password");
const Location = require("../model/lookup/location");
const { verificationEmail } = require("../utils/emailer");
const User = require("../model/user");

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

exports.verifyCd = async (req, res) => {
  try {
    const {
      params: { userId },
    } = req;
    const user = await User.findOne({ userId });
    if (!user) throw Error("User does not exist");
    if (user.userType !== "cd" && user.verified === false)
      throw Error("User type is not CD");

    const password = generator.generate({ length: 6, numbers: true });
    user.password = password;
    await User.updateOne(
      { userId },
      {
        verified: true,
        password: await bcrypt.hash(password, 10),
      }
    );
    const result = await verificationEmail(
      user.email,
      user.firstName,
      password
    );
    if (!result) throw Error("Unable to send email");
    res.send({ status: "success", message: "cd verified" });
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

const bcrypt = require("bcrypt");
const generator = require("generate-password");
const { verificationEmail } = require("../utils/emailer");
const User = require("../model/user");

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

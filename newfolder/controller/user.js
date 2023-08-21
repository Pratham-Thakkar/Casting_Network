const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = require("../model/user");
const emailer = require("../utils/emailer");
const Location = require("../model/lookup/location");

exports.addUser = async (req, res) => {
  try {
    const {
      body: {
        firstName,
        lastName,
        email,
        countryCode,
        mobileNumber,
        password,
        castingMarket,
        userType,
        allowNotifications,
      },
    } = req;

    if (
      !firstName ||
      !lastName ||
      !email ||
      !mobileNumber ||
      !password ||
      !userType
    )
      throw Error("Enter all the required fields");

    const location = await Location.findOne({
      locationName: castingMarket.toLowerCase(),
    });
    const user = new User({
      firstName,
      lastName,
      email,
      countryCode,
      mobileNumber,
      password,
      userType,
      castingMarket: location.id,
      allowNotifications,
    });
    const emailSent = emailer.sendWelcomeEmail(email, user.firstName);
    if (!emailSent) throw Error("Unable to send welcome email");
    if (userType === "cd") user.forcedPasswordReset = true;
    if (userType === "admin") user.verified = true;
    const result = await user.save();
    if (!result) throw Error("Unable to add user");
    res.send({ status: "success", message: "user added", data: user });
  } catch (e) {
    res.status(500).send({ status: "failed", message: e.message });
  }
};

exports.login = async (req, res) => {
  try {
    const {
      body: { email, password },
    } = req;
    if (!email || !password) throw Error("required field is empty");
    const user = await User.findOne({ email });
    if (user.forcedPasswordReset) {
      return res.status(302).send({
        status: "failed",
        message: "CD need to update their password before logging in",
      });
    }
    const result = await bcrypt.compare(password, user.password);
    if (!result) throw Error("Email or password is incorrect");
    const token = jwt.sign(
      {
        exp: Math.floor(Date.now() / 1000) + 60 * 60,
        data: {
          userId: user.userId,
          userType: user.userType,
          verify: user.verified,
          status: user.status,
        },
      },
      process.env.SECRET_KEY
    );

    await user.updateOne({ lastLogin: Date.now() });
    return res.send({
      status: "success",
      message: "logged in sucessfully",
      token,
    });
  } catch (e) {
    res.status(500).send({ status: "failed", message: e.message });
  }
};

exports.updatePassword = async (req, res) => {
  try {
    const {
      body: { oldPassword, newPassword, confirmPassword, email },
    } = req;
    if (!oldPassword || !newPassword || !confirmPassword)
      throw Error("required field is empty");

    const user = await User.findOne({ email });

    if (!(await bcrypt.compare(oldPassword, user.password)))
      throw Error("Your old password is incorrect");

    if (newPassword !== confirmPassword)
      throw Error("Your new password and confirm password are different");

    if (await bcrypt.compare(newPassword, user.password))
      throw Error("Your new password and old password cannot be same");
    user.password = newPassword;
    user.forcedPasswordReset = false;
    await user.save();
    return res.send({ status: "success", message: "password updated" });
  } catch (e) {
    res.status(500).send({ status: "failed", message: e.message });
  }
};

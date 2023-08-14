const mongoose = require("mongoose");
const { v4: uuidv4 } = require("uuid");
const bcrypt = require("bcrypt");

const Schema = mongoose.Schema;

const UserSchema = new Schema(
  {
    userId: {
      type: String,
      unique: true,
    },
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    countryCode: {
      type: String,
      required: true,
    },
    mobileNumber: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    castingMarket: {
      type: String,
    },
    userType: {
      type: String,
      default: "talent",
      enum: ["talent", "cd", "admin"],
    },
    lastLogin: {
      type: Date,
    },
    forcedPasswordReset: {
      type: Boolean,
      default: false,
    },
    profilePicUrl: {
      type: String,
    },
    verified: {
      type: Boolean,
      default: false,
    },
    status: {
      type: String,
      enum: ["Active", "Inactive", "Blocked"],
      default: "Active",
    },
    acceptTermsAndConditions: {
      type: Boolean,
      default: true,
    },
    allowNotifications: {
      type: Boolean,
      default: true,
    },
    token: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

UserSchema.pre("save", async function () {
  this.userId = uuidv4();
  this.email = this.email.toLowerCase();
  this.password = await bcrypt.hash(this.password, 10);
});

module.exports = mongoose.model("User", UserSchema);

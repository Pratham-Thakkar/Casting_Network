const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { v4: uuidv4 } = require("uuid");

const PhotoSchema = new Schema(
  {
    id: {
      type: String,
      required: true,
      unique: true,
    },
    roleId: {
      type: String,
      required: true,
    },
    url: String,
  },
  {
    timestamps: true,
  }
);

PhotoSchema.pre("save", function () {
  this.id = uuidv4();
});

module.exports = mongoose.model("Photo", PhotoSchema);

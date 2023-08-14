const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { v4: uuidv4 } = require("uuid");

const ProjectTypeSchema = new Schema({
  id: {
    type: String,
    unique: true,
  },
  projectType: {
    type: String,
    required: true,
  },
});

ProjectTypeSchema.pre("save", function () {
  this.id = uuidv4();
});

module.exports = mongoose.model("ProjectType", ProjectTypeSchema);

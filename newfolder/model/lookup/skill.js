const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { v4: uuidv4 } = require("uuid");

const SkillSchema = new Schema({
  id: {
    type: String,
    unique: true,
  },
  skillName: {
    type: String,
    required: true,
  },
});

SkillSchema.pre("save", function () {
  this.id = uuidv4();
});

module.exports = mongoose.model("Skill", SkillSchema);

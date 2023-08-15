const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { v4: uuidv4 } = require("uuid");

const SkillEntitySchema = new Schema({
  id: {
    type: String,
    required: true,
    unique: true,
  },
  entityId: {
    type: String,
    required: true,
  },
  skillId: {
    type: String,
    required: true,
  },
  entityType: {
    type: String,
    required: true,
    enum: ["User", "Role"],
  },
});

SkillEntitySchema.pre("save", function () {
  this.id = uuidv4();
});

module.exports = mongoose.model("SkillEntity", SkillEntitySchema);

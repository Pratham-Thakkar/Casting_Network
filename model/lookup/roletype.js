const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { v4: uuidv4 } = require("uuid");

const RoleTypeSchema = new Schema({
  id: {
    type: String,
    unique: true,
  },
  roleType: {
    type: String,
    required: true,
  },
});

RoleTypeSchema.pre("save", function () {
  this.id = uuidv4();
});

module.exports = mongoose.model("RoleType", RoleTypeSchema);

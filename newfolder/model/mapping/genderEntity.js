const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { v4: uuidv4 } = require("uuid");

const GenderEntitySchema = new Schema({
  id: {
    type: String,
    required: true,
    unique: true,
  },
  entityId: {
    type: String,
    required: true,
  },
  genderId: {
    type: String,
    required: true,
  },
});

GenderEntitySchema.pre("save", function () {
  this.id = uuidv4();
});

module.exports = mongoose.model("GenderEntity", GenderEntitySchema);

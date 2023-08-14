const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { v4: uuidv4 } = require("uuid");

const GenderSchema = new Schema({
  id: {
    type: String,
    unique: true,
  },
  genderType: {
    type: String,
    required: true,
  },
});

GenderSchema.pre("save", function () {
  this.id = uuidv4();
});

module.exports = mongoose.model("Gender", GenderSchema);

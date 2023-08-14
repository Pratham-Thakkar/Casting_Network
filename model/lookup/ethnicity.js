const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { v4: uuidv4 } = require("uuid");

const EthnicitySchema = new Schema({
  id: {
    type: String,
    unique: true,
  },
  ethnicityType: {
    type: String,
    required: true,
  },
});

EthnicitySchema.pre("save", function () {
  this.id = uuidv4();
});

module.exports = mongoose.model("Ethinicity", EthnicitySchema);

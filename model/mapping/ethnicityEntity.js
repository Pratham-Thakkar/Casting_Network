const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { v4: uuidv4 } = require("uuid");

const EthnicityEntitySchema = new Schema({
  id: {
    type: String,
    required: true,
    unique: true,
  },
  entityId: {
    type: String,
    required: true,
  },
  ethnicityId: {
    type: String,
    required: true,
  },
});

EthnicityEntitySchema.pre("save", function () {
  this.id = uuidv4();
});

module.exports = mongoose.model("EthnicityEntity", EthnicityEntitySchema);

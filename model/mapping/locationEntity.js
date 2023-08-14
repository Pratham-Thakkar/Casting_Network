const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { v4: uuidv4 } = require("uuid");

const LocationEntitySchema = new Schema({
  id: {
    type: String,
    required: true,
    unique: true,
  },
  entityId: {
    type: String,
    required: true,
  },
  LocationId: {
    type: String,
    required: true,
  },
  enitityType: {
    type: String,
    enum: ["audition", "work", "project", "role"],
  },
});

LocationEntitySchema.pre("save", function () {
  this.id = uuidv4();
});

module.exports = mongoose.model("LocationEntity", LocationEntitySchema);

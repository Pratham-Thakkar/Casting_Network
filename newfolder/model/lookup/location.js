const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { v4: uuidv4 } = require("uuid");

const LocationSchema = new Schema({
  id: {
    type: String,
    unique: true,
  },
  locationName: {
    type: String,
    unique: true,
    required: true,
  },
});

LocationSchema.pre("save", function () {
  this.locationName = this.locationName.toLowerCase();
  this.id = uuidv4();
});

module.exports = mongoose.model("Location", LocationSchema);

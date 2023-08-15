const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const LocationEntitySchema = new Schema({
  id: {
    type: String,
    unique: true,
  },
  entityId: {
    type: String,
    required: true,
  },
  locationId: {
    type: String,
    required: true,
  },
  entityType: {
    type: String,
    enum: [
      "roleAudition",
      "roleWork",
      "project",
      "role",
      "projectAudition",
      "projectWork",
    ],
  },
});

module.exports = mongoose.model("LocationEntity", LocationEntitySchema);

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const DateSchema = new Schema({
  id: {
    type: String,
    required: true,
    unique: true,
  },
  date: {
    type: Date,
    required: true,
  },
  entityId: {
    type: String,
    required: true,
  },
  entityType: {
    type: String,
    enum: ["projectWork", "projectAudition", "roleAudition", "roleWork"],
  },
});

module.exports = mongoose.model("Date", DateSchema);

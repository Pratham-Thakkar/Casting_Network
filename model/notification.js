const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const NotificationSchema = new Schema({
  id: {
    type: String,
    unique: true,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ["sent", "in-progress", "failed", "pending"],
  },
});

module.exports = mongoose.model("Notification", NotificationSchema);

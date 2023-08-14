const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { v4: uuidv4 } = require("uuid");

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
  enitityType: {
    type: String,
    enum: ["work", "audition"],
  },
});

DateSchema.pre("save", function () {
  this.id = uuidv4();
});

module.exports = mongoose.model("Date", DateSchema);

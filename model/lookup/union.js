const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { v4: uuidv4 } = require("uuid");

const UnionSchema = new Schema({
  id: {
    type: String,
    unique: true,
  },
  unionName: {
    type: String,
    required: true,
  },
});

UnionSchema.pre("save", function () {
  this.id = uuidv4();
});

module.exports = mongoose.model("Union", UnionSchema);

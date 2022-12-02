const mongoose = require("mongoose");
const file = {
  name: { type: String },
  age: { type: Number },
  unit: { type: String },
  scores: { type: Number },
};

const userSchema = new mongoose.Schema(file);
const userModel = mongoose.model("student", userSchema);

module.exports = userModel;

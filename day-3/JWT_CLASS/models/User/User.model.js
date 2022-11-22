const mongoose = require("mongoose");

const file = {
  name: { type: String },
  email: { type: String, unique: true },
  password: { type: String },
  age: { type: Number },
};
const UserSchema = new mongoose.Schema(file);

const UserModel = mongoose.model("user", UserSchema);

module.exports = UserModel;

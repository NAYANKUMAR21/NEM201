const studentModel = require("../models/user.model");

async function createStudent({ name, age }) {
  try {
    if (age >= 28) {
      return {
        message: "No allowed",
        desc: "student cannot be created",
      };
    }
    const user = new studentModel({ name, age });
    await user.save();
    return {
      message: "OK",
      desc: "Student created successfully",
    };
  } catch (er) {
    return er.message;
  }
}

module.exports = createStudent
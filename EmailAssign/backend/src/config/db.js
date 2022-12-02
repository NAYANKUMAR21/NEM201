const mongoose = require("mongoose");
const connect = async () => {
  try {
    mongoose.connect(
      "mongodb+srv://NAYAN:NAYAN@cluster0.u60zxbv.mongodb.net/ASSIGN?retryWrites=true&w=majority"
    );
  } catch (er) {
    console.log(er.message, "from connection");
  }
};
module.exports = connect
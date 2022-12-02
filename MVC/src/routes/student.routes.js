const { Router } = require("express"); //student routes here in this folder
const app = Router();
const studentModel = require("../models/user.model");

app.get("/", async (req, res) => {
  try {
    // const user = await studentModel.findOne();

    return res.send(user);
  } catch (er) {
    console.log(er.message);
    return res.send(re.mesasge);
  }
});

app.post("/", async (req, res) => {
  const { name, age, unit, scores } = req.body;
  try {
    const { message } = await createStudent({ name, age, unit, scores });
    
  } catch (er) {
    return res.send(`${er.mesasge} from post student`);
  }
});
module.exports = app;

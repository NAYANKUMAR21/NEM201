const express = require("express");
const connect = require("./db");
const app = express();
const userRouter = require("./user.router");
const cors = require("express");

app.use(express.json());
app.use(cors());

app.use("/user", userRouter);

app.get("/", async (req, res) => {
  try {
    return res.send("HELLLO HOME PAGE");
  } catch (er) {
    return res.send(`${er.message}`);
  }
});

app.listen(8080, async () => {
  try {
    await connect();
    console.log(`listening on http://localhost:8080`);
  } catch (er) {
    console.log(er.message);
  }
});

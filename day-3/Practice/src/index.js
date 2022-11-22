require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connect = require("./config/db")
const jwtRouter = require("./features/auth/user.router");
const app = express();
const PORT = process.env.PORT || 8080;

app.use(cors());
app.use(express.json());
app.use("/jwt", jwtRouter);
app.get("/", async (req, res) => {
  try {
    res.send("HELLO ITS PRACTICE");
  } catch (er) {
    res.send("GET REQ FAILED");
  }
});

app.listen(PORT, async (req, res) => {
  try {
    await connect()
    console.log(`listening on http://localhost:${PORT}`);
  } catch (er) {
    res.send("CONNECTION FAILED");
  }
});

const express = require("express");
const app = express();
const cors = require("cors");
const { default: mongoose } = require("mongoose");
const UserModel = require("./models/User/User.model");
const jwt = require("jsonwebtoken");
const { default: axios } = require("axios");

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("HELLO");
});

app.post("/signup", async (req, res) => {
  try {
    const user = new UserModel(req.body);
    await user.save();
    return res.status(201).send("User created successfully");
  } catch (er) {
    res.send("CANNOT BE CREATED");
  }
});

app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await UserModel.findOne({ email, password });
    if (user) {
      const token = jwt.sign(
        { id: user._id, name: user.name, age: user.age },
        "SECRET123",
        {
          expiresIn: "7 days",
        }
      );
      const refreshToken = jwt.sign(
        { id: user._id, name: user.name, age: user.age },
        "REFRESH",
        { expiresIn: "28 days" }
      );

      return res.send({ message: "LOGIN SUCCESS", token, refreshToken });
    }
    return res.status(401).send("INVALID CREDIANTAILS");
  } catch (er) {
    res.send("CANNOT BE LOGGED IN");
  }
});

app.get("/user/:id", async (req, res) => {
  let { id } = req.params;
  const token = req.headers.token;
  console.log(req.headers);
  if (!token) {
    return res.send("Un authorized");
  }
  try {
    const verify = jwt.verify(token, "SECRET123");
    if (verify) {
      const user = await UserModel.findOne({ _id: id });
      res.send(user);
    }
  } catch (er) {
    return res.send("INVALID TOKEN");
  }
});

app.post("/refresh", async (req, res) => {
  const refreshToken = req.headers.token;
  if (!refreshToken) {
    return res.send("TOKEN NOT PRESENT");
  }
  try {
    const verify = jwt.verify(refreshToken, "REFRESH");
    if (verify) {
      const newToken = jwt.sign(
        { id: verify.id, name: verify.name },
        "SECRET123",
        { expiresIn: "7 days" }
      );
      return res.send({ token: newToken });
    }
  } catch (er) {
    res.send(`${e.message} from refresh`);
  }
});

mongoose
  .connect(
    "mongodb+srv://NAYAN:NAYAN@cluster0.u60zxbv.mongodb.net/B21?retryWrites=true&w=majority"
  )
  .then(() => {
    app.listen(8080, () => {
      console.log(`listening on http://localhost:8080`);
    });
  });

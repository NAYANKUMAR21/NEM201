const express = require("express");
const app = express();
const cors = require("cors");
const { default: mongoose } = require("mongoose");
const UserModel = require("./models/User/User.model");
const jwt = require("jsonwebtoken");
const nodeMailer = require("nodemailer");
const fs = require("fs");
const hbs = require("handlebars");
const userName = "Katrine Stracke";
const emailUsername = "katrine.stracke@ethereal.email";
const emailPassword = "thzNJtK2GPg8YNytqc";
const template = hbs.compile(fs.readFileSync("./mail.hbs", "utf-8"));
app.use(cors());
app.use(express.json());

const transporter = nodeMailer.createTransport({
  host: "smtp.ethereal.email", //host is the serve domain (ethereal mail) if its for google we can write smtp.gmail.com
  port: 587, //like we have port for HTTP likewise SMTP  will run 587
  auth: {
    // author is who is it sending
    user: "katrine.stracke@ethereal.email",
    pass: "thzNJtK2GPg8YNytqc",
  },
});

app.get("/", (req, res) => {
  res.send("HELLO");
});

app.post("/signup", async (req, res) => {
  try {
    const user = new UserModel(req.body);
    await user.save();

    transporter
      .sendMail({
        to: req.body.email,
        from: "nayanph1@gmail.com",
        subject: "Account created success",
        html: template({
          user: req.body.name,
          age: req.body.age,
          message: req.body.message,
        }),
        // text:""
      })
      .then((mail) => {
        console.log(mail, "mail is successfully sent");
      });

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

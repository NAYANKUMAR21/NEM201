const express = require("express");
const userModel = require("./user.model");
const nodeMailer = require("nodemailer");
const fs = require("fs");
const hbs = require("handlebars");
const userName = "Cortney Schamberger";
const emailUsername = "cortney.schamberger99@ethereal.email";
const emailPassword = "aCfJZcuTneHAhAZZYQ";

// const template = hbs.compile(fs.readFileSync("./mail.hbs", "utf-8"));
const app = express.Router();
const obj = {};
const transporter = nodeMailer.createTransport({
  host: "smtp.ethereal.email", //host is the serve domain (ethereal mail) if its for google we can write smtp.gmail.com
  port: 587, //like we have port for HTTP likewise SMTP  will run 587
  auth: {
    // author is who is it sending
    user: emailUsername,
    pass: emailPassword,
  },
});

app.post("/signup", async (req, res) => {
  const { name, password, age, email } = req.body;
  if (!email || !password || !name) {
    return res.status(401).send("Un authorized");
  }
  try {
    const user = await userModel.findOne({ email });
    if (user) {
      return res.status(401).send("User already exists");
    } else {
      const create = new userModel({ email, name, age, password });
      await create.save();

      return res.status(200).send("USer created successfully");
    }
  } catch (er) {
    res.status(404).send("Bad request");
  }
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status().send();
  }
  try {
    const user = await userModel.findOne({ email });
    if (user && user.password === password) {
      var a = Math.floor(100000 + Math.random() * 900000);
      obj[email] = a;
      transporter.sendMail({
        to: req.body.email,
        from: "nayanph1@gmail.com",
        subject: "Account created success",
        html: `<p>Welcome <h1>${email}</h1> your otp is ${a} </p>`,
        // text:""
      });
      res.status(200).send({
        message: "opt is sent to email",
      });
    }
  } catch (er) {
    console.log(er.message);
    return res.send({ message: er.message });
  }
});

app.post("/verify-otp", (req, res) => {
  const { otp, email } = req.body;
  if (!email || !otp) {
    // console.log(email, otp,"backedn verify");
    return res.status(401).send("Un-authorized");
  }
  console.log(email, otp, obj[email], "backedn verify");
  if (obj[email] === Number(otp)) {
    obj[email] = "";
    console.log(obj, "inside the opt route");
    return res.status(200).send("login successfull");
  }
  return res.status(401).send("Un authorized");
});

module.exports = app;

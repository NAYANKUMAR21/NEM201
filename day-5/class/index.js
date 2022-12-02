//for logout first we have to store the access_token in the mongo data base so that
//we can kill that or remove from the mongodb we can remove that user from data base when user clicks on logout
const { default: axios } = require("axios");
const { json } = require("express");
const express = require("express");
const app = express();
const mongoose = require("mongoose");

const client_id = "10266cb99310f2280fd5";
const client_secret = "a3ad53323cf350f11b50385a2efbda9811a8c122";

app.get("/", async (req, res) => {
  try {
    res.sendFile(__dirname + "/index.html");
  } catch (er) {
    console.log("");
    res.send(`${er.message}`);
  }
});
const middlewaer = (req,res,next)=>{

}
app.get("/access_token",middlewaer, async (req, res) => {
  const { code } = req.query;
  try {
    const x = await fetch("https://github.com/login/oauth/access_token", {
      method: "POST",
      headers: {
        accept: "application/json",
        "content-type": "application/json",
      },
      body: JSON.stringify({
        client_id,
        client_secret,
        code,
      }),
    })
      .then((res) => res.json())
      .catch(console.error);
    
    const userDetails = await fetch("https://api.github.com/user", {
      headers: {
        Authorization: `${x.token_type} ${x.access_token}`, // 7days
      },
    })
      .then((res) => res.json())
      .catch(console.error);
      console.log(x,"from backedn")
    console.log(userDetails, "inside node.js");
    res.status(200).send(userDetails);
  } catch (er) {
    console.log(er.message);
    res.send(er.message);
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

//for logout first we have to store the access_token in the mongo data base so that 
//we can kill that or remove from the mongodb we can remove that user from data base when user clicks on logout 
const express = require("express")
const app = express()
const mongoose = require("mongoose")
const cliendId = "10266cb99310f2280fd5"
const client_SECRET = "a3ad53323cf350f11b50385a2efbda9811a8c122"

app.get("/",async(req,res)=>{
    try{
        res.sendFile(__dirname+"/index.html")
    }catch(er){
        console.log("")
        res.send(`${er.message}`)
    }
})

app.get("/github/callback",async(req,res)=>{
    const {code} = req.query
    try{
        
        console.log(code ,"github code")
        res.send("sign in success with github")
    }catch(er){
        console.log(er.message)
        res.send(er.message)
    }

})

mongoose
  .connect(
    "mongodb+srv://NAYAN:NAYAN@cluster0.u60zxbv.mongodb.net/B21?retryWrites=true&w=majority"
  )
  .then(() => {
    app.listen(8080, () => {
      console.log(`listening on http://localhost:8080`);
    });
  });
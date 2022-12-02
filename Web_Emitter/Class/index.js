const express = require("express");
const { Server } = require("socket.io");
const app = express(); //express is not a server
const http = require("http").createServer(app);
const io = new Server(http);
let count = 0;
const history = [];



io.on("connection", (socket) => {
  count += 1;
  console.log("A new User is connected");
  console.log("NUmber of users", count);

  socket.broadcast.emit("newUser", count);

  socket.emit("history", history);

  socket.on("newText", (message) => {
    io.emit("newText", message);
    history.push(message);
    console.log("A new message received :", message);
  });

  socket.on("disconnect", () => {
    count -= 1;
    console.log("A user disconnect remaining user", count);
  });
});



app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

http.listen(8080, () => {
  console.log(`listening on http://localhost:8080`); //what ever we listen on that becomes the actual server in this case http is actually server and not app
});

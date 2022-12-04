const express = require("express");
const app = express();
const http = require("http").createServer(app);
const { Server } = require("socket.io");

const io = new Server(http);

let count = 0;
let user = [];
io.on("connection", (client) => {
  count++;
  console.log("A new User joined", count);
  client.broadcast.emit("second");

  client.on("Player1", (x) => {
    user.push(client.id);
    console.log(client.id, x);
    client.broadcast.emit("number", x);
  });

  client.on("send", () => {
    io.emit("send");
    
  });

  client.on("disconnect", () => {
    count -= 1;
    console.log("A new User diconnected", count);
    io.emit("off", 1);
  });
});

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

http.listen(8080, () => {
  console.log("Listening http://localhost:8080");
});

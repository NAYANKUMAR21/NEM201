const { EventEmitter } = require("events");
const Button = new EventEmitter();
let a = 100;

Button.on("dog", () => {
  console.log("inside dog");
});

Button.on("click", () => {
  console.log("inside click");
});

setTimeout(() => {
  if (a <= 20) {
    Button.emit("click");
  } else {
    Button.emit("dog");
  }
}, 2000);

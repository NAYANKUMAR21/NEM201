const fs = require("fs");
process.nextTick(() => {
  console.log("process");
});

setImmediate(() => {
  console.log("immediate");
});

fs.readFile("index.js", "utf-8", () => {
  setImmediate(() => {
    console.log("immediate 2");
  });

  setTimeout(() => {
    console.log("TimeOut 2");
  }, 1);

  process.nextTick(() => {
    console.log("process 2");
  });
});

{
  /* 

wanna do something quickly compares all timers example 
setTimeout ,setInterval



when setImmediate is used inside I/O callback then of all timers setImmediate is called 
*/
}

setTimeout(() => {
  console.log("TimeOut");
},2);

setImmediate(() => {
  console.log("immediate above");
});
process.nextTick(() => {
  console.log("process above");
});
function add(a, b) {
  print("adding started", "add");
  return a + b;
}
function sub(a, b) {
  print("subtract started");
  return a - b;
}

function print(string, a) {
  if (a) {
    setImmediate(() => {
      console.log(string);
    });
    process.nextTick(() => {
      console.log("process");
    });
  } else {
    setTimeout(() => {
      console.log(string);
    }, 1000);
  }

  //   setTimeout(() => {
  //     console.log(string);
  //   }, 1000);
  return;
}
function calc(opera, a, b) {
  if (opera == "add") {
    return add(a, b);
  } else if (opera === "sub") {
    return sub(a, b);
  }
}

let x = calc("add", 3, 2);
let y = calc("sub", 3, 2);
console.log(x);
console.log(y);

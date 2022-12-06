function nayan(a) {
  for (let i = 0; i < a.length; i++) {
    for (let j = 0; j < a.length - i - 1; j++) {
      if (a[j] > a[j + 1]) {
        let he = a[j];
        a[j] = a[j + 1];
        a[j + 1] = he;
      }
    }
  }
  return a;
}
console.log("before immediate");

// setImmediate((arg) => {
//   console.log(`executing immediate: ${arg}`);
// }, "so immediate");
setTimeout(()=>{
  console.log("Inside TimeOut")
},0)
for(let i=0;i<999;i++){

  console.log("after immediate");
}


let arr = [5, 4, 3, 2, 1];
let x = nayan(arr);
console.log(x);

import { useState } from "react";

export default function Home() {
  const [count, setCount] = useState(0);
  const greet = "good morning";
  return (
    <>
      <div>Hello Nayan,{greet}</div>
      <h1>{count}</h1>
      <button onClick={() => setCount((prev) => prev + 1)}>ADD 1</button>
      <button onClick={() => setCount((prev) => prev - 1)}>DEL 1</button>
    </>
  );
}

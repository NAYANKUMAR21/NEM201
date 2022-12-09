import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";

const product = () => {
  const [state, seState] = useState([]);
  useEffect(() => {
    axios
      .get("https://jsonplaceholder.typicode.com/users")
      .then((res) => {
        seState([...res.data]);
        console.log(res);
      })
      .catch((er) => console.log(er));
  }, []);
  return (
    <div>
      <h1>Product List</h1>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3,1fr)",
          gap: "20px",
        }}
      >
        {state?.map((item) => {
          return (
            <Link key={item.id} href={`product/${item.id}`}>
              <h1>
                {item.name}--{item.username}
              </h1>
              <p>{item.email}</p>
            </Link>
          );
        })}
        {/* <Link href="product/laptop">Laptop</Link>
        <Link href="product/Camera">Camera</Link>
        <Link href="product/Mobile">Mobile</Link> */}
      </div>
    </div>
  );
};



export default product;

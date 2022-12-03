import React, { useState } from "react";
import { useEffect } from "react";
import { useContext } from "react";
import { AppContext } from "../COntext/context";

const Product = () => {
  const [data, setData] = useState([]);
  const value = useContext(AppContext);
  console.log(value);

  useEffect(() => {
    value
      .getDate()
      .then((res) => {
        setData(res);
      })
      .catch((er) => console.log(er.message));
  }, [value]);

  return (
    <div>
      <h1>This is products page</h1>
      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        <button onClick={() => value.setState(false)}>Logout</button>
      </div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4,1fr)",
          gap: "20px",
          textAlign: "center",
          margin: "auto",
          border: "1px solid blue",
        }}
      >
        {data?.map((item) => {
          return (
            <div
              style={{ width: "50%", border: "1px solid black" }}
              key={item._id}
            >
              <div>
                <img
                  src={item.image}
                  alt={item._id}
                  style={{ width: "100%" }}
                />
              </div>
              <div>
                <button onClick={() => {}}>ADD TO CART</button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Product;

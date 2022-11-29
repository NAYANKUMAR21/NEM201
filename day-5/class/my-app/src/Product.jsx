import React, { useState } from "react";

const Product = () => {
  const [state, setState] = useState([]);
  return (
    <div>
        <h1>DETAILS</h1>
      {state?.map((item) => {
        return (
          <div key={item.id}>
            <div>{item.bio}</div>
            <div>{item.id}</div>
          </div>
        );
      })}
    </div>
  );
};

export default Product;

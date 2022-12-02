import React from "react";

const SingleProduct = ({ image, _id }) => {
  return (
    <div>
      <div>
        <img src={image} alt={_id} style={{ width: "100%" }} />
      </div>
      <div>
        <button onClick={() => {}}>ADD TO CART</button>
      </div>
    </div>
  );
};

export default SingleProduct;

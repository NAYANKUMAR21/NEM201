import React, { useEffect } from "react";


const Product = () => {
  useEffect(() => {
    const query = window.location.search;
    const urlParams = new URLSearchParams(query);
    const codeParams = urlParams.get("code");
    console.log(codeParams, "from Login page");
  }, []);
  return (
    <div>
        <h1>DETAILS</h1>
    </div>
  );
};

export default Product;

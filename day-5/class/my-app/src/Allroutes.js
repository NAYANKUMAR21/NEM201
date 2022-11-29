import React from "react";
import { Route, Routes } from "react-router-dom";
import Login from "./Login";
import Product from "./Product";

const Allroutes = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<h1>HOME</h1>}></Route>
        <Route path="/Login" element={<Login />}></Route>
        <Route path="/product" element={<Product />}></Route>
      </Routes>
    </div>
  );
};

export default Allroutes;

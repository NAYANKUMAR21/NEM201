import React, { useState } from "react";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../COntext/context";

const Signup = () => {
  const navigate = useNavigate();
  const value = useContext(AppContext);
  const [cred, setCred] = useState({
    name: "",
    email: "",
    password: "",
    age: 12,
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setCred({ ...cred, [name]: value });
  };
  const handleClick = () => {
    value
      .Auth(cred)
      .then(() => {
        navigate("/login");
      })
      .catch((er) => console.log(er.message, "from signup"));
  };
  const handleSend = () => {
    navigate("/login");
  };
  return (
    <div>
      <input
        type="text"
        name="name"
        placeholder="Enter name"
        onChange={handleChange}
      />
      <input
        type="email"
        name="email"
        placeholder="Enter email"
        onChange={handleChange}
      />
      <input
        type="password"
        name="password"
        placeholder="Enter password"
        onChange={handleChange}
      />
      <button onClick={handleClick}>SIGNUP</button>
      <button onClick={handleSend}>Login</button>
    </div>
  );
};

export default Signup;

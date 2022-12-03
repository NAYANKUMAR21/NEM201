import React, { useContext } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../COntext/context";

const Login = () => {
  const navigate = useNavigate()
  const value = useContext(AppContext);
  const [cred, setCred] = useState({
    email: "",
    password: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setCred({ ...cred, [name]: value });
  };
  const handleSubmit = () => {
    value
      .login(cred)
      .then(() => {
        navigate("/otp")
      })
      .catch((er) => console.log(er.message, "from the login route"));
  };
  return (
    <div>
      <input
        type="email"
        placeholder="Enter email"
        name="email"
        onChange={handleChange}
      />
      <input
        type="password"
        placeholder="Enter password"
        name="password"
        onChange={handleChange}
      />
      <button onClick={handleSubmit}>LOGIN</button>
    </div>
  );
};

export default Login;

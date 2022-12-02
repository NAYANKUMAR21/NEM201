import React from "react";
import { useState } from "react";

const Login = () => {
  const [cred, setCred] = useState({
    email: "",
    password: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setCred({ ...cred, [name]: value });
  };
  const handleSubmit =()=>{

  }
  return (
    <div>
      <input type="email" placeholder="Enter email" name="email" onChange={handleChange}/>
      <input type="password" value="Enter password" name="password" onChange={handleChange}/>
      <button onClick={handleSubmit}></button>
    </div>
  );
};

export default Login;

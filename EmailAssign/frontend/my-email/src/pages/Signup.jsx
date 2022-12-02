import React, { useState } from "react";

const Signup = () => {
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
  const handleClick = ()=>{
    
  }
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
        value="Enter password"
        onChange={handleChange}
      />
      <button onClick={handleClick}></button>
    </div>
  );
};

export default Signup;

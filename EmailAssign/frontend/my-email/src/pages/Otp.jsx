import React from "react";
import { useContext } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../COntext/context";

const Otp = () => {
    const navigate = useNavigate()
  const [otp, setotp] = useState("");
  const value = useContext(AppContext);
  console.log(value)
  const handleClick = () => {
    value.verify(value.email, otp).then((res)=>{
        navigate("/product")
    }).catch(er=>console.log(er.message,"from the otp route"))
  };
  return (
    <div>
      <input
        type="number"
        placeholder="Enter otp"
        onChange={(e) => setotp(e.target.value)}
        value={otp}
      />
      <button onClick={handleClick}>ENTER</button>
    </div>
  );
};

export default Otp;

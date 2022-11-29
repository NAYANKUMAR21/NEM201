import axios from "axios";
import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import Allroutes from "./Allroutes";
import "./App.css";

const getData = async (id) => {
  try {
    let { data } = await axios.get(
      `http://localhost:8080/access_token?code=${id}`
    );

    console.log(data);
    return data;
  } catch (er) {
    console.log(er.message, "from getdata");
  }
};

function App() {
  
  
  
  return (
    <div className="App">
      <Allroutes/>
    </div>
  );
}

export default App;

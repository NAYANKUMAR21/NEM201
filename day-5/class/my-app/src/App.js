import axios from "axios";
import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
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
  
  const [state, setState] = useState([]);
  useEffect(() => {
    const query = window.location.search;
    const urlParams = new URLSearchParams(query);
    const codeParams = urlParams.get("code");
    if (codeParams && localStorage.getItem("access_token") === null) {
      getData(codeParams)
        .then((res) =>{
           setState([...state, res])
           localStorage.setItem("code",codeParams)
          })
        .catch((er) => console.log(er.message, "from func call"));
    }
  }, []);

  return (
    <div className="App">
      <button>
        <a href="https://github.com/login/oauth/authorize?client_id=10266cb99310f2280fd5">
          {/* we can also write window.location.assign = "https://github.com/login/oauth/authorize?client_id=10266cb99310f2280fd5" */}
          SIGN IN WITH GITHUB
        </a>
      </button>
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
}

export default App;

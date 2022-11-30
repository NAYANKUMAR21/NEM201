import axios from "axios";
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
  // useEffect(() => {
  //   const query = window.location.search;
  //   const urlParams = new URLSearchParams(query);
  //   const codeParams = urlParams.get("code");
  //   console.log(codeParams, "from Login page");
  //   localStorage.setItem("code");
  // }, []);
  getData()
  return (
    <div className="App">
      <Allroutes/>
    </div>
  );
}

export default App;

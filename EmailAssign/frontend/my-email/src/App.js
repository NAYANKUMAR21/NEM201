import "./App.css";
import { Routes, Route } from "react-router-dom";
import Product from "./pages/Product";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Otp from "./pages/Otp";
import Private from "./PrivateRoute/Private";
import Home from "./pages/Home";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home></Home>}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/signup" element={<Signup />}></Route>
        <Route
          path="/product"
          element={
            <Private>
              <Product />
            </Private>
          }
        ></Route>
        <Route path="/product/:id"></Route>
        <Route path="/otp" element={<Otp />}></Route>
      </Routes>
    </div>
  );
}

export default App;

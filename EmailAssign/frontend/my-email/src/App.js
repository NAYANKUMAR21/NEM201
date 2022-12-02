import "./App.css";
import { Routes, Route } from "react-router-dom";
import Product from "./pages/Product";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/"></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/signup" element={<Signup />}></Route>
        <Route path="/product" element={<Product />}></Route>
        <Route path="/product/:id"></Route>
      </Routes>
    </div>
  );
}

export default App;

import React, { useState } from "react";
import { Navigation } from "./components/navigation/Navigation";
import "./App.css";
import { Signup } from "./pages/login/Signup";
import { Login } from "./pages/login/Login";
import { Products } from "./pages/products/Products";

function App() {
  const [products, setProducts] = useState([]);

  return (
    <div className="App">
      <Products />
      <p>test</p>
    </div>
  );
}

export default App;

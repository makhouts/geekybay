import React, { useState } from "react";
import { Navigation } from "./components/navigation/Navigation";
import { Login } from "./pages/login/Login";
import "./App.css";

function App() {
  const [products, setProducts] = useState([]);

  return (
    <div className="App">
      <Navigation />
      <Login />
      <p>test</p>
    </div>
  );
}

export default App;

import React, { useState } from "react";
import { Navigation } from "./components/navigation/Navigation";
import { AccountBox } from "./pages/login/AccountBox";
import "./App.css";

function App() {
  const [products, setProducts] = useState([]);

  return (
    <div className="App">
      <Navigation />
      <AccountBox />
      <p>test</p>
    </div>
  );
}

export default App;

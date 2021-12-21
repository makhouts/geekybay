import React, {useState} from 'react';
import { Navigation } from './components/navigation/Navigation';
import { motion } from 'framer-motion';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";
import { Contact } from './pages/contact/Contact';
import { Home } from './pages/home/Home';
import './App.css';

function App() {
  const [products, setProducts] = useState([]);

  return (
    <div className="App">
      <Router>
      <Navigation />
        <Routes>
          <Route path='contact' element={<Contact />} />
          <Route path='/' element={<Home />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;

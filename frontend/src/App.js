import React, {useState} from 'react';
import { Navigation } from './components/navigation/Navigation';
import { AnimatePresence } from 'framer-motion';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation
} from "react-router-dom";
import { Home, Products, Contact, Login } from './pages/index';
import './App.css';



function App() {
  const [products, setProducts] = useState([
    {
      productId: 1,
      productName: 'Iphone 13 Pro',
      sellerID: 1,
      productDescription: 'Iphone 13 Pro',
      image: './assets/iphone.png',
      price: '€ 1299.00',
      available: true,
    },
    {
      productId: 1,
      productName: 'Iphone 13 Pro',
      sellerID: 1,
      productDescription: 'Iphone 13 Pro',
      image: './assets/iphone.png',
      price: '€ 1299.00',
      available: true,
    },
    {
      productId: 1,
      productName: 'Iphone 13 Pro',
      sellerID: 1,
      productDescription: 'Iphone 13 Pro',
      image: './assets/iphone.png',
      price: '€ 1299.00',
      available: true,
    },
    {
      productId: 1,
      productName: 'Iphone 13 Pro',
      sellerID: 1,
      productDescription: 'Iphone 13 Pro',
      image: './assets/iphone.png',
      price: '€ 1299.00',
      available: true,
    },
    {
      productId: 1,
      productName: 'Iphone 13 Pro',
      sellerID: 1,
      productDescription: 'Iphone 13 Pro',
      image: './assets/iphone.png',
      price: '€ 1299.00',
      available: true,
    },
    {
      productId: 1,
      productName: 'Iphone 13 Pro',
      sellerID: 1,
      productDescription: 'Iphone 13 Pro',
      image: './assets/iphone.png',
      price: '€ 1299.00',
      available: true,
    }
  ]);
  const location = useLocation();




  return (
    <div className="App">
      <Navigation />
      <AnimatePresence exitBeforeEnter>
          <Routes location={location} key={location.pathname}>
            <Route path='products' element={<Products />} />
            <Route path='contact' element={<Contact />} />
            <Route path='login' element={<Login />} />
            <Route path='/' element={<Home products={products} />} />
          </Routes>
      </AnimatePresence>
    </div>
  );
}

export default App;

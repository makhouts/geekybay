import React, { useState } from "react";
import { Navigation } from "./components/navigation/Navigation";
import { Footer } from './components/footer/Footer';
import { AnimatePresence } from "framer-motion";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import {
  Home,
  Products,
  Contact,
  Login,
  Signup,
  DetailProduct,
  Page404,
  Checkout,
} from "./pages/index";
import "./App.css";

function App() {
  const [cart, setCart] = useState([
    {
      id: 1,
      image: "",
      productName: "Iphone 13 Pro",
      price: "1299.99",
      qty: "2",
    },
    {
      id: 2,
      image: "",
      productName: "Iphone 11 Pro",
      price: "1299.89",
      qty: "1",
    },
  ]);
  
  const [products, setProducts] = useState([
    {
      productId: 1,
      productName: "Iphone 13 Pro",
      sellerID: 1,
      productDescription: "Iphone 13 Pro",
      image: "./assets/iphone.png",
      price: "€ 1299.00",
      available: true,
    },
    {
      productId: 2,
      productName: "Guitar heroX",
      sellerID: 2,
      productDescription: "Guitar heroX, now with amazing sound",
      image: "./assets/iphone.png",
      price: "€ 899.00",
      available: true,
    },
    {
      productId: 3,
      productName: "Samsung Smart TV",
      sellerID: 3,
      productDescription: "Iphone 13 Pro",
      image: "./assets/iphone.png",
      price: "€ 2299.00",
      available: true,
    },
    {
      productId: 4,
      productName: "",
      sellerID: 4,
      productDescription: "Furniture table - Wood",
      image: "./assets/iphone.png",
      price: "€ 350.00",
      available: true,
    },
    {
      productId: 5,
      productName: "Cozy Family Heater",
      sellerID: 5,
      productDescription: "Iphone 13 Pro",
      image: "./assets/iphone.png",
      price: "€ 95.99",
      available: true,
    },
    {
      productId: 6,
      productName: "Winter Jacket extra thermo",
      sellerID: 6,
      productDescription: "Iphone 13 Pro",
      image: "./assets/iphone.png",
      price: "€ 30.00",
      available: true,
    },
  ]);
  const location = useLocation();

  const deleteItemFromCart = (id) => {
    const deletedItem = cart.filter(cart => cart.id !== id);
    setCart(deletedItem);
  }

  return (
    <div className="App">
      <Navigation cart={cart} deleteItemFromCart={deleteItemFromCart} />
      <AnimatePresence exitBeforeEnter>
        <Routes location={location} key={location.pathname}>
          <Route path="products" element={<Products />} />
          <Route path="productDetail" element={<DetailProduct />} />
          <Route path="contact" element={<Contact />} />
          <Route path="login" element={<Login />} />
          <Route path="checkout" element={<Checkout cart={cart} deleteItemFromCart={deleteItemFromCart} />} />
          <Route path="signUp" element={<Signup />} />
          <Route path="/" element={<Home products={products} />} />
          <Route path="*" element={<Page404 />} />
        </Routes>
      </AnimatePresence>
      <Footer />
    </div>
  );
}

export default App;

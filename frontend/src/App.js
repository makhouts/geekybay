import React, { useState, useEffect } from "react";
import { Navigation } from "./components/navigation/Navigation";
import { Footer } from "./components/footer/Footer";
import { AnimatePresence } from "framer-motion";
import axios from 'axios';
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
  UserProfile,
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

  const [products, setProducts] = useState([]);

  useEffect( async () => {
    try {
      const data = await axios.get('https://geekybay.herokuapp.com/products')
      setProducts(data.data);
    } catch(error) {
      console.log(error);
    }
  }, [])

  const location = useLocation();

  const deleteItemFromCart = (id) => {
    const deletedItem = cart.filter((cart) => cart.id !== id);
    setCart(deletedItem);
  };

  return (
    <div className="App">
      <Navigation cart={cart} deleteItemFromCart={deleteItemFromCart} />
      <AnimatePresence exitBeforeEnter>
        <Routes location={location} key={location.pathname}>
          <Route path="products" element={<Products products={products} />} />
          <Route path="productDetail:id" element={<DetailProduct />} />
          <Route path="contact" element={<Contact />} />
          <Route path="userProfile" element={<UserProfile />} />
          <Route path="login" element={<Login />} />
          <Route
            path="checkout"
            element={
              <Checkout cart={cart} deleteItemFromCart={deleteItemFromCart} />
            }
          />
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

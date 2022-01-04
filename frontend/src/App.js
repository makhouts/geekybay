import React, { useState, useEffect } from "react";
import { Navigation } from "./components/navigation/Navigation";
import { Footer } from "./components/footer/Footer";
import { AnimatePresence } from "framer-motion";
import axios from "axios";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { Home, Products, Contact, Login, Signup, UserProfile, DetailProduct, Page404, Checkout } from "./pages/index";
import "./App.css";

function App() {
  const [cart, setCart] = useState([]);

  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [showSpinner, setShowSpinner] = useState(true);

  useEffect(async () => {
    try {
      const getProducts = await axios.get("https://geekybay.herokuapp.com/products");
      setProducts(getProducts.data);
      setShowSpinner(false);
    } catch (error) {
      console.log(error);
    }
  }, []);

  const location = useLocation();

  const addToCart = (product, qty) => {
    if (cart.filter((c) => c.productID === product[0].productID).length > 0) {
      const index = cart.findIndex((x) => x.productID === product[0].productID);
      const newCart = [...cart];
      newCart[index].qty += qty;
      setCart(newCart);
    } else {
      setCart((prevCart) => [...prevCart, { qty: qty, ...product[0] }]);
    }
  };

  const deleteItemFromCart = (id) => {
    const deletedItem = cart.filter((cart) => cart.productID !== id);
    setCart(deletedItem);
  };

  const showOnlyFreeShipping = (showOnlyFreeShipping) => {
    if (showOnlyFreeShipping) {
      const freeShipping = products.filter((product) => product.freeShipping == showOnlyFreeShipping);
      setFilteredProducts(freeShipping);
    } else {
      setFilteredProducts([]);
    }
  };

  return (
    <div className="App">
      <Navigation cart={cart} deleteItemFromCart={deleteItemFromCart} />
      <AnimatePresence exitBeforeEnter>
        <Routes location={location} key={location.pathname}>
          <Route path="/products">
            <Route
              path=":search"
              element={
                <Products
                  products={filteredProducts.length ? filteredProducts : products}
                  showOnlyFreeShipping={showOnlyFreeShipping}
                  showSpinner={showSpinner}
                />
              }
            />
            <Route
              path=""
              element={
                <Products
                  products={filteredProducts.length ? filteredProducts : products}
                  showOnlyFreeShipping={showOnlyFreeShipping}
                  showSpinner={showSpinner}
                />
              }
            />
          </Route>
          <Route path="/productDetail/:id" element={<DetailProduct addToCart={addToCart} />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/userProfile" element={<UserProfile />} />
          <Route path="/login" element={<Login />} />
          <Route path="/checkout" element={<Checkout cart={cart} deleteItemFromCart={deleteItemFromCart} />} />
          <Route path="/signUp" element={<Signup />} />
          <Route path="/" element={<Home products={products} />} />
          <Route path="*" element={<Page404 />} />
        </Routes>
      </AnimatePresence>
      <Footer />
    </div>
  );
}

export default App;

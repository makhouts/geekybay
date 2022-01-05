import React, { useState, useEffect } from "react";
import { Navigation } from "./components/navigation/Navigation";
import { Footer } from "./components/footer/Footer";
import { AnimatePresence } from "framer-motion";
import axios from "axios";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { Home, Products, Contact, Login, Signup, UserProfile, DetailProduct, Page404, Checkout } from "./pages/index";
import "./App.css";
import url from "./helpers/endpoint";

export const AuthContext = React.createContext({
  authenticated: false,
  setAuthenticated: (auth) => {},
});

function App() {
  const [cart, setCart] = useState([]);

  const [authenticated, setAuthenticated] = useState(false);

  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [showSpinner, setShowSpinner] = useState(true);

  useEffect(async () => {
    try {
      const res = await axios.get(`${url}/auth/isLoggedIn`, { withCredentials: true });
      if (res.status === 200 && res.data.loggedIn) {
        setAuthenticated(true);
      } else if(res.status === 200 && !res.data.loggedIn){
        setAuthenticated(false);
      }
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(async () => {
    try {
      const getProducts = await axios.get("https://geekybay.herokuapp.com/products");
      setProducts(getProducts.data);
      setShowSpinner(false);
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    const data = localStorage.getItem("cart");
    if (data) {
      setCart(JSON.parse(data));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  });

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

  const searchProduct = (searchQuery) => {
    const searchedProduct = products.filter((product) => {
      return Object.values(product).includes(searchQuery);
    });
    if (searchedProduct.length !== 0) {
      setProducts(searchedProduct);
    }
  };

  return (
    <div className="App">
      <AuthContext.Provider value={{ authenticated, setAuthenticated }}>
        <Navigation cart={cart} deleteItemFromCart={deleteItemFromCart} />
        <AnimatePresence exitBeforeEnter>
          <Routes location={location} key={location.pathname}>
            <Route path="/products">
              <Route
                path=":search"
                element={
                  <Products
                    products={filteredProducts.length ? filteredProducts : products}
                    searchProduct={searchProduct}
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
      </AuthContext.Provider>
    </div>
  );
}

export default App;

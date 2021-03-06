import React, { useContext } from "react";
import classes from "./navigation.module.css";
import { motion } from "framer-motion";
import { Link, NavLink } from "react-router-dom";
import { SearchBar } from "../searchBar/SearchBar";
import { BsCart3 } from "react-icons/bs";
import { TiDeleteOutline } from "react-icons/ti";
import { HiOutlineUserCircle } from "react-icons/hi";
import { SencondaryButton } from "../secondaryButton/SencondaryButton";
import { AuthContext } from "../../App";
import axios from "axios";
import url from "../../helpers/endpoint";
import { PrimaryButton } from "../primaryButton/PrimaryButton";

export const Navigation = (props) => {
  let cartCount = props.cart.length;

  const cartSummary = props.cart.map((item) => (
    <div className={classes.item} key={item.productID}>
      <img src={require(`../../../../uploads/${item.productImg}`)} alt="" />
      <div className={classes.productInfo}>
        <h4>{item.productName}</h4>
        <p>€ {item.price}</p>
        <p>Qty: {item.qty}</p>
      </div>
      <p>€ {item.qty * item.price}</p>
      <TiDeleteOutline className={classes.deleteIcon} onClick={props.deleteItemFromCart.bind(this, item.productID)} />
    </div>
  ));

  const logout = async () => {
    try {
      await axios.delete(`${url}/auth/logout`, { withCredentials: true });
      props.setAuthenticated(false);
    } catch (error) {
      throw error;
    }
  };

  return (
    <div className={classes.container}>
      <nav className={classes.navigation}>
        <div className={classes.logo}>
          <Link to="/">
            <img src={require("../../assets/logo.png")} alt="" />
          </Link>
        </div>
        <SearchBar />
        <div className={classes.navLinksContainer}>
          <ul className={classes.navLinks}>
            <motion.li
              whileHover={{
                scale: 1.2,
                transition: { duration: 0.2 },
              }}
            >
              <NavLink to="">Home</NavLink>
            </motion.li>
            <motion.li
              whileHover={{
                scale: 1.2,
                transition: { duration: 0.2 },
              }}
            >
              <NavLink to="products">Products</NavLink>
            </motion.li>
            <motion.li
              whileHover={{
                scale: 1.2,
                transition: { duration: 0.2 },
              }}
            >
              <NavLink to="contact">Contact</NavLink>
            </motion.li>
            <motion.li
              whileHover={{
                scale: 1.2,
                transition: { duration: 0.2 },
              }}
            >
              {props.authenticated ? (
                <NavLink to="/" onClick={logout}>
                  Log out
                </NavLink>
              ) : (
                <NavLink to="login">Log in</NavLink>
              )}
            </motion.li>
            <motion.li
              whileHover={{
                scale: 1.1,
                transition: { duration: 0.1 },
              }}
            >
              {" "}
              {props.authenticated && (
                <NavLink to="/userProfile">
                  <HiOutlineUserCircle className={classes.accountIcon} />
                </NavLink>
              )}
            </motion.li>
          </ul>
        </div>

        <div className={classes.cart}>
          <div className={classes.cartIconHover}>
            <BsCart3 className={classes.cartIcon} />
            <label className={classes.cartTotalItems}>{props.cart.length}</label>
          </div>

          <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 1 }} className={classes.cartSummary}>
            {cartCount === 0 ? <p>No items in cart.</p> : cartSummary}
            <div className={classes.totalCartPrice}>
              <p>Total</p>
              <p>
                €
                {props.cart.reduce((acc, item) => {
                  const total = item.qty * item.price + acc;
                  return Math.round((total + Number.EPSILON) * 100) / 100;
                }, 0)}
              </p>
            </div>
            <Link to="checkout">
              <SencondaryButton disabled={props.cart.length == 0 ? true : false} className={classes.checkoutBtn}>
                Checkout
              </SencondaryButton>
            </Link>
          </motion.div>
        </div>
        {!props.authenticated ? (
          <Link to="login">
            <PrimaryButton btnStyle="red">Sell now</PrimaryButton>
          </Link>
        ) : null}
      </nav>
    </div>
  );
};

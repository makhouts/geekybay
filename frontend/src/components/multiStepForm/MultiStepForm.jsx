import React, { useState } from "react";
import classes from "./multiStepForm.module.css";
import { TiDelete } from "react-icons/ti";
import { motion } from "framer-motion";
import { PrimaryButton } from "../primaryButton/PrimaryButton";
import { GuestForm } from "./GuestForm";
import { FaCcPaypal, FaCcVisa } from "react-icons/fa";
import StripeCheckout from "react-stripe-checkout";
import { useNavigate } from "react-router-dom";

export const MultiStepForm = (props) => {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [inputs, setInputs] = useState({
    fName: "",
    lName: "",
    email: "",
    country: "",
    street: "",
    city: "",
    postcode: "",
  });
  ///////
  const [product, setProduct] = useState({
    name: "test",
    products: props.cart,
  });

  const makePayment = async (token) => {
    const body = {
      token,
      product,
    };
    const headers = {
      "Content-Type": "application/json",
    };
    try {
      const response = await fetch("http://localhost:3001/pay/payment", {
        method: "POST",
        // credentials: 'include', TODO: do this
        headers: headers,
        body: JSON.stringify(body),
      });
      const { status } = response;
      if (status === 200) {
        // TODO: add order details here
        navigate("/"); // TODO: add ty for purchase or something
      }
    } catch (error) {
      console.log(error);
    }
  };
  ///////

  const loggedIn = false;

  const renderItems = () => (
    <div className={classes.cartSummary}>
      {props.cart.length !== 0 ? (
        props.cart.map((item) => (
          <motion.div animate={{ opacity: 1 }} initial={{ opacity: 0 }} className={classes.item} key={item.id}>
            <img src={require("../../assets/iphone.png")} alt="product" />
            <p>{item.productName}</p>
            <p>{item.qty}</p>
            <p>{item.price}</p>
            <TiDelete className={classes.deleteIcon} onClick={props.deleteItemFromCart.bind(this, item.id)} />
          </motion.div>
        ))
      ) : (
        <h1>No items in cart.</h1>
      )}
    </div>
  );

  const renderLogin = () => {
    if (loggedIn) {
      return (
        <motion.div animate={{ opacity: 1 }} initial={{ opacity: 0 }} className={classes.cartSummary}>
          LOGGED IN - PAYMENT...
        </motion.div>
      );
    } else {
      return (
        <motion.div animate={{ opacity: 1 }} initial={{ opacity: 0 }} className={classes.cartSummary}>
          <h4>Please login to complete your purchase.</h4>
          <div className={classes.userOptionBtn}>
            <PrimaryButton clicked={props.login}>Login</PrimaryButton>
            <PrimaryButton clicked={nextRender}>Continue as a guest</PrimaryButton>
          </div>
        </motion.div>
      );
    }
  };

  const renderGuestForm = () => {
    return (
      <motion.div animate={{ opacity: 1 }} initial={{ opacity: 0 }} className={classes.cartSummary}>
        <h4>Fill in.</h4>
        <GuestForm inputs={inputs} setInputs={setInputs} />
      </motion.div>
    );
  };

  const renderPayment = () => {
    return (
      <motion.div animate={{ opacity: 1 }} initial={{ opacity: 0 }} className={classes.cartSummary}>
        <div className={classes.payments}>
          <div className={classes.shipment}>
            <h4>Shipping details</h4>
            <p>
              Full Name: {inputs.fName} {inputs.lName}
            </p>
            <p>Email: {inputs.email}</p>
            <p>Country: {inputs.country}</p>
            <p>Street: {inputs.street}</p>
            <p>City: {inputs.city}</p>
            <p>Postcode: {inputs.postcode}</p>
          </div>
          <div className={classes.paymentMethods}>
            <h4>Accepted payment methods</h4>
            <FaCcPaypal color="blue" size="50" />
            <FaCcVisa color="blue" size="50" />
          </div>

          <StripeCheckout stripeKey={process.env.REACT_APP_PAYMENT_KEY} token={makePayment} name="Payment Information">
            <button>Pay now</button>
          </StripeCheckout>
        </div>
      </motion.div>
    );
  };

  const nextRender = () => {
    if (step === 3) return;
    if (loggedIn) {
      setStep(3);
    } else {
      setStep(step + 1);
    }
  };

  const previousRender = () => {
    if (step === 0) return;
    if (loggedIn) {
      setStep(0);
    } else {
      setStep(step - 1);
    }
  };

  return (
    <div className={classes.cart}>
      {step === 0 ? renderItems() : null}
      {step === 1 ? renderLogin() : null}
      {step === 2 ? renderGuestForm() : null}
      {step === 3 ? renderPayment() : null}

      <div className={classes.total}>
        <div className={classes.totalPrice}>
          <h4>Items({props.cart.length})</h4>
          <p>
            {props.cart.reduce((acc, item) => {
              const total = item.qty * item.price + acc;
              return Math.round((total + Number.EPSILON) * 100) / 100;
            }, 0)}
          </p>
        </div>
        <div className={classes.totalPrice}>
          <h4>Shipping</h4>
          <p>FREE</p>
        </div>
        <div className={classes.horizontalLine} />
        <div className={classes.totalPrice}>
          <h4>Subtotal</h4>
          <p>
            {props.cart.reduce((acc, item) => {
              const total = item.qty * item.price + acc;
              return Math.round((total + Number.EPSILON) * 100) / 100;
            }, 0)}
          </p>
        </div>
        {step !== 0 ? (
          <button onClick={previousRender} disabled={props.cart.length == 0 ? true : false} className={classes.checkoutBtn}>
            Previous
          </button>
        ) : null}
        <button onClick={nextRender} disabled={props.cart.length == 0 ? true : false} className={classes.checkoutBtn}>
          Next
        </button>
      </div>
    </div>
  );
};

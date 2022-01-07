import React, { useState, useContext, useEffect } from "react";
import classes from "./multiStepForm.module.css";
import { TiDelete } from "react-icons/ti";
import { motion } from "framer-motion";
import { PrimaryButton } from "../primaryButton/PrimaryButton";
import { GuestForm } from "./GuestForm";
import { FaCcPaypal, FaCcVisa } from "react-icons/fa";
import StripeCheckout from "react-stripe-checkout";
import { useNavigate } from "react-router-dom";
import { SencondaryButton } from "../secondaryButton/SencondaryButton";
import url from "../../helpers/endpoint";
import axios from "axios";
import { AuthContext } from "../../App";

const getCurrentDate = () => {
  const date = new Date();
  let year = date.getFullYear();
  let month = date.getMonth() + 1;
  let dt = date.getDate();

  if (dt < 10) {
    dt = "0" + dt;
  }
  if (month < 10) {
    month = "0" + month;
  }

  return year + "-" + month + "-" + dt;
};

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
  
  useEffect(() => {
    if(props.authenticated) {
      axios
        .get(`${url}/users/user-info`, { withCredentials: true })
        .then((data) => {
          const dataArray = data.data[0];
          setInputs({
            fName: dataArray.userFirstName,
            lName: dataArray.userLastName,
            email: dataArray.emailAddress,
            country: dataArray.country,
            street: dataArray.addressLine1,
            city: dataArray.city,
            postcode: dataArray.postalCode,
          });
        })
        .catch((err) => console.log(err));
    }
  }, [])
  
  ///////

  const { authenticated } = useContext(AuthContext);
  const makePayment = async (token) => {
    let userId = null;
    if (authenticated) {
      const res = await axios.get(`${url}/users/user-info`, { withCredentials: true });
      userId = res.data[0].userID;
    } else {
      const buyer = {
        userLastName: inputs.lName,
        userFirstName: inputs.fName,
        emailAddress: inputs.email,
        addressLine1: inputs.street,
        city: inputs.city,
        postalCode: inputs.postcode,
        country: inputs.country,
      };
      const res = await axios.post(`${url}/users`, buyer);
      userId = res.data.insertId;
    }

    // add order
    const order = {
      orderDate: getCurrentDate(),
      buyerID: userId,
    };
    const response = await axios.post(`${url}/orders`, order);
    console.log(props.cart)

    const body = {
      token: token,
      products: props.cart,
    };
    const headers = {
      "Content-Type": "application/json",
    };

    try {
      const response = await fetch(`${url}/pay/payment`, {
        method: "POST",
        // credentials: 'include', TODO: do this
        headers: headers,
        body: JSON.stringify(body),
      });
      const { status } = response;
      if (status === 200) {
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
            <img src={require(`../../../../uploads/${item.productImg}`)} alt="product" />
            <p>{item.productName}</p>
            <p>{item.qty}</p>
            <p>€ {item.price}</p>
            <TiDelete className={classes.deleteIcon} onClick={props.deleteItemFromCart.bind(this, item.productID)} />
          </motion.div>
        ))
      ) : (
        <h1>No items in cart.</h1>
      )}
    </div>
  );

  const renderLogin = () => {
    if (props.authenticated) {
      setStep(3);
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
    if (props.authenticated) {
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
          <p>€ 
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
        {step !== 3 ? (
          <button onClick={nextRender} disabled={props.cart.length == 0 ? true : false} className={classes.checkoutBtn}>
            Next
          </button>
        ) : (
          <StripeCheckout stripeKey={process.env.REACT_APP_PAYMENT_KEY} token={makePayment} name="Payment Information">
            <button className={classes.checkoutBtn}>Pay now</button>
          </StripeCheckout>
        )}
      </div>
    </div>
  );
};

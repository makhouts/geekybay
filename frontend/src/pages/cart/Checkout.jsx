import React, { useState } from "react";
import { Login, Signup } from "..";
import { Modal } from "../../components/modal/Modal";
import { MultiStepForm } from "../../components/multiStepForm/MultiStepForm";
import { PageTransition } from "../../helpers/animations";
import classes from "./checkout.module.css";

export const Checkout = (props) => {
  const [showModal, setShowModal] = useState(false);  
  const getDeliveryTime = () => {
    const firstDay = new Date();
    const nextWeek = new Date(firstDay.getTime() + 7 * 24 * 60 * 60 * 1000);
    let deliveryTime = nextWeek.toLocaleDateString("nl-BE");
    return deliveryTime;
  };
  return (
    <PageTransition>
      <div className="container">
        <h1>Shopping Cart</h1>
        <MultiStepForm cart={props.cart} deleteItemFromCart={props.deleteItemFromCart} authenticated={props.authenticated} login={() => setShowModal(true)} />
        <div className={classes.delivery}>
          <h1>Estimated delivery time</h1>
          <p>Fast delivery: {getDeliveryTime()}</p>
        </div>
        <div className={classes.delivery}>
          <h4>Thank you for shopping at GeekyBay, see you soon!</h4>
        </div>
      </div>
      <Modal modalClosed={() => setShowModal(!showModal)} show={showModal}>
        <Login to={'/checkout'} />
        {props.authenticated ? console.log(showModal) : null}
      </Modal>

    </PageTransition>
  );
};

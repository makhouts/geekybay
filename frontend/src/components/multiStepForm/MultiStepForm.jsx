import React, { useState } from 'react';
import classes from './multiStepForm.module.css';
import { Link } from 'react-router-dom';

export const MultiStepForm = (props) => {
    const [step, setStep] = useState(0);
    const loggedIn = true;

    const renderItems = () => (
        <div className={classes.cartSummary}>
        
        { props.cart.length !== 0 ?  
        props.cart.map((item) => (
          <div className={classes.item} key={item.id}>
            <img src={require("../../assets/iphone.png")} alt="product" />
            <p>{item.productName}</p>
            <p>{item.qty}</p>
            <p>{item.price}</p>
          </div>
        )) : <h1>No items in cart.</h1>}
      </div>
    );

    const renderLogin = () => {
      if (loggedIn) {
        
        return <div className={classes.cartSummary}>ofkeofk</div>;
      }
    };

    const nextRender = () => {
        if (step === 3) return;
        setStep(step + 1);        
    }

    const previousRender = () => {
        if (step === 0) return;
        setStep(step - 1);        
    }


    return (
      <div className={classes.cart}>
        {step === 0 ? renderItems() : null}
        {step === 1 ? renderLogin() : null}

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
            <button
              onClick={previousRender}
              disabled={props.cart.length == 0 ? true : false}
              className={classes.checkoutBtn}
            >
              Previous
            </button>
          ) : null}
          <button
            onClick={nextRender}
            disabled={props.cart.length == 0 ? true : false}
            className={classes.checkoutBtn}
          >
            Checkout
          </button>
        </div>
      </div>
    );
}

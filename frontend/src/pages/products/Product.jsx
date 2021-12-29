import React from 'react';
import classes from './products.module.css';

let text = 'Amazing camera with beatiful bezels...'; 

export const Product = () => {
    return (
      <div className={classes.product}>
        <img src={require("../../assets/iphone.png")} alt="iphone" />
        <p>Iphone 13 Pro</p>
        <p>{text.substring(0, 20)}...</p>
        <p>€ 1299.00</p>
      </div>
    );
}

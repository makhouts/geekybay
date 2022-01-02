import React from 'react';
import classes from './products.module.css';

let text = 'Amazing camera with beatiful bezels...'; 

export const Product = (props) => {
    return (
      <div className={classes.product}>
        <img src={require("../../assets/iphone.png")} alt="iphone" />
        <p>{props.product.productName}</p>
        {props.showDescription && (
          <p>{props.product.productDescription.substring(0, 20)}...</p>
        )}
        <p className={classes.productPrice}>
          € {props.product.price.toFixed(2)}
        </p>
      </div>
    );
}

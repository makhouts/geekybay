import React from "react";
import classes from "./products.module.css";
import coat from "./coat.jpeg";
import { SencondaryButton } from "../../components/secondaryButton/SencondaryButton";

export const Products = () => {
  return (
    <div className="container">
      <div className={classes.container}>
        <div className={classes.imageContainer}>
          <img className={classes.img} src={coat} />
        </div>
        <div className={classes.infoContainer}>
          <h1 className={classes.title}>product name</h1>
          <p className={classes.description}>bdbdbdbdbdbddsadgawrgv</p>
          <div className={classes.pContainer}>
            <span className={classes.price}>Price: </span>
            <span className={classes.quantity}>Quantity:</span>
          </div>
          <div className={classes.buyContainer}>
            <button className={classes.addBtn}>+</button>
            <span className={classes.buyAmount}>1</span>
            <button className={classes.remove}>-</button>
            <SencondaryButton>Buy Now</SencondaryButton>
          </div>
        </div>
      </div>
    </div>
  );
};

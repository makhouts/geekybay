import React from "react";
import { Navigation } from "../../components/navigation/Navigation";
import classes from "./products.module.css";
import coat from "./coat.jpeg";

export const Products = () => {
  return (
    <div>
      <Navigation />

      <div className={classes.container}>
        <div className={classes.imageContainer}>
          <img className={classes.img} src={coat} />
        </div>
        <div className={classes.infoContainer}>
          <h1 className={classes.title}>product name</h1>
          <p className={classes.description}>bdbdbdbdbdb</p>
          <span className={classes.price}>$200</span>
          <span className={classes.quantity}>2000</span>
        </div>
      </div>
    </div>
  );
};

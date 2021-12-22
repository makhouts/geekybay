<<<<<<< HEAD
import React from 'react';
import { motion } from 'framer-motion';
import { PageTransition } from '../../helpers/animations';

export const Products = () => {
    return (
    <PageTransition>
      <div className='container'>
        PRODUCTS
      </div>
    </PageTransition>
    );
}
=======
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
          <p className={classes.description}>bdbdbdbdbdbddsadgawrgv</p>
          <div className={classes.pContainer}>
            <span className={classes.price}>Price: </span>
            <span className={classes.quantity}>Quantity:</span>
          </div>
          <div className={classes.buyContainer}>
            <span className={classes.buyAmount}>1</span>

            <button className={classes.btn}>Buy Now</button>
          </div>
        </div>
      </div>
    </div>
  );
};
>>>>>>> main

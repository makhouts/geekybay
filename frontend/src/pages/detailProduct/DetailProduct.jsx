import React from "react";
import { PageTransition } from "../../helpers/animations";
import classes from "./detailProduct.module.css";
import { SencondaryButton } from "../../components/secondaryButton/SencondaryButton";

export const DetailProduct = () => {
  return (
    <PageTransition>
      <div className="container">
        <div className={classes.productContainer}>
          <div className={classes.imageContainer}>
            <img
              className={classes.img}
              src={require("../../assets/iphone.png")}
            />
          </div>
          <div className={classes.infoContainer}>
            <h1 className={classes.title}>product name</h1>
            <p className={classes.description}>Insert product details</p>
            <div className={classes.pContainer}>
              <span className={classes.price}>Price: 1000</span>
              <span className={classes.satus}>Status: In Stock</span>
            </div>
            <div className={classes.buyContainer}>
              <div className={classes.quantityContainer}>
                <button className={classes.addBtn}>+</button>
                <span className={classes.buyAmount}>1</span>
                <button className={classes.removeBtn}>-</button>
              </div>
              <SencondaryButton>Add to Cart</SencondaryButton>
            </div>
          </div>
        </div>
      </div>
    </PageTransition>
  );
};

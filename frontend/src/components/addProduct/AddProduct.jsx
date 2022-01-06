import React, { useState } from "react";
import classes from "./addProduct.module.css";
import { PrimaryButton } from "../primaryButton/PrimaryButton";
import { UseInput } from "../../hook/UseInput";

export const AddProduct = () => {
  const addHandler = () => {
    //request function for add product here
  };

  const isNotEmpty = (value) => value.trim() !== "";

  const {
    value: enteredProductName,
    isValid: productNameIsValid,
    hasError: productNameHasError,
    valueChangeHandler: productNameChangeHandler,
    inputBlurHandler: productNameBlurHandler,
    reset: resetProductName,
  } = UseInput(isNotEmpty);

  const {
    value: enteredDescription,
    isValid: descriptionIsValid,
    hasError: descriptionHasError,
    valueChangeHandler: descriptionChangeHandler,
    inputBlurHandler: descriptionBlurHandler,
    reset: resetDescription,
  } = UseInput(isNotEmpty);

  const {
    value: enteredPrice,
    isValid: priceIsValid,
    hasError: priceHasError,
    valueChangeHandler: priceChangeHandler,
    inputBlurHandler: priceBlurHandler,
    reset: resetPrice,
  } = UseInput(isNotEmpty);

  const {
    value: enteredStock,
    isValid: stockIsValid,
    hasError: stockHasError,
    valueChangeHandler: stockChangeHandler,
    inputBlurHandler: stockBlurHandler,
    reset: resetStock,
  } = UseInput(isNotEmpty);

  let formIsValid = false;
  if (
    productNameIsValid &&
    descriptionIsValid &&
    priceIsValid &&
    stockIsValid
  ) {
    formIsValid = true;
  }

  const formSubmissionHandler = (event) => {
    event.preventDefault();
    addHandler();
    if (!formIsValid) {
      return;
    }
    resetProductName();
    resetDescription();
    resetPrice();
    resetStock();
  };

  return (
    <div className={classes.addProduct}>
      <h1>Add product</h1>
      <form onSubmit={formSubmissionHandler}>
        <div
          className={`${classes.formGroup} ${
            productNameHasError === true ? classes.invalid : ""
          }`}
        >
          <input
            type="text"
            name="productName"
            value={enteredProductName}
            onChange={productNameChangeHandler}
            onBlur={productNameBlurHandler}
            placeholder="Product Name"
          />
          {productNameHasError && (
            <p className={classes.error}>Please enter product name</p>
          )}
        </div>
        <div
          className={`${classes.formGroup} ${
            descriptionHasError === true ? classes.invalid : ""
          }`}
        >
          <input
            type="text"
            name="productDescription"
            value={enteredDescription}
            onChange={descriptionChangeHandler}
            onBlur={descriptionBlurHandler}
            placeholder="Product Description"
          />
          {descriptionHasError && (
            <p className={classes.error}>Please describe your product</p>
          )}
        </div>
        <div
          className={`${classes.formGroup} ${
            priceHasError === true ? classes.invalid : ""
          }`}
        >
          <input
            type="text"
            name="price"
            value={enteredPrice}
            onChange={priceChangeHandler}
            onBlur={priceBlurHandler}
            placeholder="Price"
          />
          {priceHasError && <p className={classes.error}>Pleae enter price</p>}
        </div>
        <div
          className={`${classes.formGroup} ${
            stockHasError === true ? classes.invalid : ""
          }`}
        >
          <input
            type="text"
            name="inStock"
            placeholder="Stock"
            onChange={stockChangeHandler}
            onBlur={stockBlurHandler}
            value={enteredStock}
          />
          {stockHasError && (
            <p className={classes.error}>Please enter quantities in stock</p>
          )}
        </div>
      </form>
      <div className={classes.checkboxes}>
        <label htmlFor="">Visible</label>
        <input type="checkbox" name="visible" checked />
        <label htmlFor="">Free shipping?</label>
        <input type="checkbox" name="shipping" checked />
      </div>
      <label htmlFor="">Image</label>
      <input type="file" multiple />
      <PrimaryButton onClick={addHandler}>Add product</PrimaryButton>
    </div>
  );
};

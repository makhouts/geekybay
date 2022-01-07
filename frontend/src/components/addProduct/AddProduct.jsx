import React, { useState } from "react";
import classes from "./addProduct.module.css";
import { PrimaryButton } from "../primaryButton/PrimaryButton";
import { UseInput } from "../../hook/UseInput";
import axios from "axios";
import url from "../../helpers/endpoint";

export const AddProduct = () => {
  const formData = new FormData()
  const test = (e) => {
    const file = e.target.files[0];
    formData.append('productImg', file, file.name)
  }


  const addHandler = () => {
    formData.append("productName", enteredProductName);
    formData.append('productDescription', enteredDescription);
    formData.append('price', enteredPrice);
    formData.append('inStock', enteredStock);
    formData.append('visible', '1');
    formData.append('freeShipping', '1');
    
    axios.post(`${url}/products/multiple-upload`, formData, {withCredentials: true}) 
    .then(data => console.log(data))
    .catch(err => console.log(err));

    // fetch(`${url}/products/multiple-upload`, {
    //   method: "POST",
    //   body: formData,
    //   headers: {
    //     Accept: "multipart/form-data",
    //   },
    //   credentials: "include",
    // }).then((res) => res.json())
    //   .then((res) => {
    //     console.log(res);
    //   }).catch((error) => {
    //     console.error(error);
    //   });
    //   };
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
    addHandler(event);
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
      <form
        encType="multipart/form-data"
        id="myForm"
        onSubmit={formSubmissionHandler}
      >
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
        <div className={classes.checkboxes}>
          <label htmlFor="">Visible</label>
          <input type="checkbox" name="visible" defaultChecked />
          <label htmlFor="">Free shipping?</label>
          <input type="checkbox" name="shipping" defaultChecked />
        </div>
        <label htmlFor="">Image</label>
        <input
          type="file"
          name="productImg"
          accept="image/*"
          onChange={test}
        />
      </form>
      
      <PrimaryButton clicked={addHandler}>Add product</PrimaryButton>
    </div>
  );
};

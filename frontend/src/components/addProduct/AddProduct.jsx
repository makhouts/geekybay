import React from 'react';
import classes from './addProduct.module.css';
import { PrimaryButton } from '../primaryButton/PrimaryButton'

export const AddProduct = () => {
    return (
      <div className={classes.addProduct}>
          <h1>Add product</h1>
        <input type="text" name="productName" placeholder="Product Name" />
        <input
          type="text"
          name="productDescription"
          placeholder="Product Description"
        />
        <input type="text" name="price" placeholder="Price" />
        <input type="text" name="inStock" placeholder="Stock" value="999" />
        <div className={classes.checkboxes}>
          <label htmlFor="">Visible</label>
          <input type="checkbox" name="visible" checked />
          <label htmlFor="">Free shipping?</label>
          <input type="checkbox" name="shipping" checked />
        </div>
        <label htmlFor="">Image</label>
        <input type="file" multiple />
        <PrimaryButton>Add product</PrimaryButton>
      </div>
    );
}

import React, { useState } from 'react';
import classes from './addProduct.module.css';
import { PrimaryButton } from '../primaryButton/PrimaryButton'

export const AddProduct = () => {
  const [addprod, setAddProduct] = useState({
    productName: '',
    sellerID: '',
    productDescription: '',
    price: '',
    inStock: 999,
    visible: 1,
    productImg: [],
    freeShipping: 1,
  });

  const changeProduct = (e) => {
    setAddProduct({ ...addprod, [e.target.name]: e.target.value });
    console.log(addprod);
  }

    return (
      <div className={classes.addProduct}>
          <h1>Add product</h1>
        <input type="text" name="productName" placeholder="Product Name" onChange={changeProduct} value={addprod.productName} />
        <input
          type="text"
          name="productDescription"
          placeholder="Product Description"
          value={addprod.productDescription}
          onChange={changeProduct}
        />
        <input type="number" name="price" placeholder="Price in €" onChange={changeProduct} value={addprod.price} />
        <div className={classes.checkboxes}>
          <label htmlFor="">Visible</label>
          <input type="checkbox" name="visible" defaultChecked/>
          <label htmlFor="">Free shipping?</label>
          <input type="checkbox" name="shipping" defaultChecked/>
        </div>
        <label htmlFor="">Image</label>
        <input type="file" name='productImg' accept="image/*" value={addprod.productImg} onChange={changeProduct} multiple />
        <PrimaryButton>Add product</PrimaryButton>
      </div>
    );
}

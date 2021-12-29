import React, { useState } from "react";
import classes from "./products.module.css";
import { PageTransition } from '../../helpers/animations';
import { Modal } from '../../components/modal/Modal';
import { AddProduct } from "../../components/addProduct/AddProduct";
import { Product } from "./Product";


export const Products = () => {
  const [showModal, setShowModal] = useState(false);

  const toggleModal = () => {
    setShowModal(!showModal);
  }

  return (
    <PageTransition>
      <div className="container">
        <p onClick={toggleModal}>+ Add product</p>
        <Modal show={showModal} modalClosed={toggleModal}>
          <AddProduct />
        </Modal>
        <div className={classes.productsContainer}>
          <div className={classes.filter}>
            <div className="price">
              <label>Price</label>
              <div className={classes.priceFilter}>
                <input type="text" name="minPrice" placeholder="€" />
                <input type="text" name="maxPrice" placeholder="€" />
              </div>
            </div>
            <div className="shipping">
              <label>Shipping</label>
              <div className={classes.shippingFilter}>
                <input type="checkbox" />
                <label htmlFor="">Free international shipping</label>
              </div>
            </div>
          </div>
          <div className={classes.products}>
            <Product />
            <Product />

            <Product />

            <Product />

            <Product />
            <Product />

            <Product />

            <Product />

            <Product />
            <Product />

            <Product />

            <Product />

            <Product />
            <Product />

            <Product />

            <Product />

            <Product />
          </div>
        </div>
      </div>
    </PageTransition>
  );};

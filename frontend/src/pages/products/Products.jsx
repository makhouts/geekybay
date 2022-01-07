import React, { useEffect, useState } from "react";
import classes from "./products.module.css";
import { PageTransition } from '../../helpers/animations';
import { Modal } from '../../components/modal/Modal';
import { AddProduct } from "../../components/addProduct/AddProduct";
import { Product } from "./Product";
import { Link, useParams } from 'react-router-dom';
import Spinner from "../../components/spinner/Spinner";
import { PrimaryButton } from "../../components/primaryButton/PrimaryButton";


export const Products = (props) => {
  const [showModal, setShowModal] = useState(false);
  const searchQuery = useParams('');

  useEffect(() => {
    if(Object.keys(searchQuery).length == 1) {
      props.searchProduct(searchQuery.search);
    }
  }, []);

  const toggleModal = () => {
    setShowModal(!showModal);
  }
  return (
    <PageTransition>
      <div className="container">
        {props.authenticated ? (
          <div>
            <PrimaryButton clicked={toggleModal} btnStyle='red'>Add product</PrimaryButton>
            <Modal show={showModal} modalClosed={toggleModal}>
              <AddProduct />
            </Modal>
          </div>
        ) : null}
        <div className={classes.productsContainer}>
          <div className={classes.filter}>
            <div className="shipping">
              <label>Shipping</label>
              <div className={classes.shippingFilter}>
                <input
                  type="checkbox"
                  onClick={(e) => {
                    props.showOnlyFreeShipping(e.target.checked);
                  }}
                />
                <label htmlFor="">Free international shipping</label>
              </div>
            </div>
          </div>
          <div className={classes.products}>
            {props.showSpinner && <Spinner />}
            {props.products.map((product) => (
              <Link
                key={product.productID}
                product={product}
                to={`/productDetail/${product.productID}`}
              >
                <Product imgPath='../../../../' product={product} showDescription={true} />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </PageTransition>
  );};

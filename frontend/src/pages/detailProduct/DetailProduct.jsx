import React, { useState, useEffect } from "react";
import { PageTransition } from "../../helpers/animations";
import classes from "./detailProduct.module.css";
import { SencondaryButton } from "../../components/secondaryButton/SencondaryButton";
import { useParams } from "react-router";
import axios from "axios";
import Spinner from "../../components/spinner/Spinner";

export const DetailProduct = (props) => {
  const [product, setProduct] = useState();
  const [qty, setQty] = useState(1);
  const { id } = useParams();
  const [showSpinner, setShowSpinner] = useState(true);

  useEffect(async () => {
    try {
      const getProduct = await axios.get(
        `https://geekybay.herokuapp.com/products/product/${id}`
      );
      setProduct(getProduct.data);
      setShowSpinner(false);
    } catch (error) {
      alert(error);
    }
  }, []);

if(showSpinner) {
  return <Spinner />
} else {
  return (
    <PageTransition>
      {showSpinner && <Spinner />}
      <div className="container">
        <div className={classes.productContainer}>
          <div className={classes.imageContainer}>
            <img
              className={classes.img}
              src={require("../../assets/iphone.png")}
            />
          </div>
          <div className={classes.infoContainer}>
            <h1 className={classes.title}>{product[0].productName}</h1>
            <p className={classes.description}>
              {product[0].productDescription}
            </p>
            <div className={classes.pContainer}>
              <span className={classes.price}>€ {product[0].price}</span>
              <span className={classes.satus}>Stock: {product[0].inStock}</span>
            </div>
            <div className={classes.buyContainer}>
              <div className={classes.quantityContainer}>
                <button onClick={() => setQty(qty -1)} className={classes.removeBtn}>-</button>
                <span className={classes.buyAmount}>{qty}</span>
                <button onClick={() => setQty(qty +1)} className={classes.addBtn}>+</button>
              </div>
              <SencondaryButton clicked={() => props.addToCart(product, qty)}>
                Add to Cart
              </SencondaryButton>
            </div>
          </div>
        </div>
      </div>
    </PageTransition>
  );
};
};

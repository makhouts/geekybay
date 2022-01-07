import React from 'react';
import { Link } from 'react-router-dom';
import classes from './home.module.css';
import { PageTransition } from '../../helpers/animations';
import { PrimaryButton } from '../../components/primaryButton/PrimaryButton';
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import carousel1 from '../../assets/carousel1.png';
import carousel2 from '../../assets/carousel2.png';
import carousel3 from '../../assets/carousel3.png';
import { Product } from '../products/Product';


export const Home = (props) => {
    return (
      <PageTransition>
        <div className="container">
          <div className={classes.carousel}>
            <Carousel
              autoPlay
              showStatus={false}
              showThumbs={false}
              infiniteLoop
            >
              <div>
                <img className={classes.carouselImages} src={carousel1} />
              </div>
              <div>
                <img className={classes.carouselImages} src={carousel2} />
              </div>
              <div>
                <img className={classes.carouselImages} src={carousel3} />
              </div>
            </Carousel>
          </div>
          <div className={classes.productsRows}>
            <section>
              <h1>Today's Deals - All with free shipping!</h1>
              <div className={classes.todaysDealRow}>
                {props.products.slice(0, 5).map((product, i) => (
                  <div key={i} className={classes.tDeal}>
                    <Link to={`productDetail/${product.productID}`}>
                      <Product product={product} />
                    </Link>
                  </div>
                ))}
              </div>
            </section>
          </div>
          <div className={classes.productsRows}>
            <section>
              <h1>Bestsellers - Limited stock!</h1>
              <div className={classes.todaysDealRow}>
                {props.products.slice(5, 10).map((product, i) => (
                  <div key={i} className={classes.tDeal}>
                    <Link to={`productDetail/${product.productID}`}>
                      <Product imgPath='../../../../' product={product} />
                    </Link>
                  </div>
                ))}
              </div>
            </section>
          </div>
          <div>
            <section className={classes.sellAdBanner}>
              <div className={classes.createAccountAd}>
                <h1 className={classes.adText}>Sell without any risk.</h1>
                <p className={classes.adText}>Sell for free now!</p>
                <br />
                <Link to="login">
                  <PrimaryButton btnStyle="red">Sell now</PrimaryButton>
                </Link>
              </div>
              <div className={classes.sellAd}></div>
            </section>
          </div>
        </div>
      </PageTransition>
    );
};
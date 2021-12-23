import React from 'react';
import { motion } from 'framer-motion';
import classes from './home.module.css';
import { PageTransition } from '../../helpers/animations';
import { PrimaryButton } from '../../components/primaryButton/PrimaryButton';
import { SearchBar } from '../../components/searchBar/SearchBar';
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import carousel1 from '../../assets/carousel1.png';
import carousel2 from '../../assets/carousel2.png';
import carousel3 from '../../assets/carousel3.png';


export const Home = (props) => {
    return (
      <PageTransition>
        <div className="container">
          <SearchBar />
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
          <div className="today-deals">
            <section>
              <h1>Today's Deals - All with free shipping!</h1>
              <div className={classes.todaysDealRow}>
                  {props.products.map(product => (
                    <div className={classes.tDeal}>
                      <img src={require('../../assets/iphone.png')} alt="product-image" />
                      <h4>{product.price}</h4>
                      <p>old price | Free shipping</p>
                    </div>
                  ))}
              </div>
            </section>
          </div>
        </div>
      </PageTransition>
    );
};
import React from 'react';
import { Link } from 'react-router-dom';
import classes from './footer.module.css';
import {AiOutlineFacebook, AiOutlineInstagram, AiOutlineTwitter } from 'react-icons/ai';

export const Footer = () => {
    return (
      <footer className={classes.footer}>
        <div className="footerRow">
          <div className={classes.content}>
            <div className={classes.footerLeftContent}>
              <Link to="/">
                <img className={classes.logo} src={require("../../assets/logo.png")} alt="" />
              </Link>
              <div className={classes.footerLinks}>
                <Link to="/">Home</Link> -<Link to="products"> Products</Link> -
                <Link to="contact"> Contact</Link> -
                <Link to="login"> Login</Link>
              </div>
            </div>
            <div className={classes.middleContent}>
              <h5>Follow us!</h5>
              <AiOutlineFacebook className={classes.facebook} />
              <AiOutlineInstagram className={classes.instagram} />
              <AiOutlineTwitter className={classes.twitter} />
            </div>
            <div className={classes.rightContent}>
              <h5>Call us</h5>
              <p>+324 85 56 54 23</p>
            </div>
          </div>
        </div>
        <div className={classes.policy}>
          <p>© {new Date().getFullYear()} GeekyBay. All Rights Reserved</p>
          <p>Privacy Policy - Terms and Conditions</p>
        </div>
      </footer>
    );
}

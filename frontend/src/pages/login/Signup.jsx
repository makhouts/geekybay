import React from "react";
import classes from "./login.module.css";
import { SencondaryButton } from "../../components/secondaryButton/SencondaryButton";
import { Link } from "react-router-dom";
export const Signup = () => {
  return (
    <div className="container">
      <div className={classes.boxContainer}>
        <div className={classes.topContainer}>
          <div className={classes.backDrop}></div>
          <div className={classes.headerContainer}>
            <div className={classes.headText}>Create Account</div>
          </div>
        </div>
        <div className={classes.form}>
          <div className={classes.formGroup}>
            <label className={classes.label}>User Name</label>
            <input
              className={classes.formInput}
              type="email"
              placeholder="Email"
            />
          </div>
          <div className={classes.formGroup}>
            <label className={classes.label}>Password</label>
            <input
              className={classes.formInput}
              type="password"
              placeholder="Password"
            />
          </div>
          <div className={classes.formGroup}>
            <label className={classes.label}>Confirm Password</label>
            <input
              className={classes.formInput}
              type="password"
              placeholder="Confirm Password"
            />
          </div>
        </div>
        <div className={classes.buttonContainer}>
          <SencondaryButton class={classes.btn} type="submit">
            SignUp
          </SencondaryButton>
        </div>
        <div className={classes.linkContainer}>
          <p class={classes.linkText}>Already have an account?</p>
          <Link className={classes.link} to="/shippingAddress">
            Login
          </Link>
        </div>
      </div>
    </div>
  );
};

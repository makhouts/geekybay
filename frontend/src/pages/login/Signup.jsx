import React from "react";
import { Navigation } from "../../components/navigation/Navigation";
import classes from "./login.module.css";

export const Signup = () => {
  return (
    <div>
      <Navigation />
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
          <button class={classes.btn} type="submit">
            SignUp
          </button>
        </div>
        <div className={classes.linkContainer}>
          <p class={classes.linkText}>Already have an account?</p>
          <a class={classes.link} href="#">
            Login
          </a>
        </div>
      </div>
    </div>
  );
};

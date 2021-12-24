import React from "react";
import classes from "./login.module.css";
import { PageTransition } from "../../helpers/animations";
import { Link } from "react-router-dom";

export const Login = () => {
  return (
    <PageTransition>
      <div>
        <div className={classes.boxContainer}>
          <div className={classes.topContainer}>
            <div className={classes.backDrop}></div>
            <div className={classes.headerContainer}>
              <div className={classes.headText}>Login</div>
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
          </div>
          <div className={classes.buttonContainer}>
            <button class={classes.btn} type="submit">
              Login
            </button>
          </div>
          <div className={classes.linkContainer}>
            <p class={classes.linkText}>Don't have an account?</p>
            <Link to="/signUp">SignUp</Link>
          </div>
        </div>
      </div>
    </PageTransition>
  );
};

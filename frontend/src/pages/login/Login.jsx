import React from "react";
import classes from "./login.module.css";
import { SencondaryButton } from "../../components/secondaryButton/SencondaryButton";

export const Login = () => {
  return (
    <div className="container">
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
          <SencondaryButton class={classes.btn} type="submit">
            Login
          </SencondaryButton>
        </div>
        <div className={classes.linkContainer}>
          <p class={classes.linkText}>Don't have an account?</p>
          <a class={classes.link} href="#">
            SignUp
          </a>
        </div>
      </div>
    </div>
  );
};

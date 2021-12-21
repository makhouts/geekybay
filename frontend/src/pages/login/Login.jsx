import React from "react";
import classes from "./login.module.css";

export const Login = () => {
  return (
    <div className={classes.boxContainer}>
      <div className={classes.topContainer}>
        <div className={classes.backDrop}></div>
        <div className={classes.headerContainer}>
          <div className={classes.headText}>Login</div>
        </div>
      </div>
      <div className={classes.form}>
        <div className={classes.formGroup}>
          <label>User Name</label>
          <input
            className={classes.formInput}
            type="email"
            placeholder="Email"
          />
        </div>
        <div className={classes.formGroup}>
          <label>Password</label>
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
        <a class={classes.link} href="#">
          SignUp
        </a>
      </div>
    </div>
  );
};

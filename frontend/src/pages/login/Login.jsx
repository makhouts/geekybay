import React, { useState, useEffect } from "react";
import classes from "./login.module.css";
import { PageTransition } from "../../helpers/animations";
import { Link } from "react-router-dom";
import { SencondaryButton } from "../../components/secondaryButton/SencondaryButton";

export const Login = () => {
  const [enterEmail, setEnterEmail] = useState("");
  const [emailIsValid, setEmailIsValid] = useState();
  const [enterPassword, setEnterPassword] = useState("");
  const [passwordIsValid, setPasswordIsValid] = useState();

  const emailChangeHandler = (event) => {
    setEnterEmail(event.target.value);
  };

  const passwordChangeHandler = (event) => {
    setEnterPassword(event.target.value);
  };

  const validateEmailHandler = () => {
    setEmailIsValid(enterEmail.includes("@"));
  };

  const validatePasswordHandler = () => {
    setPasswordIsValid(enterPassword.trim().length > 6);
  };

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
            <form>
              <div
                className={`${classes.formGroup} ${
                  emailIsValid === false ? classes.invalid : ""
                }`}
              >
                <label>User Name</label>
                <input
                  type="email"
                  id="email"
                  value={enterEmail}
                  onChange={emailChangeHandler}
                  onBlur={validateEmailHandler}
                  placeholder="Email"
                />
              </div>
              <div
                className={`${classes.formGroup} ${
                  passwordIsValid === false ? classes.invalid : ""
                }`}
              >
                <label>Password</label>
                <input
                  type="password"
                  id="password"
                  value={enterPassword}
                  onChange={passwordChangeHandler}
                  onBlur={validatePasswordHandler}
                  placeholder="Password"
                />
              </div>
            </form>
          </div>
          <div className={classes.buttonContainer}>
            <SencondaryButton class={classes.btn} type="submit">
              Login
            </SencondaryButton>
          </div>
          <div className={classes.linkContainer}>
            <p class={classes.linkText}>Don't have an account?</p>
            <Link className={classes.link} to="/signUp">
              SignUp
            </Link>
          </div>
        </div>
      </div>
    </PageTransition>
  );
};

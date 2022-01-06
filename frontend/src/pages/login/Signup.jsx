import React, { useState } from "react";
import classes from "./login.module.css";
import { SencondaryButton } from "../../components/secondaryButton/SencondaryButton";
import { Link, useNavigate } from "react-router-dom";
import { UseInput } from "../../hook/UseInput";
import { GuestForm } from "../../components/multiStepForm/GuestForm";
import axios from "axios";

export const Signup = () => {
  // const [username, setUsername] = useState("");
  // const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");
  // const [confirmPassword, setConfirmPassword] = useState("");

  const navigate = useNavigate();

  const postRegister = () => {
    axios
      .post("https://geekybay.herokuapp.com/auth/register", {
        userName: enteredUsername,
        emailAddress: enteredEmail,
        password: enteredPassword,
      })
      .then((res) => {
        return res.status === 200 ? navigate("/login") : null;
      });
  };

  const [singup, setSingup] = useState(false);
  const {
    value: enteredUsername,
    isValid: enteredUsernameIsValid,
    hasError: usernameHasError,
    valueChangeHandler: usernameChangeHandler,
    inputBlurHandler: usernameBlurHandler,
    reset: resetUsernameInput,
  } = UseInput((value) => value.trim() !== "");

  const {
    value: enteredEmail,
    isValid: enteredEmailIsValid,
    hasError: emailInputHasError,
    valueChangeHandler: emailChangeHandler,
    inputBlurHandler: emailBlurHandler,
    reset: resetEmailInput,
  } = UseInput((value) => value.includes("@"));

  const {
    value: enteredPassword,
    isValid: enteredPasswordIsValid,
    hasError: passwordInputHasError,
    valueChangeHandler: passwordChangeHandler,
    inputBlurHandler: passwordBlurHandler,
    reset: resetPasswordInput,
  } = UseInput((value) => value.trim().length > 6);

  const {
    value: enteredConfirm,
    isValid: enteredConfirmIsValid,
    hasError: confirmInputHasError,
    valueChangeHandler: confirmChangeHandler,
    inputBlurHandler: confirmBlurHandler,
    reset: resetConfirmInput,
  } = UseInput((value) => value.trim().length > 6);

  let formIsValid = false;
  if (
    enteredUsername &&
    enteredEmailIsValid &&
    enteredPasswordIsValid &&
    enteredConfirmIsValid &&
    enteredPassword === enteredConfirm
  ) {
    formIsValid = true;
  }

  const formSubmissionHandler = (event) => {
    event.preventDefault();
    postRegister();
    if (!formIsValid) {
      return;
    }
    resetEmailInput();
    resetPasswordInput();
    resetConfirmInput();
  };

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
          <form onSubmit={formSubmissionHandler}>
            <div
              className={`${classes.formGroup} ${
                usernameHasError === true ? classes.invalid : ""
              }`}
            >
              <label htmlFor="username">User Name</label>
              <input
                type="username"
                id="username"
                value={enteredUsername}
                onChange={usernameChangeHandler}
                onBlur={usernameBlurHandler}
                placeholder="Username"
              />
              {usernameHasError && (
                <p className={classes.error}>Please enter your username</p>
              )}
            </div>
            <div
              className={`${classes.formGroup} ${
                emailInputHasError === true ? classes.invalid : ""
              }`}
            >
              <label htmlFor="email">User Name</label>
              <input
                type="email"
                id="email"
                value={enteredEmail}
                onChange={emailChangeHandler}
                onBlur={emailBlurHandler}
                placeholder="Email"
              />
              {emailInputHasError && (
                <p className={classes.error}>Please enter a valid email</p>
              )}
            </div>

            <div
              className={`${classes.formGroup} ${
                passwordInputHasError === true ? classes.invalid : ""
              }`}
            >
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                value={enteredPassword}
                onChange={passwordChangeHandler}
                onBlur={passwordBlurHandler}
                placeholder="Enter minimum 7 digits password"
              />
              {passwordInputHasError && (
                <p className={classes.error}>
                  Please enter a minmum 7 digits password
                </p>
              )}
            </div>
            <div
              className={`${classes.formGroup} ${
                confirmInputHasError === true ? classes.invalid : ""
              }`}
            >
              <label htmlFor="password">Confirm Password</label>
              <input
                type="password"
                id="passwordConfim"
                value={enteredConfirm}
                onChange={confirmChangeHandler}
                onBlur={confirmBlurHandler}
                placeholder="Confirm your password"
              />
              {passwordInputHasError && (
                <p className={classes.error}>Please confirm your password</p>
              )}
            </div>
          </form>
        </div>

        <div className={classes.buttonContainer}>
          <SencondaryButton
            class={classes.btn}
            type="submit"
            onClick={postRegister}
          >
            SignUp
          </SencondaryButton>
        </div>
        <div className={classes.linkContainer}>
          <p className={classes.linkText}>Already have an account?</p>
          <Link className={classes.link} to="/userProfile">
            Login
          </Link>
        </div>
      </div>
    </div>
  );
};

import React from "react";
import classes from "./login.module.css";
import { SencondaryButton } from "../../components/secondaryButton/SencondaryButton";
import { Link } from "react-router-dom";
import { UseInput } from "../../hook/UseInput";

export const Signup = () => {
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
    enteredEmailIsValid &&
    enteredPasswordIsValid &&
    enteredConfirmIsValid &&
    enteredPassword === enteredConfirm
  ) {
    formIsValid = true;
    console.log(enteredEmail, enteredPassword, enteredConfirm);
  }

  const formSubmissionHandler = (event) => {
    event.preventDefault();
    if (
      !enteredEmailIsValid ||
      !enteredPasswordIsValid ||
      !enteredConfirmIsValid
    ) {
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
                emailInputHasError === true ? classes.invalid : ""
              }`}
            >
              <label>User Name</label>
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
              <label>Password</label>
              <input
                type="password"
                id="password"
                value={enteredPassword}
                onChange={passwordChangeHandler}
                onBlur={passwordBlurHandler}
                placeholder="Password"
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
              <label>Confirm Password</label>
              <input
                type="password"
                id="password"
                value={enteredConfirm}
                onChange={confirmChangeHandler}
                onBlur={confirmBlurHandler}
                placeholder="Confirm Password"
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
            disabled={!formIsValid}
            onClick={buttonHandler}
          >
            SignUp
          </SencondaryButton>
        </div>
        <div className={classes.linkContainer}>
          <p class={classes.linkText}>Already have an account?</p>
          <Link className={classes.link} to="/userProfile">
            Login
          </Link>
        </div>
      </div>
    </div>
  );
};

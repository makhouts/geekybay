import React, { useState, useContext } from "react";
import classes from "./login.module.css";
import { PageTransition } from "../../helpers/animations";
import { Link, useNavigate } from "react-router-dom";
import { SencondaryButton } from "../../components/secondaryButton/SencondaryButton";
import { UseInput } from "../../hook/UseInput";
import axios from "axios";
import url from "../../helpers/endpoint";
import { AuthContext } from "../../App";

export const Login = (props) => {
  const { setAuthenticated } = useContext(AuthContext);
  const [showError, setShowError] = useState(false);
  const navigate = useNavigate();

  const postLogin = () => {
    axios
      .post(
        `${url}/auth/login`,
        {
          username: enteredUsername,
          password: enteredPassword,
        },
        {
          withCredentials: true,
        }
      )
      .then((response) => {
        if (response.status === 200) {
          setAuthenticated(true);
          
          setShowError(false);
        }
        navigate(props.to == undefined ? "/" : props.to);
      })
      .catch((err) => {
        setShowError(true);
      } );
  };

  const {
    value: enteredUsername,
    isValid: enteredUsernameIsValid,
    hasError: usernameInputHasError,
    valueChangeHandler: usernameChangeHandler,
    inputBlurHandler: usernameBlurHandler,
    reset: resetUsernameInput,
  } = UseInput((value) => value.trim() !== "");

  const {
    value: enteredPassword,
    isValid: enteredPasswordIsValid,
    hasError: passwordInputHasError,
    valueChangeHandler: passwordChangeHandler,
    inputBlurHandler: passwordBlurHandler,
    reset: resetPasswordInput,
  } = UseInput((value) => {
    return value.trim().length > 6;
  });

  let formIsValid = false;
  if (enteredUsernameIsValid && enteredPasswordIsValid) {
    formIsValid = true;
  }

  const formSubmissionHandler = (event) => {
    event.preventDefault();
    postLogin();
    if (!formIsValid) {
      return;
    }
    resetUsernameInput();
    resetPasswordInput();
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
            <form onSubmit={formSubmissionHandler}>
              <div
                className={`${classes.formGroup} ${
                  usernameInputHasError === true ? classes.invalid : ""
                }`}
              >
                {showError && (
                  <p className={classes.error}>
                    Username or Password wrong.
                  </p>
                )}
                <label htmlFor="username">User Name</label>
                <input
                  type="text"
                  id="username"
                  value={enteredUsername}
                  onChange={usernameChangeHandler}
                  onBlur={usernameBlurHandler}
                  placeholder="Username"
                />
                {usernameInputHasError && (
                  <p className={classes.error}>Please enter your username</p>
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
                  placeholder="Password"
                />
                {passwordInputHasError && (
                  <p className={classes.error}>
                    Please enter a minmum 7 digits password
                  </p>
                )}
              </div>
            </form>
          </div>
          <div className={classes.buttonContainer}>
            <SencondaryButton
              className={classes.btn}
              type="submit"
              onClick={postLogin}
            >
              Login
            </SencondaryButton>
          </div>
          <div className={classes.linkContainer}>
            <p className={classes.linkText}>Don't have an account?</p>
            <Link className={classes.link} to="/signUp">
              SignUp
            </Link>
          </div>
        </div>
      </div>
    </PageTransition>
  );
};


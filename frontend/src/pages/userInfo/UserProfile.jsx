import React, { useState } from "react";
import classes from "./userProfile.module.css";
import { PageTransition } from "../../helpers/animations";
import { SencondaryButton } from "../../components/secondaryButton/SencondaryButton";
import { UseInput } from "../../hook/UseInput";

export const UserProfile = () => {
  const [update, setUpdate] = useState(false);

  const isNotEmpty = (value) => value.trim() !== "";
  const isEmail = (value) => value.includes("@");
  const isPassword = (value) => value.trim().length > 6;
  // const isPhoneNumber = (value) => value.length > 10;

  const {
    value: enteredEmail,
    isValid: enteredEmailIsValid,
    hasError: emailInputHasError,
    valueChangeHandler: emailChangeHandler,
    inputBlurHandler: emailBlurHandler,
    reset: resetEmailInput,
  } = UseInput(isEmail);

  const {
    value: enteredPassword,
    isValid: enteredPasswordIsValid,
    hasError: passwordInputHasError,
    valueChangeHandler: passwordChangeHandler,
    inputBlurHandler: passwordBlurHandler,
    reset: resetPasswordInput,
  } = UseInput(isPassword);

  const {
    value: enteredConfirm,
    isValid: enteredConfirmIsValid,
    hasError: confirmInputHasError,
    valueChangeHandler: confirmChangeHandler,
    inputBlurHandler: confirmBlurHandler,
    reset: resetConfirmInput,
  } = UseInput(isPassword);

  const {
    value: enteredFirstName,
    isValid: firstNameIsValid,
    hasError: firstNameHasError,
    valueChangeHandler: firstNameChangeHandler,
    inputBlurHandler: firstNameBlurHandler,
    reset: resetfirstNameInput,
  } = UseInput(isNotEmpty);

  const {
    value: enteredLastName,
    isValid: lastNameIsValid,
    hasError: lastNameHasError,
    valueChangeHandler: lastNameChangeHandler,
    inputBlurHandler: lastNameBlurHandler,
    reset: resetLastNameInput,
  } = UseInput(isNotEmpty);

  const {
    value: enteredPhoneNumber,
    isValid: phoneNumberIsValid,
    hasError: phoneNumberHasError,
    valueChangeHandler: phoneNumberChangeHandler,
    inputBlurHandler: phoneNumberBlurHandler,
    reset: resetphoneNumberInput,
  } = UseInput(isNotEmpty);

  const {
    value: enteredStreet,
    isValid: streetIsValid,
    hasError: streetHasError,
    valueChangeHandler: streetChangeHandler,
    inputBlurHandler: streetBlurHandler,
    reset: resetstreetInput,
  } = UseInput(isNotEmpty);

  const {
    value: enteredCity,
    isValid: cityIsValid,
    hasError: cityHasError,
    valueChangeHandler: cityChangeHandler,
    inputBlurHandler: cityBlurHandler,
    reset: resetcityInput,
  } = UseInput(isNotEmpty);

  const {
    value: enteredPost,
    isValid: postIsValid,
    hasError: postHasError,
    valueChangeHandler: postChangeHandler,
    inputBlurHandler: postBlurHandler,
    reset: resetpostInput,
  } = UseInput(isNotEmpty);

  const {
    value: enteredCountry,
    isValid: countryIsValid,
    hasError: countryHasError,
    valueChangeHandler: countryChangeHandler,
    inputBlurHandler: countryBlurHandler,
    reset: resetcountryInput,
  } = UseInput(isNotEmpty);

  let userFormIsValid = false;
  if (
    enteredEmailIsValid &&
    enteredPasswordIsValid &&
    enteredConfirmIsValid &&
    enteredPassword === enteredConfirm
  ) {
    userFormIsValid = true;
  }

  let addressFormIsValid = false;
  if (
    firstNameIsValid &&
    lastNameIsValid &&
    phoneNumberIsValid &&
    streetIsValid &&
    cityIsValid &&
    postIsValid &&
    countryIsValid
  ) {
    addressFormIsValid = true;
  }

  const userSubmitHandler = (event) => {
    event.preventDefault();
    userUpdatedHandler();
    if (!userFormIsValid) {
      return;
    }
  };

  const addressSubmitHandler = (event) => {
    event.preventDefault();
    addressUpdateHandler();
    if (!addressFormIsValid) {
      return;
    }
  };
  const userUpdatedHandler = () => {
    setUpdate(true);
    console.log(enteredEmail, enteredPassword, enteredConfirm);
  };

  const addressUpdateHandler = () => {
    setUpdate(true);
    // console.log(enteredFirstName, enteredLastName);
  };

  const userCancelHandler = () => {
    setUpdate(false);
    resetEmailInput();
    resetPasswordInput();
    resetConfirmInput();
  };

  const addressCancelHandler = () => {
    setUpdate(false);
    resetfirstNameInput();
    resetLastNameInput();
    resetphoneNumberInput();
    resetstreetInput();
    resetcityInput();
    resetpostInput();
    resetcountryInput();
  };

  return (
    <PageTransition>
      <div className="container">
        <div className={classes.topContainer}>
          <div className={classes.heading}>User Profile</div>
        </div>
        <div className={classes.formContainer}>
          <div className={classes.form}>
            <form onSubmit={userSubmitHandler}>
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
                  placeholder="Enter email"
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
                  <p className={classes.error}>
                    Please enter a minmum 7 digits password
                  </p>
                )}
              </div>
            </form>
          </div>
          <div className={classes.btnContainer}>
            <SencondaryButton
              className={classes.btn}
              type="submit"
              disabled={!userFormIsValid}
              onClick={userUpdatedHandler}
            >
              Update
            </SencondaryButton>
            <SencondaryButton
              className={classes.btn}
              type="button"
              onClick={userCancelHandler}
            >
              Cancel
            </SencondaryButton>
          </div>
        </div>
        <div className={classes.formContainer}>
          <div className={classes.form}>
            <form onSubmit={addressSubmitHandler}>
              <div
                className={`${classes.formGroup} ${
                  firstNameHasError === true ? classes.invalid : ""
                }`}
              >
                <label htmlFor="firstname">First Name</label>
                <input
                  type="text"
                  id="firstname"
                  value={enteredFirstName}
                  onChange={firstNameChangeHandler}
                  onBlur={firstNameBlurHandler}
                  placeholder="Enter firstname"
                />
                {firstNameHasError && (
                  <p className={classes.error}>Please enter your firstname</p>
                )}
              </div>
              <div
                className={`${classes.formGroup} ${
                  lastNameHasError === true ? classes.invalid : ""
                }`}
              >
                <label htmlFor="lastname">Last Name</label>
                <input
                  type="text"
                  id="lastname"
                  value={enteredLastName}
                  onChange={lastNameChangeHandler}
                  onBlur={lastNameBlurHandler}
                  placeholder="Enter lastname"
                />
                {lastNameHasError && (
                  <p className={classes.error}>Please enter your lastname</p>
                )}
              </div>
              <div
                className={`${classes.formGroup} ${
                  phoneNumberHasError === true ? classes.invalid : ""
                }`}
              >
                <label htmlFor="phone">Phone Number</label>
                <input
                  type="text"
                  id="phone"
                  value={enteredPhoneNumber}
                  onChange={phoneNumberChangeHandler}
                  onBlur={phoneNumberBlurHandler}
                  placeholder="Enter phone number"
                />
                {phoneNumberHasError && (
                  <p className={classes.error}>
                    Please enter your phone number
                  </p>
                )}
              </div>
              <div
                className={`${classes.formGroup} ${
                  streetHasError === true ? classes.invalid : ""
                }`}
              >
                <label htmlFor="street">Street</label>
                <input
                  type="text"
                  id="street"
                  value={enteredStreet}
                  onChange={streetChangeHandler}
                  onBlur={streetBlurHandler}
                  placeholder="Enter street"
                />
                {streetHasError && (
                  <p className={classes.error}>Please enter street</p>
                )}
              </div>
              <div
                className={`${classes.formGroup} ${
                  cityHasError === true ? classes.invalid : ""
                }`}
              >
                <label htmlFor="city">City</label>
                <input
                  type="text"
                  id="city"
                  value={enteredCity}
                  onChange={cityChangeHandler}
                  onBlur={cityBlurHandler}
                  placeholder="Enter city"
                />
                {cityHasError && (
                  <p className={classes.error}>Please enter city</p>
                )}
              </div>
              <div
                className={`${classes.formGroup} ${
                  postHasError === true ? classes.invalid : ""
                }`}
              >
                <label htmlFor="postcode">Postal Code</label>
                <input
                  type="text"
                  id="postcode"
                  value={enteredPost}
                  onChange={postChangeHandler}
                  onBlur={postBlurHandler}
                  placeholder="Enter postal code"
                />
                {postHasError && (
                  <p className={classes.error}>Please enter postal code</p>
                )}
              </div>
              <div
                className={`${classes.formGroup} ${
                  countryHasError === true ? classes.invalid : ""
                }`}
              >
                <label htmlFor="country">Country</label>
                <input
                  type="text"
                  id="country"
                  value={enteredCountry}
                  onChange={countryChangeHandler}
                  onBlur={countryBlurHandler}
                  placeholder="Enter country"
                />
                {countryHasError && (
                  <p className={classes.error}>Please enter country</p>
                )}
              </div>
            </form>
          </div>
          <div className={classes.btnContainer}>
            <SencondaryButton
              className={classes.btnS}
              type="submit"
              disabled={!addressFormIsValid}
              onClick={addressUpdateHandler}
            >
              Update
            </SencondaryButton>
            <SencondaryButton
              className={classes.btnC}
              type="button"
              onClick={addressCancelHandler}
            >
              Cancel
            </SencondaryButton>
          </div>
        </div>
      </div>
    </PageTransition>
  );
};

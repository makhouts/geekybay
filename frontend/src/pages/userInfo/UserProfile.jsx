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


  const userSubmitHandler = (event) => {
    event.preventDefault();
    userUpdatedHandler();
    if (!userFormIsValid) {
      return;
    }
    resetEmailInput();
    resetPasswordInput();
    resetConfirmInput();
  };

  const userUpdatedHandler = () => {
    setUpdate(true);
  };
  const userCancelHandler = () => {
    setUpdate(false);
    resetEmailInput();
    resetPasswordInput();
    resetConfirmInput();
  };

  return (
    <PageTransition>
      <div className="container">
        <div className={classes.topContainer}>
          <div className={classes.heading}>User Profile</div>
        </div>
        <div className={classes.passContainer}>
          <div className={classes.passForm}>
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
        <div className={classes.addressContainer}>
          <div className={classes.addressForm}>
            <form>
              <div
                // className={`${classes.formGroup} ${
                //   // firstNameInputHasError === true ? classes.invalid : ""
                // }`}
              >
                <label htmlFor="name">First Name</label>
                <input
                  className={classes.formInput}
                  type="text"
                  placeholder="Enter firstname"
                ></input>
              </div>
              <div className={classes.formGrop}>
                <label className={classes.label}>Last Name</label>
                <input
                  className={classes.formInput}
                  type="text"
                  placeholder="Enter lastname"
                ></input>
              </div>
              <div className={classes.formGrop}>
                <label className={classes.label}>Phone Number</label>
                <input
                  className={classes.formInput}
                  type="text"
                  placeholder="Enter phone number"
                ></input>
              </div>
              <div className={classes.formGrop}>
                <label className={classes.label}>Street</label>
                <input
                  className={classes.formInput}
                  type="text"
                  placeholder="Enter street"
                ></input>
              </div>
              <div className={classes.formGrop}>
                <label className={classes.label}>City</label>
                <input
                  className={classes.formInput}
                  type="text"
                  placeholder="Enter city"
                ></input>
              </div>
              <div className={classes.formGrop}>
                <label className={classes.label}>Postal Code</label>
                <input
                  className={classes.formInput}
                  type="text"
                  placeholder="Enter postal code"
                ></input>
              </div>
              <div className={classes.formGrop}>
                <label className={classes.label}>Country</label>
                <input
                  className={classes.formInput}
                  type="text"
                  placeholder="Enter country"
                ></input>
              </div>
            </form>
          </div>
          <div className={classes.btnContainer}>
            <SencondaryButton className={classes.btnS} type="submit">
              Update
            </SencondaryButton>
            <SencondaryButton className={classes.btnC} type="submit">
              Cancel
            </SencondaryButton>
          </div>
        </div>
      </div>
    </PageTransition>
  );
};

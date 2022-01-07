import React, { useState, useEffect } from "react";
import classes from "./userProfile.module.css";
import { PageTransition } from "../../helpers/animations";
import { SencondaryButton } from "../../components/secondaryButton/SencondaryButton";
import { UseInput } from "../../hook/UseInput";
import url from "../../helpers/endpoint";

import axios from "axios";

export const UserProfile = () => {
  const [update, setUpdate] = useState(false);
  const isNotEmpty = (value) => value.trim() !== "";
  const isEmail = (value) => value.includes("@");
  const isPassword = (value) => value.trim().length > 6;
  // const isPhoneNumber = (value) => value.length > 10;

  const [userInputs, setInputs] = useState({
    userName: '',
    userFirstName: '',
    userLastName: '',
    phone: '',
    addressLine1: '',
    city: '',
    postalCode: '',
    country: '',
  });


  useEffect(() => {
    axios.get(`${url}/users/user-info`, { withCredentials: true })
    .then(data => {
      const dataArray = data.data[0];
      setInputs({
        userName: dataArray.userName,
        userFirstName: dataArray.userFirstName,
        userLastName: dataArray.userLastName,
        phone: dataArray.phone,
        addressLine1: dataArray.addressLine1,
        city: dataArray.city,
        postalCode: dataArray.postalCode,
        country: dataArray.country,
      });
    })
    .catch(err => console.log(err))
  }, []);

  const changeValue = (e) => {
    setInputs({...userInputs, [e.target.name]: e.target.value})
  }

  const addressUpdateHandler = () => {
    axios.put(`${url}/users`, userInputs, { withCredentials: true })
    .then((() => window.location.reload()))
    .catch(err => console.log(err));
  };

  const userCancelHandler = () => {
    //for user cancel
    resetUsernameInput();
    resetEmailInput();
    resetPasswordInput();
    resetConfirmInput();
  };

  const addressCancelHandler = () => {
    //for address cancel
    resetfirstNameInput();
    resetLastNameInput();
    resetphoneNumberInput();
    resetstreetInput();
    resetcityInput();
    resetpostInput();
    resetcountryInput();
  };

  const {
    value: enteredUsername,
    isValid: enteredUsernameIsValid,
    hasError: usernameHasError,
    valueChangeHandler: usernameChangeHandler,
    inputBlurHandler: usernameBlurHandler,
    reset: resetUsernameInput,
  } = UseInput(isNotEmpty);

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
    enteredUsernameIsValid &&
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


  return (
    <PageTransition>
      <div className="container">
        <div className={classes.topContainer}>
          <div className={classes.heading}>User Profile</div>
        </div>

        <div className={classes.formContainer}>
          <div className={classes.form}>
            <form onSubmit={addressSubmitHandler}>
            <div
                className={`${classes.formGroup} ${
                  usernameHasError === true ? classes.invalid : ""
                }`}
              >
                <label htmlFor="username">User Name</label>
                <input
                  type="text"
                  id="username"
                  name='userName'
                  value={userInputs.userName}
                  onChange={changeValue}
                  onBlur={usernameBlurHandler}
                  placeholder="Enter new username"
                />
                {usernameHasError && (
                  <p className={classes.error}>Please enter your username</p>
                )}
              </div>

              <div
                className={`${classes.formGroup} ${
                  firstNameHasError === true ? classes.invalid : ""
                }`}
              >
                <label htmlFor="firstname">First Name</label>
                <input
                  type="text"
                  id="firstname"
                  name='userFirstName'
                  value={userInputs.userFirstName}
                  onChange={changeValue}
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
                  value={userInputs.userLastName}
                  name='userLastName'
                  onChange={changeValue}
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
                  value={userInputs.phone}
                  name='phone'
                  onChange={changeValue}
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
                  name='addressLine1'
                  value={userInputs.addressLine1}
                  onChange={changeValue}
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
                  name='city'
                  value={userInputs.city}
                  onChange={changeValue}
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
                  name='postalCode'
                  id="postcode"
                  value={userInputs.postalCode}
                  onChange={changeValue}
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
                  name='country'
                  value={userInputs.country}
                  onChange={changeValue}
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
              onClick={addressUpdateHandler}
            >
              Update
            </SencondaryButton>
          </div>
        </div>
      </div>
    </PageTransition>
  );
};

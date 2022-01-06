import React, { useState } from "react";
import classes from "./contact.module.css";
import { PageTransition } from "../../helpers/animations";
import { MdLocalPhone, MdEmail, MdPlace } from "react-icons/md";
import { SencondaryButton } from "../../components/secondaryButton/SencondaryButton";
import { UseInput } from "../../hook/UseInput";

export const Contact = () => {
  const sendHandler = () => {
    //Send message button function can be here
    console.log("clicked");
  };

  const {
    value: enteredName,
    isValid: nameIsValid,
    hasError: nameHasError,
    valueChangeHandler: nameChangeHandler,
    inputBlurHandler: nameBlurHandler,
    reset: restName,
  } = UseInput((value) => value.trim() !== "");

  const {
    value: enteredEmail,
    isValid: emailIsValid,
    hasError: emailHasError,
    valueChangeHandler: emailChangeHandler,
    inputBlurHandler: emailBlurHandler,
    reset: restEmail,
  } = UseInput((value) => value.includes("@"));

  const {
    value: enteredMessage,
    isValid: messageIsValid,
    hasError: messageHasError,
    valueChangeHandler: messageChangeHandler,
    inputBlurHandler: messageBlurHandler,
    reset: restMessage,
  } = UseInput((value) => value.trim() !== "");

  let formIsValid = false;
  if (nameIsValid && emailIsValid && messageIsValid) {
    formIsValid = true;
  }

  const formSubmissionHandler = (event) => {
    event.preventDefault();
    sendHandler();
    if (!formIsValid) {
      return;
    }
    restName();
    restEmail();
    restMessage();
  };

  return (
    <PageTransition>
      <div className="container">
        <div className={classes.topContainer}>
          <div className={classes.heading}>Contact Us</div>
          <p className={classes.subHeading}>Get In Touch</p>
        </div>
        <div className={classes.contactContainer}>
          <div className={classes.leftContainer}>
            <div className={classes.contactTel}>
              <div className={classes.icon}>
                <MdLocalPhone />
              </div>
              <div className={classes.p}>0488 xx xx xx</div>
            </div>
            <div className={classes.contactEmail}>
              <div className={classes.icon}>
                <MdEmail />
              </div>
              <div className={classes.p}>geekybay@gmail.com</div>
            </div>
            <div className={classes.contactAdr}>
              <div className={classes.icon}>
                <MdPlace />
              </div>
              <div className={classes.p}>Koningin Astridplein, Antwerpen</div>
            </div>
          </div>
          <div className={classes.rightContainer}>
            <div className={classes.form}>
              <form onSubmit={formSubmissionHandler}>
                <div
                  className={`${classes.formGroup} ${
                    nameHasError === true ? classes.invalid : ""
                  }`}
                >
                  <label htmlFor="name">Your Name</label>
                  <input
                    type="text"
                    id="name"
                    value={enteredName}
                    onChange={nameChangeHandler}
                    onBlur={nameBlurHandler}
                    placeholder="Name"
                  />
                  {nameHasError && (
                    <p className={classes.error}>Please enter your name</p>
                  )}
                </div>
                <div
                  className={`${classes.formGroup} ${
                    emailHasError === true ? classes.invalid : ""
                  }`}
                >
                  <label htmlFor="email">Your Email</label>
                  <input
                    type="email"
                    id="email"
                    value={enteredEmail}
                    onChange={emailChangeHandler}
                    onBlur={emailBlurHandler}
                    placeholder="Email"
                  />
                  {emailHasError && (
                    <p className={classes.error}>Please enter your email</p>
                  )}
                </div>
                <div
                  className={`${classes.formGroup} ${
                    messageHasError === true ? classes.invalid : ""
                  }`}
                >
                  <label htmlFor="message">Your Message</label>
                  <textarea
                    type="text"
                    id="message"
                    value={enteredMessage}
                    onChange={messageChangeHandler}
                    onBlur={messageBlurHandler}
                    placeholder="Leave your message here."
                  />
                  {messageHasError && (
                    <p className={classes.error}>No messages found</p>
                  )}
                </div>
              </form>
            </div>
            <SencondaryButton
              className={classes.btn}
              type="submit"
              onClick={sendHandler}
            >
              Send Message
            </SencondaryButton>
          </div>
        </div>
        <div className={classes.mapContainer}>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2499.099429743485!2d4.418957051515651!3d51.217243979488416!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47c3f703e7404c69%3A0x270b07bbe1f68aa6!2sAntwerpen-Centraal!5e0!3m2!1sen!2sbe!4v1640360687788!5m2!1sen!2sbe"
            title="googleMap"
            width="100%"
            height="350"
            style={{ border: "0" }}
            allowfullscreen=""
            loading="lazy"
          ></iframe>
        </div>
      </div>
    </PageTransition>
  );
};

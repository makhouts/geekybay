import React from "react";
import classes from "./contact.module.css";
import { PageTransition } from "../../helpers/animations";
import { MdLocalPhone, MdEmail, MdPlace } from "react-icons/md";
import { SencondaryButton } from "../../components/secondaryButton/SencondaryButton";

export const Contact = () => {
  return (
    <PageTransition>
      <div className="container">
        <div className={classes.topContainer}>
          <h2 className={classes.heading}>Contact Us</h2>
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
              <div className={classes.p}>Turnhoutsebaan</div>
            </div>
          </div>
          <div className={classes.rightContainer}>
            <div className={classes.contactForm}>
              <div className={classes.formGroup}>
                <label className={classes.label}>Your Name</label>
                <input
                  className={classes.formInput}
                  type="text"
                  placeholder="Name"
                ></input>
              </div>
              <div className={classes.formGroup}>
                <label className={classes.label}>Your Email</label>
                <input
                  className={classes.formInput}
                  type="email"
                  placeholder="Email"
                ></input>
              </div>
              <div className={classes.formGroup}>
                <label className={classes.label}>Your Message</label>
                <textarea
                  className={classes.textarea}
                  type="text"
                  placeholder="Leave your message here."
                ></textarea>
              </div>
              <SencondaryButton className={classes.btn} type="submit">
                Send
              </SencondaryButton>
            </div>
          </div>
        </div>
      </div>
    </PageTransition>
  );
};

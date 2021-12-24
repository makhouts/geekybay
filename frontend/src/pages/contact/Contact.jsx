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
              <div className={classes.p}>Koningin Astridplein, Antwerpen</div>
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
            </div>
            <SencondaryButton className={classes.btn} type="submit">
              Send Message
            </SencondaryButton>
          </div>
        </div>
        <div className={classes.mapContainer}>
          <div className={classes.mapCard}>
            <h3 className={classes.mapHeading}>Here is me</h3>
            <p className={classes.mapText}>
              Koningin Astridplein 27, 2018 Antwerpen
            </p>
            <a
              className={classes.mapLink}
              href="https://www.google.com/maps/place/Antwerpen-Centraal/@51.217244,4.4189571,17z/data=!3m1!4b1!4m5!3m4!1s0x47c3f703e7404c69:0x270b07bbe1f68aa6!8m2!3d51.217244!4d4.4211511"
              target="_blank"
            >
              Open in Google Map
            </a>
          </div>
        </div>
      </div>
    </PageTransition>
  );
};

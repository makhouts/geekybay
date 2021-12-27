import React from "react";
import classes from "./shippingAddress.module.css";
import { PageTransition } from "../../helpers/animations";
import { SencondaryButton } from "../../components/secondaryButton/SencondaryButton";

export const ShippingAddress = () => {
  return (
    <PageTransition>
      <div className="container">
        <div className={classes.addressContainer}>
          <div className={classes.topContainer}>
            <div className={classes.heading}>Shipping Addresss</div>
          </div>
          <div className={classes.addressForm}>
            <div className={classes.formGrop}>
              <label className={classes.label}>First Name</label>
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
                placeholder="Street"
              ></input>
            </div>
            <div className={classes.formGrop}>
              <label className={classes.label}>Street Number</label>
              <input
                className={classes.formInput}
                type="text"
                placeholder="Enter street number"
              ></input>
            </div>
            <div className={classes.formGrop}>
              <label className={classes.label}>City</label>
              <input
                className={classes.formInput}
                type="text"
                placeholder="City"
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
          </div>
          <div className={classes.btnContainer}>
            <SencondaryButton className={classes.btnS} type="submit">
              Save
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

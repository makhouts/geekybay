import React, { useState } from 'react';
import classes from './multiStepForm.module.css';

export const GuestForm = (props) => {


    const handleChange = evt => {
          const value = evt.target.value;
          props.setInputs({
            ...props.inputs,
            [evt.target.name]: value
         });
        }

    return (
      <div className={classes.guestForm}>
        <div className="div">
          <input
            type="text"
            placeholder="First Name"
            name="fName"
            value={props.inputs.fName}
            onChange={handleChange}
          />
          <input
            type="text"
            placeholder="Last Name"
            name="lName"
            value={props.inputs.lName}
            onChange={handleChange}
          />
        </div>
        <div className={classes.email}>
          <input
            type="text"
            placeholder="Email"
            name="email"
            value={props.inputs.email}
            onChange={handleChange}
          />
        </div>

        <input
          type="text"
          placeholder="Country"
          name="country"
          value={props.inputs.country}
          onChange={handleChange}
        />
        <input
          type="text"
          placeholder="Street address"
          name="street"
          value={props.inputs.street}
          onChange={handleChange}
        />
        <div className="">
          <input
            type="text"
            placeholder="City"
            name="city"
            value={props.inputs.city}
            onChange={handleChange}
          />
          <input
            type="text"
            placeholder="Postcode"
            name="postcode"
            value={props.inputs.postcode}
            onChange={handleChange}
          />
        </div>
      </div>
    );
}

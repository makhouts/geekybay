import React from 'react';
import classes from './primaryButton.module.css';

export const PrimaryButton = (props) => {
    return (
      <button
        className={
          props.btnStyle === "red"
            ? classes.primaryButtonRed
            : classes.primaryButton
        }
        onClick={props.clicked}
      >
        {props.children}
      </button>
    );
}

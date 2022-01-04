import React from "react";
import classes from "./secondaryButton.module.css";

export const SencondaryButton = (props) => {
  return (
    <button
      className={`${classes.button} ${props.className}`}
      onClick={props.onClick}
      disabled={props.disabled}
    >
      {props.children}
    </button>
  );
};

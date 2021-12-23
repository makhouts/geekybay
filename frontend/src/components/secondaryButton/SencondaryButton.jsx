import React from "react";
import "./secondaryButton.module.css";

export const SencondaryButton = (props) => {
  return (
    <div>
      <button>{props.children}</button>
    </div>
  );
};

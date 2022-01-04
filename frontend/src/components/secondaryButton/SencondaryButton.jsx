import React from "react";
import "./secondaryButton.module.css";

export const SencondaryButton = (props) => {
  return (
    <div>
      <button onClick={props.clicked}>{props.children}</button>
    </div>
  );
};

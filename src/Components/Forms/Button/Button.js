import React from "react";
import "./button.css";

function Button({ title = "" }) {
  return (
    <div className="button_container">
      <button className="button">{title}</button>
    </div>
  );
}

export default Button;

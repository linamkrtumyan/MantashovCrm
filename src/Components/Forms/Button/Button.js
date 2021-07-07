import React from "react";
import "./button.css";

function Button({ title = "", className = "" }) {
  return (
    <div className="button_container">
      <button className={`button ${className} `}>{title}</button>
    </div>
  );
}

export default Button;

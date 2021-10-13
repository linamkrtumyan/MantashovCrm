import React from "react";
import "./button.css";

function Button({ type = "", title = "", disabled = false, className = "" }) {
  return (
    <div className="button_container">
      <button
        type={type}
        disabled={disabled}
        className={`button  ${className} `}
      >
        {title}
      </button>
    </div>
  );
}

export default Button;

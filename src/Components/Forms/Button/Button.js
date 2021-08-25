import React from "react";
import "./button.css";

function Button({ type = "", title = "", className = "" }) {
  return (
    <div className="button_container">
      <button type={type} className={`button  is-primary ${className} `}>
        {title}
      </button>
    </div>
  );
}

export default Button;

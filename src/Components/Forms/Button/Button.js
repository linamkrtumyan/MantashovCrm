import React from "react";
import "./button.css";

function Button({
  onClick = () => {},
  onFocus,
  type = "",
  title = "",
  disabled = false,
  className = "",
}) {
  return (
    <div className="button_container">
      <button
        onFocus={onFocus}
        onClick={onClick}
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

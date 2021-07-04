import React from "react";
import "./input.css";

function Input({ placeholder = "", type = "text", defaultValue="", className="" }) {
  return (
    <div className="input_container" >
      <input
      defaultValue={defaultValue}
        className={`input_component ${className}` }
        placeholder={placeholder}
        type={type}
        required
      />
    </div>
  );
}

export default Input;

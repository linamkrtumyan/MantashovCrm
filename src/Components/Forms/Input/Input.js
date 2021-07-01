import React from "react";
import "./input.css";

function Input({ placeholder = "", type = "text" }) {
  return (
    <div className="input_container">
      <input
        className="input_component"
        placeholder={placeholder}
        type={type}
        required
      />
    </div>
  );
}

export default Input;

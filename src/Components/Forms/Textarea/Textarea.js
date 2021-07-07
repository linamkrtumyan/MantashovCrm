import React from "react";
import "./textarea.css";

function Textarea({
  placeholder = "",
  type = "text",
  defaultValue = "",
  className = "",
}) {
  return (
    <div className="textarea_container">
      <textarea
        defaultValue={defaultValue}
        className={`textarea_component ${className}`}
        placeholder={placeholder}
        type={type}
        required
      />
    </div>
  );
}

export default Textarea;

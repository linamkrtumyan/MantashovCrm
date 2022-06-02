import React from "react";
import "./textarea.css";
import { formOnChange } from "../../../store";
import { connect } from "react-redux";

function Textarea({
  id,
  placeholder = "",
  type = "text",
  defaultValue = "",
  className = "",
  textareaSize = "",
  value = "",
  formOnChange,
  placeholderText = null,
  required = true,
}) {
  const handleOnChange = (e) => {
    formOnChange(id, e.target.value);
  };
  const auto_grow = (element) => {
    element.target.style.height = "40px";
    element.target.style.height = element.target.scrollHeight + "px";
  };
  return (
    <div className={`input_container ${className}`}>
      {/* <div className={`input_container ${className}`}> */}
      <label htmlFor={id}>{placeholder}</label>

      <textarea
        id={id}
        onChange={handleOnChange}
        // defaultValue={defaultValue}

        className={`textarea  ${className}`}
        // className={`textarea ${textareaSize}`}
        placeholder={placeholderText}
        // placeholder={placeholder}
        onInput={(e) => auto_grow(e)}
        type={type}
        value={value ?? ""}
        required={required}
      />
    </div>
  );
}
const mapStateToProps = (state, ownProps) => {
  return {
    value: state.formReducer[ownProps.id],
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    formOnChange: (key, value) => dispatch(formOnChange(key, value)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Textarea);

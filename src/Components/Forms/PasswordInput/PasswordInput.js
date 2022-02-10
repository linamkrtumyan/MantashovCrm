import React, { useEffect, useRef } from "react";
import { formOnChange } from "../../../store";
import { connect } from "react-redux";

import "./passwordInput.css";

function PasswordInput({
  id,
  max,
  placeholder = "",
  defaultValue = "",
  className = "",
  value = "",
  formOnChange,
  placeholderText = null,
  dataDateFormat = "",
  readOnly = false,
  required = true,
}) {
  const inputRef = useRef();

  useEffect(() => {
    if (!value) {
      inputRef.current.value = "";
    }
  }, [value]);
  const handleOnChange = (e) => {
    formOnChange(id, e.target.value);
  };
  const onFocus = (event) => {
    // if (event.target.autocomplete) {
    event.target.autocomplete = "whatever";
    // }
  };

  return (
    <div className={`input_container ${className}`}>
      <label htmlFor={id}>{placeholder}</label>
      <input
        ref={inputRef}
        // autoComplete="new-password"
        // autoComplete={"" + Math.random()}
        readOnly={readOnly}
        autoComplete="off"
        id={id}
        // defaultValue={defaultValue}
        data-date-format={dataDateFormat}
        max={max}
        onChange={handleOnChange}
        className={`input input_width ${className}`}
        // className={`input `}
        placeholder={placeholderText}
        // placeholder={placeholder}
        type="password"
        onFocus={(e) => onFocus(e)}
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
export default connect(mapStateToProps, mapDispatchToProps)(PasswordInput);

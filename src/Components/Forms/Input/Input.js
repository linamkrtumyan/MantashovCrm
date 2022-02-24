import React from "react";
import { formOnChange } from "../../../store";
import { connect } from "react-redux";

import "./input.css";

function Input({
  id,
  max,
  placeholder = "",
  type = "text",
  defaultValue = "",
  className = "",
  value = "",
  formOnChange,
  placeholderText = null,
  dataDateFormat = "",
  readOnly = false,
  required = true,
  labelIcon = "",
  min,
}) {
  if (type === "date") {
    if (value !== null && value !== "") {
      value = value.split("T")[0];
    }
  }

  if (type === "datetime-local") {
    if (value === null || value === "") {
      formOnChange(id, defaultValue);
    }
  }

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
      {labelIcon && labelIcon !== "" ? (
        <img
          src={labelIcon}
          alt=""
          // className="member_edit_image"
          style={{
            width: "20px",
            verticalAlign: "middle",
            padding: "2px",
          }}
        />
      ) : null}
      <label htmlFor={id}>{placeholder}</label>
      <input
        // autoComplete="new-password"
        // autoComplete={"" + Math.random()}
        readOnly={readOnly}
        autoComplete="off"
        id={id}
        // defaultValue={defaultValue}
        data-date-format={dataDateFormat}
        max={max}
        min={min}
        onChange={handleOnChange}
        className={`input input_width ${className}`}
        // className={`input `}
        placeholder={placeholderText}
        // placeholder={placeholder}
        type={type}
        value={value}
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
export default connect(mapStateToProps, mapDispatchToProps)(Input);

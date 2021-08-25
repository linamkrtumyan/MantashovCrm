import React from "react";
import { formOnChange } from "../../../store";
import { connect } from "react-redux";

import "./input.css";

function Input({
  id,
  placeholder = "",
  type = "text",
  defaultValue = "",
  className = "",
  value = "",
  formOnChange,
}) {
  // console.log(value, "value");
  const handleOnChange = (e) => {
    formOnChange(id, e.target.value);
  };
  return (
    <div className="input_container">
      <label htmlFor={id}>{placeholder}</label>
      <input
        id={id}
        // defaultValue={defaultValue}
        onChange={handleOnChange}
        className={`input input_width ${className}`}
        // placeholder={placeholder}
        type={type}
        value={value}
        // onfocus={}
        required={true}
      />
    </div>
  );
}

const mapStateToProps = (state, ownProps) => {
  // console.log(state, "state");
  // console.log(ownProps, "ownProps");
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

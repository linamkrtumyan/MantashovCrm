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
  const handleOnChange = (e) => {
    formOnChange(id, e.target.value);
  };
  return (
    <div className="input_container">
      <input
        id={id}
        // defaultValue={defaultValue}
        onChange={handleOnChange}
        className={`input_component ${className}`}
        placeholder={placeholder}
        type={type}
        value={value}
        // onfocus={}
        required
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

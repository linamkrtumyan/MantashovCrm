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
  value = "",
  formOnChange,
  placeholderText = null,
}) {
  const handleOnChange = (e) => {
    formOnChange(id, e.target.value);
  };
  return (
    <div className="input_container">
      <label htmlFor={id}>{placeholder}</label>

      <textarea
        id={id}
        onChange={handleOnChange}
        // defaultValue={defaultValue}
        className={`textarea  ${className}`}
        placeholder={placeholderText}
        type={type}
        value={value}
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

export default connect(mapStateToProps, mapDispatchToProps)(Textarea);

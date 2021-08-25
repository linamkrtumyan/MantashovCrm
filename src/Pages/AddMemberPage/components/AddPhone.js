import React, { useEffect, useState } from "react";
import { cleanForm, formOnChangeArray } from "../../../store";
import { connect } from "react-redux";
import "./addPhone.css";

function AddPhone({ contactType, formOnChange, value, cleanForm }) {
  console.log(contactType, "contactType");
  useEffect(() => {
    formOnChange("contacts", contactType.id, []);
    // return () => {
    // cleanForm();
    // };
  }, []);
  const [inputik, setInputik] = useState("");
  return (
    <div className="input_container">
      <label>{contactType.name}</label>
      <div style={{ display: "flex" }}>
        <input
          // placeholder={`${contactType.name} `}
          className="input"
          onChange={(e) => {
            setInputik(e.target.value);
            formOnChange("contacts", contactType.id - 1, [e.target.value]);
            // cleanForm();
          }}
        />
      </div>
    </div>
  );
}

const mapStateToProps = (state, ownProps) => {
  return {
    value: !state.formReducer.contacts
      ? []
      : state.formReducer?.contacts[ownProps.contactType.id - 1],
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    formOnChange: (firstKey, secondKey, value) =>
      dispatch(formOnChangeArray(firstKey, secondKey, value)),
    cleanForm: () => dispatch(cleanForm()),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(AddPhone);

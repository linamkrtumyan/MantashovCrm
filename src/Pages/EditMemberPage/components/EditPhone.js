import React, { useState } from "react";
import { formOnChangeArray } from "../../../store";
import { connect } from "react-redux";
import AddEditNumber from "./AddEditNumber";
import AddNewNumber from "./AddNewNumber";

function EditPhone({ contactType, value, contacts, formOnChange }) {
  return (
    <div className="input_container">
      <div>
        <div className="">
          <label>{contactType.name}</label>
          <div style={{ display: "flex" }}>
            <input
              className="input"
              value={value ? value.value : ""}
              onChange={(e) => {
                formOnChange("contacts", contactType.id - 1, {
                  id: contactType.id,
                  value: e.target.value,
                });
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = (state, ownProps) => {
  return {
    value:
      state.formReducer.contacts === null || !state.formReducer.contacts
        ? []
        : state.formReducer.contacts[ownProps.contactType.id - 1],

    contacts: state.formReducer.contacts,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    formOnChange: (firstKey, secondKey, value) =>
      dispatch(formOnChangeArray(firstKey, secondKey, value)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(EditPhone);

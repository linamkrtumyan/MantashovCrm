import React, { useEffect, useState } from "react";
import { cleanForm, formOnChange, formOnChangeArray } from "../../../store";
import { connect } from "react-redux";
import "./addPhone.css";

function AddPhone({ contactType, formOnChange, value, cleanForm }) {
  // console.log(value, "value");
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
            // cleanForm();
          }}
        />

        <div
          style={{ alignSelf: "center" }}
          onClick={() => {
            formOnChange("contacts", contactType.id, [...value, inputik]);
          }}
        >
          <i class="fas fa-check is-middle m-1"></i>
        </div>
      </div>
      {value?.map((val) => (
        <p key={val}>{val}</p>
      ))}
    </div>
  );
}

const mapStateToProps = (state, ownProps) => {
  console.log(ownProps, "ownProps");
  return {
    value:
      state.formReducer.contacts === undefined
        ? []
        : state.formReducer.contacts[ownProps.contactType.id],
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

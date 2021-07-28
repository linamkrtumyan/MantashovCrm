import React, { useEffect, useState } from "react";
import { cleanForm, formOnChange, formOnChangeArray } from "../../../store";
import { connect } from "react-redux";
import "./addPhone.css";

function AddPhone({ contactType, formOnChange, value, cleanForm }) {
  console.log(value, "value");
  useEffect(() => {
    formOnChange("contacts", contactType.id, []);
    // return () => {
    // cleanForm();
    // };
  }, []);
  const [inputik, setInputik] = useState("");
  return (
    <div className="input_container">
      <div style={{ display: "flex" }}>
        <input
          placeholder={`${contactType.name} `}
          className="input_component"
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
          <svg viewBox="-5 -11 50 50" className="plus">
            <polyline
              points="0.4,15.3 12.4,27.3 39.3,0.4 "
              stroke="#343333"
              fill="transparent"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>
      {value?.map((val) => (
        <p key={val}>{val}</p>
      ))}
    </div>
  );
}

const mapStateToProps = (state, ownProps) => {
  console.log(state, "state ************************");
  // console.log(ownProps, "ownProps");
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

import React, { useEffect, useState } from "react";
import { cleanForm, formOnChangeArray } from "../../../store";
import { connect } from "react-redux";
import "./addPhone.css";

function AddPhone({ contactType, formOnChange, value, cleanForm, phone }) {
  // const [phone, setPhone] = useState("")
  useEffect(() => {
    formOnChange("contacts", contactType.id, []);
    // return () => {
    // cleanForm();
    // };
  }, []);
  const [inputik, setInputik] = useState("");
  return (
    <div className="input_container">
      <img
        src={`/images/phoneTypes/messengers/${contactType.name}.png`}
        alt=""
        // className="member_edit_image"
        style={{ width: "20px", verticalAlign: "middle", padding: "2px" }}
      />
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
    phone: state.formReducer.phone,
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

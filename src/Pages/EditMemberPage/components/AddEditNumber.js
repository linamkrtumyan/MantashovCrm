import React, { useEffect, useState } from "react";
import { formOnChangeArray } from "../../../store";
import { connect } from "react-redux";

function AddEditNumber({
  set,
  contactType,
  formOnChange,
  value,
  contacts,
  index,
}) {
  const [inputik, setInputik] = useState(value[index]);

  useEffect(() => {
    setInputik(value[index]);
  }, [value]);

  const deleteNumber = (contactType, index) => {
    let c = contacts[contactType];
    c.splice(index, 1);
  };

  return (
    <div className="input_container">
      <div style={{ display: "flex" }}>
        <input
          value={inputik}
          placeholder={`${contactType.name} `}
          className="input_component"
          onChange={(e) => {
            setInputik(e.target.value);
          }}
        />

        <div
          style={{ alignSelf: "center" }}
          onClick={() => {
            deleteNumber(contactType.id, index);
            formOnChange("contacts", contactType.id, [...value, inputik]);
            set(false);
          }}
        >
          <svg viewBox="-5 -11 50 50" className="add_number_action_icon">
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
    </div>
  );
}

const mapStateToProps = (state, ownProps) => {
  return {
    value:
      state.formReducer.contacts === undefined
        ? []
        : state.formReducer.contacts[ownProps.contactType.id],

    contacts: state.formReducer.contacts,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    formOnChange: (firstKey, secondKey, value) =>
      dispatch(formOnChangeArray(firstKey, secondKey, value)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(AddEditNumber);

import React, { useState } from "react";
import { formOnChangeArray } from "../../../store";
import { connect } from "react-redux";
import AddEditNumber from "./AddEditNumber";
import AddNewNumber from "./AddNewNumber";

function EditPhone({ contactType, value, contacts }) {
  const [deleted, setDeleted] = useState(false);
  const [edit, setEdit] = useState(false);
  const [add, setAdd] = useState(false);
  const [index, setIndex] = useState(null);

  const deleteNumber = (contactType, num, index) => {
    let c = contacts[contactType];
    c.splice(index, 1);
    console.log(contacts, "new contacts");
    setDeleted(!deleted);
  };

  const editNumber = (index) => {
    setEdit(true);
    setIndex(index);
  };
  const addNumber = () => {
    setAdd(true);
  };

  return (
    <div className="input_container">
      <div style={{ display: "flex" }}>
        <div>
          <div className="number_type_container">
            {contactType.name}
            <div onClick={() => addNumber()}>
              <svg viewBox="0 0 24 24" class="add_number">
                <path
                  d="M 12 2 L 12 22 M 2 12 L 22 12"
                  stroke="#343333"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                />
              </svg>
            </div>
          </div>

          {value?.map((num, index) => (
            <div>
              <div className="number_actions_container">
                {" "}
                <div>{num}</div>
                <div style={{ display: "flex" }}>
                  <div onClick={() => deleteNumber(contactType.id, num, index)}>
                    <svg viewBox="0 0 24 24" class="delete_phone">
                      <path
                        d="M 2 2 L 22 22 M 2 22 L22 2"
                        stroke="#343333"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                      />
                    </svg>
                  </div>
                  <div onClick={() => editNumber(index)}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="15"
                      height="15"
                      stroke="#343333"
                      fill="currentColor"
                      className="bi bi-pen edit_phone"
                      viewBox="0 0 16 16"
                    >
                      <path d="m13.498.795.149-.149a1.207 1.207 0 1 1 1.707 1.708l-.149.148a1.5 1.5 0 0 1-.059 2.059L4.854 14.854a.5.5 0 0 1-.233.131l-4 1a.5.5 0 0 1-.606-.606l1-4a.5.5 0 0 1 .131-.232l9.642-9.642a.5.5 0 0 0-.642.056L6.854 4.854a.5.5 0 1 1-.708-.708L9.44.854A1.5 1.5 0 0 1 11.5.796a1.5 1.5 0 0 1 1.998-.001zm-.644.766a.5.5 0 0 0-.707 0L1.95 11.756l-.764 3.057 3.057-.764L14.44 3.854a.5.5 0 0 0 0-.708l-1.585-1.585z" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {edit ? (
        <AddEditNumber set={setEdit} contactType={contactType} index={index} />
      ) : null}
      {add ? (
        <AddNewNumber set={setAdd} contactType={contactType} index={index} />
      ) : null}
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
export default connect(mapStateToProps, mapDispatchToProps)(EditPhone);

import React, { useState } from "react";
import { connect } from "react-redux";
import { formOnChange } from "../../../store";
import "./select.css";

const Select = ({
  id = "",
  formOnChange,
  placeholder,
  name,
  type = "text",
  items = [],
}) => {
  const [show, setShow] = useState(false);
  const [value, setValue] = useState("");

  const handleSelect = (item) => {
    console.log(item, "item");
    console.log(id, "id");
    formOnChange(id, item.id);
    setValue(item.name);
    setShow(false);
  };
  //   console.log(formOnChange);
  return (
    <div className="select_container">
      <input
        readOnly
        autoComplete="off"
        //   id={id}
        className="input_component"
        onFocus={() => {
          setShow(true);
        }}
        value={value}
        type={type}
        placeholder={placeholder}
      />
      {show && (
        <ul className="select">
          {items.map((item) => (
            <li
              id={item.id}
              onClick={() => {
                handleSelect(item);
              }}
              key={item.id}
            >
              {item.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

const mapStateToProps = (state, ownProps) => {
  // console.log(state, "state");
  // console.log(ownProps, "ownProps");
  return {
    // value: state.formReducer[ownProps.id],
  };
};
const mapDispatchToProps = (dispatch) => {
  //   console.log(dispatch);
  return {
    formOnChange: (key, value) => dispatch(formOnChange(key, value)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Select);

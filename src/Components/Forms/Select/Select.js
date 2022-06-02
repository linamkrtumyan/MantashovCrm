import React, { useRef, useState, useEffect } from "react";
import { connect } from "react-redux";
import { formOnChange } from "../../../store";
import "./select.css";
import { useOutsideClick } from "../../../Hooks/useOutsideClick";

const Select = ({
  id = "",
  formOnChange,
  placeholder,
  name,
  value,
  type = "text",
  items = [],
  className = "",
  placeholderText = null,
  defaultValue = "",
}) => {
  const ref = useRef();
  const ul = useRef();

  const [show, setShow] = useState(false);
  // const [value, setValue] = useState("");
  const [text, setText] = useState("");

  useEffect(() => {
    if (items.length > 0) {
      let item = items.find((i) => i.id === parseInt(value));
      // setCurrent(item === undefined ? { id: 0, name: "" } : item);
      // formOnChange(id, value);
      setText(item ? item.name : "");
    }

    if (!value) {
      setText(defaultValue);
    }
  }, [items, value, defaultValue]);

  // const handleSelect = (item) => {
  //   formOnChange(id, item.id);
  //   // setValue(item.name);
  //   setText(item.name);
  //   setShow(false);
  // };

  const handleSelect = () => {
    setShow(false);
    // setText(current.name);

    // handleFormChange(id, current.id);
  };

  const handleClick = (item) => {
    formOnChange(id, item.id);
    // setCurrent(item);
    setText(item.name);
    setTimeout(() => setShow(false), 0);
  };

  useOutsideClick(ref, handleSelect);

  return (
    <div ref={ref} className="input_container control has-icons-right">
      <label htmlFor={id}>{placeholder}</label>

      <input
        readOnly
        autoComplete="off"
        id={id}
        // className="input_component"
        className="input "
        onFocus={() => {
          setShow(true);
        }}
        onChange={() => {}}
        value={text}
        type={type}
        required={true}
        placeholder={placeholderText}
        // placeholder={placeholder}
      />
      <span style={{ marginTop: "25px" }} className="icon is-small is-right">
        <i className="fas fa-angle-down"></i>
      </span>
      {show && (
        <ul className={`select_items  ${className} `}>
          {items.map((item) => (
            <li
              id={item.id}
              onClick={() => {
                handleClick(item);
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
  return {
    value: state.formReducer[ownProps.id],
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    formOnChange: (key, value) => dispatch(formOnChange(key, value)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Select);

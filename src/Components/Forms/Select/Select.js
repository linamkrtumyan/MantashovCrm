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
}) => {
  const ref = useRef();
  const ul = useRef();

  const [show, setShow] = useState(false);
  // const [value, setValue] = useState("");
  const [text, setText] = useState("");
  // console.log(value, "value");
  // console.log(items, "items");
  useEffect(() => {
    if (items.length > 0) {
      let item = items.find((i) => i.id === value);
      // console.log(item);

      // setCurrent(item === undefined ? { id: 0, name: "" } : item);
      // formOnChange(id, value);
      setText(item?.name);
    }
  }, [items, value]);

  // const handleSelect = (item) => {
  //   console.log(item, "item");
  //   console.log(id, "id");
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

  //   console.log(formOnChange);
  return (
    <div ref={ref} className="input_container">
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
        value={text}
        type={type}
        required={true}
        // placeholder={placeholder}
      />
      {show && (
        <ul className="select_items">
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
  // console.log(state, "state");
  // console.log(ownProps, "ownProps");
  return {
    value: state.formReducer[ownProps.id],
  };
};
const mapDispatchToProps = (dispatch) => {
  //   console.log(dispatch);
  return {
    formOnChange: (key, value) => dispatch(formOnChange(key, value)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Select);

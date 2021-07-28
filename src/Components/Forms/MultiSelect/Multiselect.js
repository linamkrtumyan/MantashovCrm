import React, { useRef, useState, useEffect } from "react";
import { connect } from "react-redux";
import { useOutsideClick } from "../../../Hooks/useOutsideClick";
import { formOnChange } from "../../../store";

function Multiselect({
  id,
  name,
  className = "",
  items,
  type = "text",
  errorMessage = "This field is required",
  placeholder = "",
  formOnChange,
  required = true,
  pattern = "[A-Za-z0-9]{2,30}",
  handleFormChange,
}) {
  const [text, setText] = useState("");
  const [show, setShow] = useState(false);
  const [selected, setSelected] = useState([]);
  const [selectedName, setSelectedName] = useState([]);
  const [result, setResult] = useState([]);

  const ref = useRef();
  const ul = useRef();

  const handleSelect = () => {
    setShow(false);
    // setSelected(...selected);
    // setText(selected.name);
    formOnChange(id, selected);
  };
  useEffect(() => {
    setResult(selectedName.map((a) => a.name));
  }, [selectedName]);

  const handleClick = (thing) => {
    if (!selected.some((s) => s.id == thing.id)) {
      setSelected([
        ...selected,
        {
          id: thing.id,
        },
      ]);
      setSelectedName([...selectedName, { name: thing.name }]);
    } else {
      setSelected(selected.filter((s) => thing.id !== s.id));
      setSelectedName(selectedName.filter((s) => thing.name !== s.name));
    }
  };

  useOutsideClick(ref, handleSelect);
  return (
    <div className="select_container" ref={ref}>
      <input
        readOnly
        autoComplete="off"
        id={id}
        className="input_component"
        onFocus={() => {
          setShow(true);
        }}
        required={required}
        // onChange={handleChange}
        value={text}
        type={type}
        placeholder={placeholder}
        value={result}
      />
      {show && (
        <ul style={{ zIndex: "100000" }} ref={ul} className="select">
          {items.map((item) => (
            <li id={item.id} key={item.id}>
              <div
                onClick={() => {
                  handleClick(item);
                }}
                className="mb-3 form-check"
              >
                <input
                  type="checkbox"
                  className="form-check-input"
                  id={item.id}
                  checked={selected.some((s) => s.id === item.id)}
                  readOnly
                />
                <label htmlFor={item.id}>{item.name}</label>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

const mapDispatchToProps = (dispatch) => {
  return {
    formOnChange: (key, value) => dispatch(formOnChange(key, value)),
  };
};

export default connect(null, mapDispatchToProps)(Multiselect);

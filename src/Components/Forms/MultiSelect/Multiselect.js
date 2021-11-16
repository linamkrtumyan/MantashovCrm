import React, { useRef, useState, useEffect } from "react";
import { connect } from "react-redux";
import { useOutsideClick } from "../../../Hooks/useOutsideClick";
import { formOnChange } from "../../../store";

function Multiselect({
  id,
  name,
  className = "form-group col-8",
  items,
  type = "text",
  errorMessage = "This field is required",
  placeholder,
  required = true,
  pattern = "[A-Za-z0-9]{2,30}",
  formOnChange,
  selectedNames = [],
  checkeds = [],
}) {
  const [text, setText] = useState("");
  const [show, setShow] = useState(false);
  // const [selected, setSelected] = useState([]);

  const ref = useRef();
  const ul = useRef();

  const setSelectedNames = (arr) => {
    formOnChange(id + "Names", arr);
  };

  useEffect(() => {
    if (items?.length > 0) {
      let item = Array.from(items.find((i) => i.id) === checkeds.map((c) => c));

      setText(item?.map((i) => i.name));
    }
    return () => {
      clear();
    };
  }, []);

  const clear = () => {
    formOnChange(id + "Names", []);
    formOnChange(id, []);
  };
  const handleSelect = () => {
    setShow(false);
  };

  const handleClick = (thing) => {
    if (!checkeds.some((s) => s === thing.id)) {
      // formOnChange(id, [
      //   ...checkeds,
      //   {
      //     id: thing.id,
      //   },
      // ]);
      checkeds.push(thing.id);
      formOnChange(id, [...checkeds]);
      setSelectedNames([...selectedNames, { name: thing.name }]);
    } else {
      formOnChange(
        id,
        checkeds.filter((s) => thing.id !== s)
      );
      setSelectedNames(selectedNames.filter((s) => thing.name !== s.name));
    }
  };
  useOutsideClick(ref, handleSelect);

  return (
    <div ref={ref} className="input_container">
      <label className="input-text-label" htmlFor={id}>
        {placeholder}
      </label>
      <input
        // onKeyDown={handleKeyDown}
        autoComplete="off"
        id={id}
        onChange={() => {}}
        // className="input_component"
        className="input "
        onFocus={() => {
          setShow(true);
        }}
        required={required}
        placeholder={placeholder}
        // error er value ={text}
        // defaultValue={text}
        value={
          selectedNames.length === 0
            ? ""
            : selectedNames.length <= 2
            ? `${selectedNames[0].name}, ${
                selectedNames[1] ? selectedNames[1].name : ""
              }`
            : `${selectedNames[0].name}, ${selectedNames[1].name} + ${
                selectedNames.length - 2
              }`
        }
        type={type}
        // value={result}
      />
      {show && (
        <ul style={{ zIndex: "100000" }} ref={ul} className="select_items">
          {items?.map((item) => (
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
                  onChange={() => {}}
                  //error er  checked={checkeds?.some((s) => s.id === item.id)}
                  checked={checkeds?.some((s) => s === item.id)}
                />
                <label className="form-check-label" htmlFor={item.id}>
                  {item.name}
                </label>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

const mapStateToProps = (state, ownProps) => {
  return {
    checkeds: state.formReducer[ownProps.id],
    selectedNames: state.formReducer[ownProps.id + "Names"],
  };
};

// const mapDispatchToProps = (dispatch) => {
//   return {
//     handleFormChange: (key, value) => dispatch(handleFormChange(key, value)),
//   };
// };
const mapDispatchToProps = (dispatch) => {
  return {
    formOnChange: (key, value) => dispatch(formOnChange(key, value)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Multiselect);

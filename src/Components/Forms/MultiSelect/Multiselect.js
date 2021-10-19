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
  checkeds = [],
}) {
  // console.log(checkeds, "checkeds");
  const [text, setText] = useState("");
  const [show, setShow] = useState(false);
  // const [selected, setSelected] = useState([]);
  const [selectedName, setSelectedName] = useState([]);
  const [result, setResult] = useState([]);

  const ref = useRef();
  const ul = useRef();

  // console.log(items, "items");

  useEffect(() => {
    if (items?.length > 0) {
      let item = Array.from(items.find((i) => i.id) === checkeds.map((c) => c));
      // console.log(item);

      setText(item?.map((i) => i.name));
    }
  }, []);

  const handleSelect = () => {
    setShow(false);
    formOnChange(id, checkeds);
  };
  useEffect(() => {
    setResult(selectedName.map((a) => a.name));
  }, [selectedName]);

  useEffect(() => {
    const filtered = items?.filter(
      (item) => !!checkeds?.some((s) => s === item.id)
    );
    setResult(
      filtered?.map((item) => {
        return item.name;
      })
    );
  }, []);

  const handleClick = (thing) => {
    if (!checkeds.some((s) => s === thing.id)) {
      // formOnChange(id, [
      //   ...checkeds,
      //   {
      //     id: thing.id,
      //   },
      // ]);

      formOnChange(id, [...checkeds, thing.id]);
      setSelectedName([...selectedName, { name: thing.name }]);
    } else {
      formOnChange(
        id,
        checkeds.filter((s) => thing.id !== s)
      );
      setSelectedName(selectedName.filter((s) => thing.name !== s.name));
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
        // className="input_component"
        className="input "
        onFocus={() => {
          setShow(true);
        }}
        required={required}
        // error er value ={text}
        // defaultValue={text}
        value={text}
        // placeholder={result}
        type={type}
        // placeholder={placeholder}
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

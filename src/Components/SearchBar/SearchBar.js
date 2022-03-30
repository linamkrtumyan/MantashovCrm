import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
// import { useHistory } from "react-router-dom";
import { formOnChange } from "../../store";
import "./SearchBar.css";

function SearchBar({ id, containerClass, searchValue, formOnChange }) {

  //   const history = useHistory();
  const [value, setValue] = useState("");
  const handleSearch = (e) => {
    e.preventDefault();
    formOnChange(`${id}`, value);
  };

  return (
    <form className={` ${containerClass}`} onSubmit={handleSearch}>
      <div
        className={`control has-icons-left has-icons-right searchbar-container`}
      >
        <input
          defaultValue={searchValue}
          className="input "
          type="text"
          placeholder="Search"
          onChange={(e) => setValue(e.target.value)}
        />
        <span className="icon is-left search-icon" onClick={handleSearch}>
          <i className="fas fa-search"></i>{" "}
        </span>
      </div>
    </form>
  );
}

const mapStateToProps = (state, ownProps) => {
  return {
    searchValue: state.formReducer[ownProps.id],
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    formOnChange: (key, value) => dispatch(formOnChange(key, value)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchBar);

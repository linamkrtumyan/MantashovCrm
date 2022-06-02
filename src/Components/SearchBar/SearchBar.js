import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
// import { useHistory } from "react-router-dom";
import { formOnChange } from "../../store";
import "./SearchBar.css";

function SearchBar({ id, containerClass, searchValue, formOnChange, url }) {
  const history = useHistory();
  const { currentPage } = useParams();
  const [value, setValue] = useState("");
  const handleSearch = (e) => {
    e.preventDefault();
    if (currentPage !== 1) {
      history.push(`${url}/1`);
    }
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

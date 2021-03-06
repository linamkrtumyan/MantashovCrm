import React, { useState, useRef } from "react";
import { connect } from "react-redux";
import { useOutsideClick } from "../../Hooks/useOutsideClick";
import { logout } from "../../store/login/actions/logout";
import "./header.css";

function Header({ userName, logout }) {
  const [dropdown, setDropdown] = useState(true);

  const ref = useRef();

  const handleDropdown = () => {
    setDropdown(!dropdown);
  };

  const handleLogout = () => {
    logout();
  };

  const handleClick = () => {
    if (!dropdown) {
      setDropdown(true);
    }
  };

  useOutsideClick(ref, handleClick);

  return (
    <div className="header_component">
      <div className="header_user_container">{userName}</div>
      <div style={{ display: "flex" }}>
        {/* <div
          style={{ marginTop: "15px" }}
          className="control has-icons-left has-icons-right"
        >
          <input className="input " type="text" placeholder="Search" />
          <span className="icon is-left">
            <i className="fas fa-search"></i>{" "}
          </span>
        </div> */}
        {/* <div style={{ margin: "25px 10px 25px 25px" }}>
          <i className="far fa-bell"></i>
        </div> */}

        <div
          style={{ margin: "15px 35px 15px 10px" }}
          className={`dropdown is-right ${dropdown ? "" : "is-active"}`}
        >
          <div className="dropdown-trigger">
            <button
              onClick={() => handleDropdown()}
              className="button"
              aria-haspopup="true"
              aria-controls="dropdown-menu2"
            >
              <i className="fas fa-user"></i>{" "}
            </button>
          </div>
          <div
            className="dropdown-menu"
            id="dropdown-menu2"
            role="menu"
            ref={ref}
          >
            <div className="dropdown-content">
              <div className="dropdown-item" onClick={handleLogout}>
                <p>Log Out</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {
    logout: () => dispatch(logout()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);

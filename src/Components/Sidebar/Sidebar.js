import React, { useState } from "react";
import "./sidebar.css";
import { NavLink } from "react-router-dom";

import news from "../../img/news.svg";
import event from "../../img/event.svg";
import setting from "../../img/setting.svg";
import members from "../../img/members.svg";

function Sidebar() {
  const [navbarOpen, setNavbarOpen] = useState(false);

  const handleToggle = () => {
    setNavbarOpen(!navbarOpen);
  };
  const closeMenu = () => {
    setNavbarOpen(false);
  };

  return (
    <div className="header">
      <div>
        <nav className="navBar">
          <div className="navbar_button">
            <div className="navbar_logo_div" onClick={handleToggle}>
              <svg fill="#fff" viewBox="0 0 100 80" width="30" height="40">
                <rect width="100" height="6"></rect>
                <rect y="30" width="100" height="6"></rect>
                <rect y="60" width="100" height="6"></rect>
              </svg>
            </div>
          </div>

          <ul className={`menuNav ${navbarOpen ? " showMenu" : ""}`}>
            <NavLink
              // to="#"
              // className={`menuNav ${navbarOpen ? " showMenu" : ""}`}
              className="menu_title"
              to="/news"
              // activeClassName="active-link"
              onClick={() => closeMenu()}
              // exact
            >
              {navbarOpen ? (
                <div className="sidebar_title">
                  <div className="open_sidebar_icon">
                    <img
                      alt=""
                      style={{ width: "20px", height: "20px" }}
                      src={news}
                    />
                  </div>
                  <div>News</div>
                </div>
              ) : (
                <img
                  alt=""
                  style={{ width: "20px", height: "20px" }}
                  src={news}
                />
              )}
            </NavLink>
            <NavLink
              // to={link.path}
              // className={`menuNav ${navbarOpen ? " showMenu" : ""}`}
              className="menu_title"
              to="/events"
              // activeClassName="active-link"
              onClick={() => closeMenu()}
              // exact
            >
              {navbarOpen ? (
                <div className="sidebar_title">
                  <div className="open_sidebar_icon">
                    <img
                      alt=""
                      style={{ width: "20px", height: "20px" }}
                      src={event}
                    />
                  </div>
                  <div>Events</div>
                </div>
              ) : (
                <img
                  alt=""
                  style={{ width: "20px", height: "20px" }}
                  src={event}
                />
              )}
            </NavLink>
            <NavLink
              // to={link.path}
              // className={`menuNav ${navbarOpen ? " showMenu" : ""}`}
              className="menu_title"
              to="/members"
              // activeClassName="active-link"
              onClick={() => closeMenu()}
              // exact
            >
              {navbarOpen ? (
                <div className="sidebar_title">
                  <div className="open_sidebar_icon">
                    <img
                      alt=""
                      style={{ width: "20px", height: "20px" }}
                      src={members}
                    />
                  </div>
                  <div>Members</div>
                </div>
              ) : (
                <img
                  alt=""
                  style={{ width: "20px", height: "20px" }}
                  src={members}
                />
              )}
            </NavLink>
            <NavLink
              // to={link.path}
              // className={`menuNav ${navbarOpen ? " showMenu" : ""}`}
              className="menu_title"
              to=""
              // activeClassName="active-link"
              onClick={() => closeMenu()}
              // exact
            >
              {navbarOpen ? (
                <div className="sidebar_title">
                  <div className="open_sidebar_icon">
                    <img
                      alt=""
                      style={{ width: "20px", height: "20px" }}
                      src={setting}
                    />
                  </div>
                  <div>Settings</div>
                </div>
              ) : (
                <img
                  alt=""
                  style={{ width: "20px", height: "20px" }}
                  src={setting}
                />
              )}
            </NavLink>
          </ul>
        </nav>
      </div>
    </div>
  );
}

export default Sidebar;

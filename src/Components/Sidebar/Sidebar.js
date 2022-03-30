import React, { useState } from "react";
import "./sidebar.css";
import { NavLink } from "react-router-dom";

import news from "../../img/news.svg";
import event from "../../img/event.svg";
import setting from "../../img/setting.svg";
import members from "../../img/members.svg";
import applicant from "../../img/applicant.svg";
import speaker from "../../img/speaker.svg";

function Sidebar() {
  const [navbarOpen, setNavbarOpen] = useState(true);

  const handleToggle = () => {
    setNavbarOpen(!navbarOpen);
  };
  const closeMenu = () => {
    setNavbarOpen(false);
  };

  return (
    // <div className="header">
    <div>
      <div>
        <nav className="navBar">
          {/* <div className="navbar_button">
            <div className="navbar_logo_div" onClick={handleToggle}>
              <svg fill="#fff" viewBox="0 0 100 80" width="30" height="40">
                <rect width="100" height="6"></rect>
                <rect y="30" width="100" height="6"></rect>
                <rect y="60" width="100" height="6"></rect>
              </svg>
            </div>
          </div> */}

          <ul className={`menuNav ${navbarOpen ? " showMenu" : ""}`}>
            <NavLink
              className="menu_title"
              to="/news/1"
              activeClassName="active-link"
              // onClick={() => closeMenu()}
            >
              {navbarOpen ? (
                <div className="sidebar_title">
                  <div className="open_sidebar_icon">
                    {/* <img alt="" className="sidebar_icon" src={news} /> */}
                    <i className="far fa-newspaper is-medium"></i>
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
              className="menu_title"
              to="/events/1"
              activeClassName="active-link"
              // onClick={() => closeMenu()}
            >
              {navbarOpen ? (
                <div className="sidebar_title">
                  <div className="open_sidebar_icon">
                    {/* <img alt="" className="sidebar_icon" src={event} /> */}
                    <i className="fas fa-calendar-alt is-medium"></i>
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
              className="menu_title"
              to="/members/1"
              activeClassName="active-link"
              // onClick={() => closeMenu()}
            >
              {navbarOpen ? (
                <div className="sidebar_title">
                  <div className="open_sidebar_icon">
                    {/* <img className="sidebar_icon" alt="" src={members} /> */}
                    <i className="fas fa-users is-medium"></i>
                  </div>
                  <div>Members</div>
                </div>
              ) : (
                <img alt="" className="sidebar_icon" src={members} />
              )}
            </NavLink>

            {/* <NavLink
              className="menu_title"
              to="/settings"
              activeClassName="active-link"
              // onClick={() => closeMenu()}
            >
              {navbarOpen ? (
                <div className="sidebar_title">
                  <div className="open_sidebar_icon">
                    <i className="fas fa-cog is-medium"></i>
                  </div>
                  <div>Settings</div>
                </div>
              ) : (
                <img alt="" className="sidebar_icon" src={setting} />
              )}
            </NavLink> */}

            <NavLink
              className="menu_title"
              to="/information"
              activeClassName="active-link"
              // onClick={() => closeMenu()}
            >
              {navbarOpen ? (
                <div className="sidebar_title">
                  <div className="open_sidebar_icon">
                    {/* <img alt="" className="sidebar_icon" src={setting} /> */}
                    <i className="fas fa-info is-medium"></i>
                  </div>
                  <div>Information</div>
                </div>
              ) : // <img alt="" className="sidebar_icon" src={setting} />
              null}
            </NavLink>

            <NavLink
              className="menu_title"
              to="/applicant/1"
              activeClassName="active-link"
              // onClick={() => closeMenu()}
            >
              {navbarOpen ? (
                <div className="sidebar_title">
                  <div className="open_sidebar_icon">
                    {/* <img alt="" className="sidebar_icon" src={setting} /> */}
                    <i className="fas fa-solid fa-user"></i>{" "}
                  </div>
                  <div>Applicant</div>
                </div>
              ) : (
                <img alt="" className="sidebar_icon" src={applicant} />
              )}
            </NavLink>

            <NavLink
              className="menu_title"
              to="/speakers/1"
              activeClassName="active-link"
              // onClick={() => closeMenu()}
            >
              {navbarOpen ? (
                <div className="sidebar_title">
                  <div className="open_sidebar_icon">
                    {/* <img alt="" className="sidebar_icon" src={setting} /> */}
                    <i className="fas fa-solid fa-user-tie"></i>
                    {/* <img alt="" className="sidebar_icon" src={speaker} /> */}
                  </div>
                  <div>Speakers</div>
                </div>
              ) : (
                <img alt="" className="sidebar_icon" src={""} />
              )}
            </NavLink>
          </ul>
        </nav>
      </div>
    </div>
  );
}

export default Sidebar;

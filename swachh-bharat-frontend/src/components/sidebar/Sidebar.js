import React, { useState } from "react";
import "./Sidebar.css";
import { NavLink, useNavigate } from "react-router-dom";
import {
  MdNotificationsNone,
  MdOutlineDashboardCustomize,
  MdOutlineAddLocationAlt,
} from "react-icons/md";
import { CgProfile } from "react-icons/cg";
import { BiLogOut } from "react-icons/bi";

const Sidebar = () => {

  const [isExpanded, setExpendState] = useState(false);
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));
  const isDriver = user.roles.map((r) => {
    if (r["roleName"] === "DRIVER_USER") return true;
    return false;
  })[0];

  const menuItems = [
    {
      text: "Dashboard",
      icon: <MdOutlineDashboardCustomize />,
      path: isDriver ? "/driver-dashboard" : "/dashboard",
    },
    {
      text: "Profile",
      icon: <CgProfile />,
      path: isDriver ? "/driver-profile" : "/profile",
    },
    {
      text: "Notifications",
      icon: <MdNotificationsNone />,
      path: "/notification",
    },
    {
      text: "Add Location",
      icon: <MdOutlineAddLocationAlt />,
      path: "/add-pickup-location",
    },
  ];

  const logoutHandler = () => {
    navigate("/");
    localStorage.clear();
  };

  return (
    <div
      className={
        isExpanded
          ? "side-nav-container"
          : "side-nav-container side-nav-container-NX"
      }
    >
      <div className="nav-upper">
        <div className="nav-heading">
          {isExpanded && (
            <img
              src="res/user.png"
              alt="Prakash"
              className="nav-profile-pic"
            />
            // <div className="nav-brand">
            //   <img src="icons/Logo.svg" alt="" />
            //   <h2>Swachh Bharat</h2>
            // </div>
          )}
          <button
            className={
              isExpanded ? "hamburger hamburger-in" : "hamburger hamburger-out"
            }
            onClick={() => setExpendState(!isExpanded)}
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
        <div className="nav-menu">
          {menuItems.map(({ text, icon, path }) => (
            <NavLink
              key={text}
              className={isExpanded ? "menu-item" : "menu-item menu-item-NX"}
              to={path}
            >
              <div className="menu-item-icon">{icon}</div>
              {isExpanded && <p style={{ margin: "0px" }}>{text}</p>}
            </NavLink>
          ))}
        </div>
      </div>
      <div className="nav-footer">
        <div className="nav-footer-info" onClick={logoutHandler}>
          {isExpanded && <div className="nav-footer-text">Logout</div>}
          <div className={"nav-footer-icon"}>
            <BiLogOut />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;

import React, { useState } from "react";
import "./LoggedInNavbar.css";

import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

import NotificationsRoundedIcon from "@mui/icons-material/NotificationsRounded";
import AccountCircleRoundedIcon from "@mui/icons-material/AccountCircleRounded";
import ChatRoundedIcon from "@mui/icons-material/ChatRounded";

import politoLogo from "../../assets/politoLogo.png";
import SearchBarStudent from "../SearchBarStudent/SearchBarStudent";

import Sidebar from "../SideBar/Sidebar";
import { Link } from "react-router-dom";

const LoggedInNavbar = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <>
      <nav className="navbar">
        <button className="navbar-sidebar" onClick={toggleSidebar}>
          <ArrowForwardIosIcon style={{ color: "#FF5733" }} />
        </button>
        <div className="navbar-logo">
          <Link to="/studentDashboard">
            <img src={politoLogo} className="logo" alt="Politecnico Di Torino" />
          </Link>
        </div>

        <div className="navbar-searchbar-container">
          <div className="navbar-searchbar">
            <SearchBarStudent />
          </div>
        </div>

        <div className="navbar-icons">
          <button className="navbar-messages">
            <ChatRoundedIcon />
          </button>
          <button className="navbar-notifications">
            <NotificationsRoundedIcon />
          </button>
        </div>
        <AccountCircleRoundedIcon
          style={{ color: "white" }}
          className="navbar-user"
        />
      </nav>
      <Sidebar
        isOpen={sidebarOpen}
        closeSidebar={() => setSidebarOpen(false)}
      />
    </>
  );
};

export default LoggedInNavbar;

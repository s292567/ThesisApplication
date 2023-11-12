import React from "react";
import "./LoggedInNavbar.css";

import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

import NotificationsRoundedIcon from "@mui/icons-material/NotificationsRounded";
import AccountCircleRoundedIcon from "@mui/icons-material/AccountCircleRounded";
import ChatRoundedIcon from "@mui/icons-material/ChatRounded";

import politoLogo from "../../assets/politoLogo.png";
import SearchBarStudent from "../SearchBarStudent/SearchBarStudent";

const LoggedInNavbar = () => {
  return (
    <nav className="navbar">
      <button className="navbar-sidebar">
        <ArrowForwardIosIcon style={{ color: "#FF5733" }} />
      </button>
      <div className="navbar-logo">
        <img src={politoLogo} className="logo" alt="Politecnico Di Torino" />
      </div>

      <div className="navbar-searchbar">
        <SearchBarStudent />
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
  );
};

export default LoggedInNavbar;

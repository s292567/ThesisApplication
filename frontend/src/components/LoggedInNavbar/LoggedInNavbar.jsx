import React from "react";

import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Badge from "@mui/material/Badge";

import AccountCircle from "@mui/icons-material/AccountCircle";
import MailIcon from "@mui/icons-material/Mail";
import NotificationsIcon from "@mui/icons-material/Notifications";

import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import SearchBarStudent from "../SearchBarStudent/SearchBarStudent";

import politoLogo from "../../assets/politoLogo.png";
import Sidebar from "../SideBar/Sidebar";
import { Link } from "react-router-dom";
import "./LoggedInNavbar.css";


const LoggedInNavbar = ({ sidebarOpen, toggleSidebar, sidebarWidth, searchBar}) => {
  return (
    <>
      <AppBar
        position="fixed"
        sx={{
          width: sidebarOpen ? `calc(100% - ${sidebarWidth}px)` : "100%",
          transition: (theme) =>
            theme.transitions.create(["margin", "width"], {
              easing: theme.transitions.easing.sharp,
              duration: theme.transitions.duration.leavingScreen,
            }),
          marginLeft: sidebarOpen ? `${sidebarWidth}px` : "0",
        }}
      >
        <Toolbar className="navbar">
          {!sidebarOpen ? (
            <>
              <IconButton
                size="large"
                edge="start"
                aria-label="open drawer"
                sx={{ backgroundColor: "transparent", color: "#FC7A08" }}
                onClick={toggleSidebar}
                className="navbar-sidebar-button"
              >
                <ArrowForwardIosIcon />
              </IconButton>
              <Link to="/studentDashboard" >
                <img
                  src={politoLogo}
                  className="logo"
                  alt="Politecnico Di Torino"
                  style={{marginRight: "1rem"}}
                />
              </Link>
            </>
          ) : (
            <></>
          )}

          {searchBar && <SearchBarStudent />}

          <div className="navbar-icons">
            <IconButton size="large" aria-label="show 4 new mails" className="navbar-mail">
              <Badge badgeContent={4} color="error">
                <MailIcon />
              </Badge>
            </IconButton>

            <IconButton size="large" aria-label="show 17 new notifications" className="navbar-notifications">
              <Badge badgeContent={17} color="error">
                <NotificationsIcon />
              </Badge>
            </IconButton>

            <IconButton
              size="large"
              edge="end"
              aria-label="account of current user"
              className="navbar-user"
            >
              <AccountCircle />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
      <Sidebar
        isOpen={sidebarOpen}
        closeSidebar={toggleSidebar}
        sidebarWidth={sidebarWidth}
      />
    </>
  );
};

export default LoggedInNavbar;

// Sidebar.jsx
import React from "react";
import { Link } from "react-router-dom";
import politoLogo from "../../assets/politoLogo.png";

import ArrowBackIosNewRoundedIcon from "@mui/icons-material/ArrowBackIosNewRounded";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";

import "./Sidebar.css";

const Sidebar = ({ isOpen, closeSidebar }) => {
  return (
    <aside className={`sidebar ${isOpen ? "open" : ""}`}>
      <div className="sidebar-content">
        <Link to="/studentDashboard">
          <img src={politoLogo} alt="Politecnico Di Torino" />
        </Link>
        <ul>
          <li>Dashboard</li>
          <li>Proposal List</li>
          {/* More items */}
        </ul>
      </div>
      <button className="sidebar-close-button" onClick={closeSidebar}>
        {/* Conditionally render the close icon for small screens */}
        {window.innerWidth < 768 ? (
          <CancelOutlinedIcon fontSize="large" style={{ color: "white" }} />
        ) : (
          <ArrowBackIosNewRoundedIcon style={{ color: "white" }} />
        )}
      </button>
    </aside>
  );
};

export default Sidebar;

// Sidebar.jsx
import React from 'react';
import { useMediaQuery, Drawer } from '@mui/material';
import { Link } from "react-router-dom";
import politoLogo from "../../assets/images/politoLogo.png";

import ArrowBackIosNewRoundedIcon from "@mui/icons-material/ArrowBackIosNewRounded";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";

import "./Sidebar.css";


const Sidebar = ({ isOpen, closeSidebar, sidebarWidth }) => {

  const isWideScreen = useMediaQuery('(min-width: 768px)');

  return (
    <Drawer
      variant={isWideScreen ? isOpen ? 'permanent' : 'temporary' : 'temporary'}
      sx={{
        width: isWideScreen ? `${sidebarWidth}px` : '100%',
        '& .MuiDrawer-paper': {
          background: 'linear-gradient(to bottom, #FC7A08, #F0EFF5)',
          width: isWideScreen ? `${sidebarWidth}px` : '100%',
          boxSizing: 'border-box',
          border: 'none',
        },
      }}
      open={isOpen}
    >
      <div className="sidebar-content">
        <Link to="/studentDashboard">
          <img src={politoLogo} alt="Politecnico Di Torino" />
        </Link>
        <ul>
          <li>Dashboard</li>
          <li>Proposal List</li>
          
        </ul>
      </div>
      <button className="sidebar-close-button" onClick={closeSidebar}>
        { isWideScreen ? (
          <ArrowBackIosNewRoundedIcon style={{ color: "white" }} />
        ) : (
          <CancelOutlinedIcon fontSize="large" style={{ color: "white" }} />
        )}
      </button>
    </Drawer>
  );
};

export default Sidebar;

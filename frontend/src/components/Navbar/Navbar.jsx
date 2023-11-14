import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Box,
  Drawer,
  useMediaQuery,
} from "@mui/material";
import { Link } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import politoLogo from "../../assets/politoLogo.png"; // Ensure this path is correct
import "./Navbar.css";

const ResponsiveAppBar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const isMobile = useMediaQuery("(max-width:768px)");

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <Box sx={{ textAlign: "center", p: 1 }} className="drawer-links">
      <IconButton
        aria-label="open drawer"
        edge="start"
        onClick={handleDrawerToggle}
        sx={{fontSize: "large", position: "absolute", top: "2.5rem", right: "1rem"}}
      >
        <CancelOutlinedIcon fontSize="large" style={{ color: "blue" }} />
      </IconButton>
      <img
        src={politoLogo}
        alt="Politecnico di Torino Logo"
        className="navbar-logo"
      />
      <Link className="navbar-link">Academics</Link>
      <Link className="navbar-link">Thesis</Link>
      <Link className="navbar-link">Innovation</Link>
      <button className="login-button">Login</button>
    </Box>
  );

  return (
    <Box sx={{ display: "flex" }}>
      <AppBar position="fixed" color="default">
        <Toolbar sx={{ justifyContent: "space-between", overflowX: "auto" }}>
          <img
            src={politoLogo}
            alt="Politecnico di Torino Logo"
            className="navbar-logo"
          />
          {!isMobile && (
            <div>
              <Link className="navbar-link">Academics</Link>
              <Link className="navbar-link">Thesis</Link>
              <Link className="navbar-link">Innovation</Link>
              <button className="login-button">Login</button>
            </div>
          )}
          {isMobile && (
            <IconButton
              color="default"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ ml: "auto", fontSize: "large" }}
            >
              <MenuIcon style={{ fontSize: "2rem" }} />
            </IconButton>
          )}
        </Toolbar>
      </AppBar>
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{ keepMounted: true }}
        sx={{
          display: { xs: "block", md: "none" },
          "& .MuiDrawer-paper": { boxSizing: "border-box", width: "100%" },
        }}
      >
        {drawer}
      </Drawer>
    </Box>
  );
};

export default ResponsiveAppBar;

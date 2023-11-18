import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  IconButton,
  Box,
  Drawer,
  useMediaQuery,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import politoLogo from "../../assets/images/politoLogo.png"; // Ensure this path is correct
import "./Navbar.css";
import { useUserContext } from "../../contexts";

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const isMobile = useMediaQuery("(max-width:768px)");

  const { isLoggedIn, logout } = useUserContext();

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <Box sx={{ textAlign: "center", p: 1 }} className="drawer-links">
      <IconButton
        aria-label="open drawer"
        edge="start"
        onClick={handleDrawerToggle}
        sx={{
          fontSize: "large",
          position: "absolute",
          top: "2.5rem",
          right: "1rem",
        }}
      >
        <CancelOutlinedIcon fontSize="large" style={{ color: "blue" }} />
      </IconButton>
      <NavbarComponents isLoggedIn={isLoggedIn} logout={logout} isMobile={false} mobileOpen={mobileOpen}/>
    </Box>
  );

  return (
    <Box sx={{ display: "flex" }}>
      <AppBar position="fixed" color="default">
        <Toolbar sx={{ justifyContent: "space-between", overflowX: "auto" }}>
          <NavbarComponents  isMobile={isMobile} mobileOpen={mobileOpen} isLoggedIn={isLoggedIn} logout={logout} />

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

const NavbarComponents = ({ isMobile, mobileOpen ,isLoggedIn,logout}) => {
  const navigate = useNavigate();

  return (
    <>
      <Link to="/">
        <img
          src={politoLogo}
          alt="Politecnico Di Torino"
          className="navbar-logo"
          style={{
            marginTop: mobileOpen ? "3rem" : "1rem",
          }}
        />
      </Link>
      {!isMobile && (
        <div style={{display: mobileOpen ? "block" :"flex", alignItems: "center"}}>
          <div className="navbar-links">
            <Link to="/">Academics</Link>
            <Link>Thesis</Link>
            <Link>Innovation</Link>
          </div>
          <button className="login-button" onClick={(event) => {
              event.preventDefault()
              if (isLoggedIn)
                  logout();
              else
                  navigate("/login");
          }}>{!isLoggedIn ? "Login" : "Logout"}</button>

        </div>
      )}
    </>
  );
};

export default Navbar;

import React, {useContext, useEffect, useState} from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  IconButton,
  useMediaQuery,
  Button,
  styled,
  Box,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

import politoLogo from "../../assets/images/politoLogo.png"; // Ensure this path is correct


import { frontendRoutes } from "../../routes";
import { CancelRounded } from "@mui/icons-material";
import {AuthContext} from "react-oauth2-code-pkce";

// CSS SECTION
const MyAppBar = styled(AppBar)(({ theme }) => ({
  backgroundColor: "white",
}));

const MyToolbar = styled(Toolbar)(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "1rem",
}));

const Logo = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  "& img": {
    width: "176px",
  },
}));

const Links = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  "& a": {
    textDecoration: "none",
    color: "black",
    fontSize: "large",
    fontWeight: "bold",
    marginLeft: "2rem",
    "&:hover": {
      color: "blue",
    },
  },
}));

const LogButton = styled(Button)(({ theme }) => ({
  padding: "0.5rem 1rem",
  border: "none",
  borderRadius: "12px",
  backgroundColor: "#003576",
  color: "white",
  fontFamily: "Arial, Helvetica, sans-serif",
  fontSize: "large",
  fontWeight: "bold",
  marginLeft: "2rem",
  "&:hover": {
    backgroundColor: "#025bc7",
    color: "white",
  },
}));
// END CSS SECTION

function LinkGroup() {
  return (
    <>
      <Link to="/">Academics</Link>
      <Link to="/">Thesis</Link>
      <Link to="/">Innovation</Link>
    </>
  );
}

export default function NavbarNormal(){
  const navigate = useNavigate();
  const location = useLocation();
  const {token,logOut,loginInProgress,login}=useContext(AuthContext);
  const loggedIn=token||loginInProgress?true:false;


  const [mobileOpen, setMobileOpen] = useState(false);
  const isMobile = useMediaQuery("(max-width:768px)");

  useEffect(() => {
    if (!isMobile && mobileOpen) {
      setMobileOpen(!mobileOpen);
    }
  }, [isMobile]);


  return (
    <MyAppBar position="sticky" sx={{ height: mobileOpen ? "100vh" : "auto" }}>
      <MyToolbar
        sx={{
          flexDirection: mobileOpen ? "column" : "row",
          "& div": {
            marginBottom: mobileOpen ? "5rem" : "0rem",
            marginTop: mobileOpen ? "3rem" : "0rem",
          },
        }}
      >
        <Logo>
          <Link to="/">
            <img
              src={politoLogo}
              alt="Politecnico Di Torino"
            />
          </Link>
          {isMobile && mobileOpen && (
            <IconButton
              sx={{ position: "absolute", top: "5rem", right: "1rem" }}
              onClick={() => {
                setMobileOpen(!mobileOpen);
              }}
            >
              <CancelRounded fontSize="large" sx={{ color: "#003576" }} />
            </IconButton>
          )}
        </Logo>
        {((isMobile && mobileOpen) || !isMobile) && (
          <Links
            sx={{
              flexDirection: mobileOpen ? "column" : "row",
              "& *": {
                marginBottom: mobileOpen ? "2rem" : "0rem",
                alignSelf: mobileOpen ? "flex-start" : "center",
              },
            }}
          >
            <LinkGroup />
            {location.pathname !== frontendRoutes.login ? (
              <LogButton
                variant="contained"
                sx={{ backgroundColor: loggedIn ? "darkred" : "#003576" }}
                onClick={() => {
                  loggedIn ? logOut() : login();
                  setMobileOpen(false);
                }}
              >
                {loggedIn ? "Logout" : "Login"}
              </LogButton>
            ) : (<Box sx={{padding: "2rem", marginLeft: "2rem"}}/>)}
          </Links>
        )}
        {isMobile && !mobileOpen && (
          <IconButton
            edge="start"
            aria-label="open drawer"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            <MenuIcon fontSize="large" sx={{ color: "black" }} />
          </IconButton>
        )}
      </MyToolbar>
    </MyAppBar>
  );
}


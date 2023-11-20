// LoggedInNavbar.jsx

import React from "react";

import {
  AppBar,
  Toolbar,
  styled,
  Box,
  useMediaQuery,
  Avatar,
  Badge,
  IconButton,
  Tooltip,
  Menu,
  MenuItem,
  ListItemIcon,
  Divider,
} from "@mui/material";

import politoLogo from "../../assets/images/politoLogo.png";
import { Link, useLocation } from "react-router-dom";

import {
  ArrowBackIos,
  Logout,
  MailOutline,
  NotificationsOutlined,
  Settings,
} from "@mui/icons-material";
import { useUserContext } from "../../contexts";
import { frontendRoutes } from "../../routes";

const MyToolbar = styled(Toolbar)(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  backgroundColor: "white",
  padding: "1rem",
}));

const Logo = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  gap: "10px",
}));

const Icons = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  gap: "2rem",
}));

const Badges = styled(Box)(({ theme }) => ({
  display: "none",
  alignItems: "center",
  gap: "1rem",
  "& svg": {
    fontSize: "xx-large",
    color: "#1976d2",
  },
  [theme.breakpoints.up("sm")]: {
    display: "flex",
  },
}));

function LoggedInNavbar() {
  const { logout, homeRoute } = useUserContext();

  let isMobile = useMediaQuery("(max-width: 600px)");

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClickAvatar = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleCloseAvatar = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar>
      <MyToolbar>
        <Logo>
          <IconButton>
            <ArrowBackIos
              fontSize={isMobile ? "medium" : "large"}
              sx={{ color: "orange" }}
            />
          </IconButton>
          <Link to={homeRoute}>
            <img
              src={politoLogo}
              alt="Politecnico Di Torino"
              className="navbar-logo"
              style={{ width: isMobile ? "100px" : "176px" }}
            />
          </Link>
        </Logo>
        <Icons>
          <Badges>
            <Badge badgeContent={4} color="error">
              <MailOutline />
            </Badge>
            <Badge badgeContent={2} color="error">
              <NotificationsOutlined />
            </Badge>
          </Badges>
          {/** Text inside the avatar will be the name and surname initials */}
          <Tooltip title="Account menu">
            <IconButton
              onClick={handleClickAvatar}
              aria-controls={open ? "account-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
            >
              <Avatar
                children="MR"
                sx={{
                  bgcolor: "#003576",
                  padding: isMobile ? "0.2rem" : "0.5rem",
                  fontSize: isMobile ? "medium" : "large",
                }}
              />
            </IconButton>
          </Tooltip>
        </Icons>
      </MyToolbar>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleCloseAvatar}
        onClick={handleCloseAvatar}
        sx={{
          overflow: "visible",
          filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.0))",
          mt: 0.5,
          "& .MuiPaper-root": {
            marginRight: "10px",
            borderRadius: "15px",
          },
          "& .MuiAvatar-root": {
            width: 32,
            height: 32,
            ml: -0.5,
            mr: 1,
          },
          "&:before": {
            content: '""',
            display: "block",
            position: "absolute",
            top: 0,
            right: 14,
            width: 10,
            height: 10,
            bgcolor: "background.paper",
            transform: "translateY(-50%) rotate(45deg)",
            zIndex: 0,
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <MenuItem>
          <Avatar /> Profile
        </MenuItem>
        <Divider />
        <MenuItem>
          <ListItemIcon>
            <Settings fontSize="small" />
          </ListItemIcon>
          Settings
        </MenuItem>
        <MenuItem onClick={() => logout()}>
          <ListItemIcon>
            <Logout fontSize="small" color="error" />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
    </AppBar>
  );
}

export default LoggedInNavbar;

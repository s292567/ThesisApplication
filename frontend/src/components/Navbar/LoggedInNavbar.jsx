import React, {useState, useEffect} from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Box,
  useMediaQuery,
  useTheme,
  styled,
  Menu,
  MenuItem,
  Avatar,
  ListItemIcon,
  Divider, Tooltip,
} from '@mui/material';
import {
  Logout,
  DragHandleRounded,
  CancelRounded,
} from '@mui/icons-material';
import {Link} from 'react-router-dom';

import politoLogo from '../../assets/images/politoLogo.png';
import {useUserContext} from "../../contexts";
import {frontendRoutes} from "../../routes/index.js";

const MyToolbar = styled(Toolbar)(({theme}) => ({
  display: 'flex',
  justifyContent: 'space-between',
  backgroundColor: '#003366',
  color: 'white',
  [theme.breakpoints.down('sm')]: {
    padding: '0 8px',
  },
}));

const Icons = styled(Box)({
  display: "flex",
  alignItems: "center",
  gap: "2rem",
});

const Badges = styled(Box)(({theme}) => ({
  display: "none",
  alignItems: "center",
  gap: "1rem",
  "& svg": {
    fontSize: "xx-large",
    color: "white",
  },
  [theme.breakpoints.up("sm")]: {
    display: "flex",
  },
}));

const Links = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  flexGrow: 1,
  gap: "10px",
});


export default function LoggedInNavbar() {
  const theme = useTheme();

  const {logout, homeRoute, user} = useUserContext();

  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [mobileOpen, setMobileOpen] = useState(false);
  useEffect(() => {
    if (!isMobile && mobileOpen) {
      setMobileOpen(!mobileOpen);
    }
  }, [isMobile]);

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClickAvatar = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleCloseAvatar = () => {
    setAnchorEl(null);
  };

  // noinspection JSValidateTypes
  return (
    <>
      {!isMobile && (
        <AppBar position="static" color="default" elevation={0}>
          <Divider sx={{backgroundColor: "#003366", padding: "0.5rem"}}/>
          <Toolbar sx={{padding: "1rem"}}>
            <Box sx={{flexGrow: 1, display: 'flex', alignItems: 'center'}}>
              <img src={politoLogo} alt="Politecnico Di Torino" height="110"/>
            </Box>
            <Typography variant="h4" component="div" color={"#003366"}>
              THESIS @POLITO
            </Typography>
          </Toolbar>
        </AppBar>
      )}
      <AppBar position="sticky" sx={{height: mobileOpen ? "100vh" : "auto", backgroundColor: '#003366'}}>
        <MyToolbar
          sx={{
            flexDirection: mobileOpen ? "column" : "row",
          }}
        >
          {isMobile && mobileOpen && (
            <IconButton
              sx={{position: "absolute", top: "8rem", right: "1rem", "&:hover": {backgroundColor: "#007baa"}}}
              onClick={() => {
                setMobileOpen(!mobileOpen);
              }}
            >
              <CancelRounded fontSize="large" sx={{color: "white"}}/>
            </IconButton>
          )}
          {((isMobile && mobileOpen) || !isMobile) && (
            <Links
              sx={{
                marginTop: mobileOpen ? "12rem" : "0rem",
                flexDirection: mobileOpen ? "column" : "row",
                "& a": {
                  marginBottom: mobileOpen ? "2.0rem" : "0rem",
                  alignSelf: mobileOpen ? "flex-start" : "center",
                  fontSize: mobileOpen ? "x-large" : "medium",
                  fontWeight: 'bold',
                  textDecoration: 'none',
                  color: 'white',
                  marginRight: mobileOpen ? "0rem" : "2rem",
                },
                "& a:hover": {
                  backgroundColor: mobileOpen ? "#007baa" : "transparent",
                  borderRadius: mobileOpen ? "12px" : "0px",
                  padding: mobileOpen ? "0.5rem" : "0rem",
                  width: mobileOpen ? "90%" : "auto",
                  color: mobileOpen ? "white" : "#a3c5e3"
                },
              }}
            >
              <Link to={homeRoute} color="inherit" sx={{mx: 2}} onClick={()=>setMobileOpen(false)}>
                Home
              </Link>

              {user.role === "Professor" && (<>
                  <Link to={frontendRoutes.professorTheses} color="inherit" sx={{mx: 2}} onClick={()=>setMobileOpen(false)}>
                    Theses
                  </Link>
                  <Link to={frontendRoutes.professorApplicants} color="inherit" sx={{mx: 2}} onClick={()=>setMobileOpen(false)}>
                    Applicants
                  </Link>
                  {/* Here NEW LINKS ON THE NAVBAR */}
                </>
              )}

              {user.role === "Student" && (<>
                  <Link to={frontendRoutes.studentTheses} color="inherit" sx={{mx: 2}} onClick={()=>setMobileOpen(false)}>
                    Theses
                  </Link>
                    <Link to={frontendRoutes.studentApplications} color="inherit" sx={{mx: 2}}>
                      Applications
                    </Link>
                  {/* Here NEW LINKS ON THE NAVBAR */}
                </>
              )}

            </Links>)}
          {isMobile && !mobileOpen && (
            <IconButton
              aria-label="open drawer"
              onClick={() => setMobileOpen(!mobileOpen)}
              sx={{borderRadius: "12px", "&:hover": {backgroundColor: "#007baa"}, height: "maxHeight"}}
              variant="contained"
            >
              <DragHandleRounded fontSize="medium" sx={{color: "white"}}/>
            </IconButton>
          )}
          <Icons>
            {/** Text inside the avatar will be the name and surname initials */}
            {!mobileOpen && (
              <Tooltip title="Account menu">
                <IconButton
                  onClick={handleClickAvatar}
                  aria-controls={open ? "account-menu" : undefined}
                  aria-haspopup="true"
                  aria-expanded={open ? "true" : undefined}
                >
                  <Avatar
                    children={user ? `${user.username[0]}${user.username[1]}` : "MR"}
                    sx={{
                      bgcolor: "#007baa",
                      padding: isMobile ? "0.2rem" : "0.5rem",
                      fontSize: isMobile ? "medium" : "large",
                    }}
                  />
                </IconButton>
              </Tooltip>)}
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
          transformOrigin={{horizontal: "right", vertical: "top"}}
          anchorOrigin={{horizontal: "right", vertical: "bottom"}}
        >
          <MenuItem>
            <Avatar/> Profile
          </MenuItem>
          <Divider/>
          <MenuItem onClick={() => {
            logout()
          }}>
            <ListItemIcon>
              <Logout fontSize="small" color="error"/>
            </ListItemIcon>
            Logout
          </MenuItem>
        </Menu>
      </AppBar>
    </>
  );
}

import React, { useState } from "react";

import { BottomNavbar, LoggedInNavbar } from "../../components";

import {Box, Button } from "@mui/material";

import { useUserContext } from "../../contexts"
import { frontendRoutes as routes } from "../../routes";
import { useNavigate } from "react-router-dom";

const sidebarWidth = 240;

const ProfessorDashboardPage = () => {
  const { logout } = useUserContext();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const navigate = useNavigate();

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div>
      <header style={{ display: "flex" }}>
        <LoggedInNavbar
          logout={logout()}
          sidebarOpen={sidebarOpen}
          toggleSidebar={toggleSidebar}
          sidebarWidth={sidebarWidth}
          searchBar={false}
        />
      </header>

      {/**Logic to have the transition effect is inside the sx element in Box */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          transition: (theme) =>
            theme.transitions.create("margin", {
              easing: theme.transitions.easing.sharp,
              duration: theme.transitions.duration.leavingScreen,
            }),
          marginLeft: sidebarOpen ? `${sidebarWidth}px` : "0",
          marginTop: "7rem",
          marginBottom: "6rem",
        }}
      >
        {/**if we are going whit a general button in this way is not so convenient at the end, if you want different style, functionalities and so on */}
        { /** <Button buttonText={"+ Create new proposal"} navigationRoute={routes.professorDashboardCreateNewProposal}/>**/}
        <Button color="primary" variant="contained" onClick={() => {navigate(routes.professorDashboardCreateNewProposal)}}>+ Create new proposal</Button>

      </Box>

      <BottomNavbar />
    </div>
  );
};

export default ProfessorDashboardPage;

import React, { useState } from "react";

import BottomNavbar from "../components/BottomNavbar/BottomNavbar";
import LoggedInNavbar from "../components/LoggedInNavbar/LoggedInNavbar";
import DefaultButton from "../components/DefaultButton/DefaultButton";

import routes from "../assets/Routes.json";


import Box from "@mui/material/Box";
import { useUserContext } from "../userContext";


const sidebarWidth = 240;

const ProfessorDashboardPage = () => {
  const {user, logout } = useUserContext();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div>
      <header style={{ display: "flex" }}>
        <LoggedInNavbar
            logout={logout}
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
        <DefaultButton buttonText={"+ Create new proposal"} navigationRoute={routes.professorDashboardCreateNewProposal}/>

      </Box>

      <BottomNavbar />
    </div>
  );
};

export default ProfessorDashboardPage;

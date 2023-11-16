import React, { useState } from "react";

import BottomNavbar from "../components/BottomNavbar/BottomNavbar";
import LoggedInNavbar from "../components/LoggedInNavbar/LoggedInNavbar";
import ThesisProposalsList from "../components/ThesisProposalList/ThesisProposalList";
import { useNavigation } from "react-router-dom";
import DefaultButton from "../components/DefaultButton/DefaultButton";


import Box from "@mui/material/Box";


const sidebarWidth = 240;

const ProfessorDashboardPage = (props) => {
    let user;
    user=props.user;
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div>
      <header style={{ display: "flex" }}>
        <LoggedInNavbar
            logout={props.logout}
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
        {/* Main content 
          <RequestedProposals />
          
        */}
        <DefaultButton buttonText={"+ Create new proposal"} navigationRoute={"/ProfessorDashboard/:professorId/proposal/create "}/>

      </Box>

      <BottomNavbar />
    </div>
  );
};

export default ProfessorDashboardPage;

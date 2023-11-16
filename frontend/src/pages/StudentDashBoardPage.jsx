import React, { useState } from "react";

import BottomNavbar from "../components/BottomNavbar/BottomNavbar";
import LoggedInNavbar from "../components/LoggedInNavbar/LoggedInNavbar";
import RequestedProposals from "../components/RequestedProposalList/RequestedProposalList";
import ThesisProposalsList from "../components/ThesisProposalList/ThesisProposalList";


import Box from "@mui/material/Box";
import {useUserContext} from "../userContext.jsx";


const sidebarWidth = 240;

const StudentDashboardPage = () => {
    const  {logout} = useUserContext();
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
          searchBar={true}
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
        <ThesisProposalsList />
      </Box>

      <BottomNavbar />
    </div>
  );
};

export default StudentDashboardPage;

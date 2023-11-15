import React, { useState } from "react";
import ProposalForm from "../components/ProposalForm/ProposalForm";
import BottomNavbar from "../components/BottomNavbar/BottomNavbar";
import LoggedInNavbar from "../components/LoggedInNavbar/LoggedInNavbar";


import Box from "@mui/material/Box";


const sidebarWidth = 240;

const ProfessorProposalCreationPage = ({userId}) => {

  console.log(userId);
  
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div>
      <header style={{ display: "flex" }}>
        <LoggedInNavbar
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

        <ProposalForm userId={userId}/>
      </Box>

      <BottomNavbar />
    </div>
  );
};

export default ProfessorProposalCreationPage;

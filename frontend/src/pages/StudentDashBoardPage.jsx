import React, { useState } from "react";

import BottomNavbar from "../components/BottomNavbar/BottomNavbar";
import LoggedInNavbar from "../components/LoggedInNavbar/LoggedInNavbar";
import RequestedProposals from "../components/RequestedProposalList/RequestedProposalList";
import ThesisProposalsList from "../components/ThesisProposalList/ThesisProposalList";

const sidebarWidth = 240;

const StudentDashBoardPage = () => {
  
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div >
      
      <header style={{display: "flex"}}>
        <LoggedInNavbar sidebarOpen={sidebarOpen} toggleSidebar={toggleSidebar} sidebarWidth={sidebarWidth}/>
      </header>
      <main style={{marginTop: "7rem", marginBottom: "6rem"}}>
        <RequestedProposals />
        <ThesisProposalsList />
      </main>
      <BottomNavbar />
    </div>
  );
};

export default StudentDashBoardPage;

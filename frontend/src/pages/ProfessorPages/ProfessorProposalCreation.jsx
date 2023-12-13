import React from "react";

import Box from "@mui/material/Box";
import {useUserContext} from "../../contexts"

const ProfessorProposalCreationPage = () => {

  const {userId, } = useUserContext();

  return (
    <Box sx={{marginBottom: "2rem", marginTop: "2rem"}}>
      <h1>Professor Proposal Creation Page</h1>
      <p>Professor ID: {userId}</p>
    </Box>
  );
};

export default ProfessorProposalCreationPage;

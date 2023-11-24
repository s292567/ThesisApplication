import React from "react";

import {ProposalForm,} from "../../components"

import Box from "@mui/material/Box";
import {useUserContext} from "../../contexts"

const ProfessorProposalCreationPage = () => {

  const {userId, } = useUserContext();

  return (
    <Box sx={{marginBottom: "2rem", marginTop: "2rem"}}>
      <ProposalForm userId={userId}/>
    </Box>
  );
};

export default ProfessorProposalCreationPage;

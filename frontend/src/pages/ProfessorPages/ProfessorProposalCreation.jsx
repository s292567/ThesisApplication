import React, {useContext} from "react";

import {ProposalForm,} from "../../components"

import Box from "@mui/material/Box";
import {AuthContext} from "react-oauth2-code-pkce";


const ProfessorProposalCreationPage = () => {

    const {tokenData} = useContext(AuthContext);
    const userId = tokenData.email.split("@")[0];


    return (
    <Box sx={{marginBottom: "2rem", marginTop: "2rem"}}>
      <ProposalForm userId={userId}/>
    </Box>
  );
};

export default ProfessorProposalCreationPage;

// ProfessorDashboardPage.jsx
import React, {useState, useEffect, useContext} from "react";
import { Typography} from "@mui/material";
import {ThesesList, SkeletonThesisList} from "../../components";
import {getAllProposals} from "../../api";
import {AuthContext} from "react-oauth2-code-pkce";

export default function ProfessorDashboardPage() {

  const [proposals, setProposals] = useState(null);
  const{token}=useContext(AuthContext)
  useEffect(() => {
    const fetchProposals = async () => {
      try {

        const response = await getAllProposals(token); // This should be your API call
        setProposals(response);
      } catch (error) {
        console.error("Failed to fetch proposals:", error);
      }
    };

    fetchProposals();
  }, []);


  return (<>
      <Typography variant="h3" color={"orange"} mb={3} mt={3}>Theses preview:</Typography>
      {proposals ? (
        <ThesesList thesesData={proposals.slice(0, 3)} />
      ) : (
        <SkeletonThesisList count={3}/>
      )}
    </>
  );
}

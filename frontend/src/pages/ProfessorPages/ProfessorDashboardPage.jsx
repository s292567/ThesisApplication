// ProfessorDashboardPage.jsx
import React, {useState, useEffect} from "react";
import { Typography} from "@mui/material";
import {ThesesList, SkeletonThesisList} from "../../components";
import {getAllProposals} from "../../api";

export default function ProfessorDashboardPage() {

  const [proposals, setProposals] = useState(null);

  useEffect(() => {
    const fetchProposals = async () => {
      try {
        const response = await getAllProposals(); // This should be your API call
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

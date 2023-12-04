// ProfessorDashboardPage.jsx
import React, {useState, useEffect} from "react";
import {Typography} from "@mui/material";
import {ThesesList, SkeletonThesisList, SectionTitle} from "../../components";
import {getAllProposals} from "../../api";

export default function StudentDashboardPage() {

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
      <SectionTitle text={'Theses Preview:'} />
      {proposals ? (
        <ThesesList thesesData={proposals.slice(0, 3)} view={'displayApply'}/>
      ) : (
        <SkeletonThesisList count={3}/>
      )}
    </>
  );
}

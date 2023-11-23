// ProfessorDashboardPage.jsx
import React, {useState, useEffect} from "react";
import {Typography} from "@mui/material";
import {ThesesList, SkeletonThesisList} from "../../components";
import {getAllProposals} from "../../api";
import {useUserContext} from "../../contexts/index.js";

export default function ThesesPage() {

  const {user} = useUserContext();

  const [proposals, setProposals] = useState(null);

  useEffect(() => {
    const fetchProposals = async () => {
      try {
        let response = undefined;
        /* API CALL BASED ON ROLE */
          (user.role === "Professor" ?
            response = await getAllProposals() : response = await getAllProposals()
          )
        setProposals(response);
      } catch (error) {
        console.error("Failed to fetch proposals:", error);
      }
    };
    fetchProposals();
  }, []);


  return (<>
      <Typography variant="h3" color={"orange"} mb={3} mt={3}>Theses:</Typography>
      {proposals ? (
        <ThesesList thesesData={proposals}/>
      ) : (
        <SkeletonThesisList count={3}/>
      )}
    </>
  );
}



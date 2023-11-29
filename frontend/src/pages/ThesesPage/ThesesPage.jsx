// ProfessorDashboardPage.jsx
import React, {useState, useEffect} from "react";
import {Typography} from "@mui/material";
import {ThesesList, SkeletonThesisList} from "../../components";
import {getAllProposals} from "../../api";
import {useUserContext} from "../../contexts/index.js";

export default function ThesesPage() {

  const {user} = useUserContext();

  const [proposals, setProposals] = useState(null);
  const [dummy, reload] = useState(false)
  useEffect(() => {
    const fetchProposals = async () => {
      try {
        let response;
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
  }, [dummy]);


  return (<>
      <Typography variant="h3" color={"orange"} mb={3} sx={{marginTop: '4rem', marginBottom: '2rem'}}>Theses:</Typography>
      {proposals ? (
        <ThesesList thesesData={proposals} reload={()=>reload(!dummy)}/>
      ) : (
        <SkeletonThesisList count={3}/>
      )}
    </>
  );
}



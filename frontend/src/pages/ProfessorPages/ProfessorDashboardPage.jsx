// ProfessorDashboardPage.jsx
import React, {useState, useEffect} from "react";
import {Box, Typography} from "@mui/material";
import {ThesesList, SkeletonThesisList, SectionTitle} from "../../components";
import { getProposalsByProfessorId} from "../../api";

export default function ProfessorDashboardPage() {

  const [proposals, setProposals] = useState(null);
  const [dummy, reload] = useState(false);

  useEffect(() => {
    const fetchProposals = async () => {
      try {
        return await getProposalsByProfessorId(localStorage.getItem("username"));
      } catch (error) {
        console.error("Failed to fetch proposals:", error);
      }
    };

    fetchProposals().then((data) => {
      if(data.length === 0){
        return <Box sx={{display: "flex", flexDirection: "column", padding: "1rem", marginTop: '3rem'}}>
          <Typography variant='h3' color='darkblue'>No theses found.</Typography>;
        </Box>;
      }else {
        setProposals(data);
      }
    });
  }, [dummy]);

  const refresh=()=>{
    reload((old)=>!old);
  }

  return (<>
      <SectionTitle text={'Theses Preview:'} />
      {proposals ? (
        <ThesesList thesesData={proposals.slice(0, 3)} reload={refresh}/>
      ) : (
        <SkeletonThesisList count={3}/>
      )}
    </>
  );
}

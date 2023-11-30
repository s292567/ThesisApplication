// ProfessorApplicantsPage.jsx is used to render the page for the professor to see the applicants for each proposal
import React, { useEffect, useState } from "react";

import {
  Box,
  Divider,
  ToggleButton,
  ToggleButtonGroup,
  styled,
} from "@mui/material";
import { students, proposals, applications } from "./fakeDatas";
import { groupApplications } from "./groupBy";

import ProfessorApplicants from "./ProfessorApplicants";
import { SkeletonApplicants } from "../../components";
import { getAllApplicationsDataForProfessor } from "../../api";
import {useUserContext} from "../../contexts";
import {getAllApplicationsForLoggedInStudent} from "../../api/API_applications.js";

const StyledToggleButtonGroup = styled(ToggleButtonGroup)({
  justifyContent: "center",
  "& .MuiToggleButtonGroup-grouped": {
    justifyContent: "space-between",
    margin: "2rem",
    fontSize: "large",
    border: "none",
    color: "white",
    backgroundColor: "#B2B5E0",
    "&:hover": {
      backgroundColor: "#B2B5E0",
    },
    "&.Mui-selected": {
      backgroundColor: "#2f1c6a",
      fontWeight: "bold",
      color: "white",
    },
    "&:not(:first-of-type)": {
      borderRadius: "20px",
      marginLeft: "2rem",
    },
    "&:first-of-type": {
      borderRadius: "20px",
    },
  },
});

export default function ProfessorApplicantsPage() {

  const [data, setData] = useState({
    groupedByProposals: [],
    groupedByStudents: [],
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError(null);
      let username=localStorage.getItem("username")
      try {
        // This should be your API call
        return await getAllApplicationsDataForProfessor(username);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData().then(response=>setData(response));
    console.log("data:\n", data);
  }, []);

  if (isLoading) {
    return <SkeletonApplicants count={4} />; 
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  /*
  return (
    <>
      <Box sx={{ display: "flex", flexDirection: "column", padding: "1rem" }}>
        <StyledToggleButtonGroup
          value={groupBy}
          exclusive
          onChange={handleGroupBy}
          aria-label="group by choice"
        >
          <ToggleButton value="proposal">View by Thesis</ToggleButton>
          <ToggleButton value="student">View by student</ToggleButton>
        </StyledToggleButtonGroup>
        <Divider
          orientation="horizontal"
          variant="middle"
          sx={{ bgcolor: "#433F42" }}
        />
      </Box>

      {groupedByProposalArray && groupedByStudentArray ? (
        <ProfessorApplicants
          groupedByProposalArray={
            groupBy === "proposal" ? groupedByProposalArray : null
          }
          groupedByStudentArray={
            groupBy === "student" ? groupedByStudentArray : null
          }
        />
      ) : (
        <SkeletonApplicants count={4} />
      )}
    </>
  );
  */
}

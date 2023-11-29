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
import {getAllApplyingStudentsForProposal} from "../../api/API_applications.js";
import {getAllApplicationsForProposal} from "../../api/API_applications.js";

const StyledToggleButtonGroup = styled(ToggleButtonGroup)({
  justifyContent: "center",
  "& .MuiToggleButtonGroup-grouped": {
    justifyContent: "space-between",
    margin: "2rem",
    fontSize: "large",
    border: "2px solid #03468f",
    backgroundColor: "#ffe0c8",
    "&:hover": {
      backgroundColor: "#ffd0b0",
    },
    "&.Mui-selected": {
      backgroundColor: "#EDBA7C",
      color: "#03468f",
      fontWeight: "bold",
    },
    "&:not(:first-of-type)": {
      borderRadius: "20px",
      marginLeft: "2rem",
      border: "2px solid #03468f",
    },
    "&:first-of-type": {
      borderRadius: "20px",
    },
  },
});

export default function ProfessorApplicantsPage() {
  /*
    const [applications, setApplications] = useState([]);
    const [students, setStudents] = useState([]);
    const [proposals, setProposals] = useState([]);
    */

  const [groupedByProposalArray, setGroupedByProposalArray] = useState(null);
  const [groupedByStudentArray, setGroupedByStudentArray] = useState(null);

  useEffect(() => {
    /**
     * Here async call to the api to get the applications, students and proposals
    */ 

    const { groupedByProposals, groupedByStudents } = groupApplications(
      applications,
      students,
      proposals
    );
  
    setGroupedByProposalArray(groupedByProposals);
    setGroupedByStudentArray(groupedByStudents);
    console.log(groupedByProposals);
  }, []);

  const [groupBy, setGroupBy] = useState("proposal");
  const handleGroupBy = (event, newGroupBy) => {
    if (newGroupBy !== null) {
      setGroupBy(newGroupBy);
    }
  };

  return (
    <>
      <Box sx={{ display: "flex", flexDirection: "column", padding: '1rem'  }}>
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
}

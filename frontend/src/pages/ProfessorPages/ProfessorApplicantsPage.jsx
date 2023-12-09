// ProfessorApplicantsPage.jsx is used to render the page for the professor to see the applicants for each proposal
import React, { useEffect, useState } from "react";

import {
  Box,
  Divider,
  ToggleButton,
  ToggleButtonGroup,
  styled,
  Typography,
} from "@mui/material";

import ProfessorApplicants from "./ProfessorApplicants";
import {
  NoDataDisplayed,
  SectionTitle,
  SkeletonApplicants,
} from "../../components";
import { getAllApplicationsDataForProfessor } from "../../api";

export default function ProfessorApplicantsPage() {
  const [groupBy, setGroupBy] = useState("proposal");

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
      let username = localStorage.getItem("username");
      try {
        // This should be your API call
        return await getAllApplicationsDataForProfessor(username);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData().then((response) => {
      setData(response);
    });
  }, []);

  function handleGroupBy() {
    if (groupBy === "proposal") {
      setGroupBy("student");
    } else {
      setGroupBy("proposal");
    }
  }

  const handleApplicationStatusChange = (proposalId, studentId, action) => {
    setData((prevData) => {
      let updatedGroupedByProposals = [...prevData.groupedByProposals];
      let updatedGroupedByStudents = [...prevData.groupedByStudents];

      if (action === "accept") {
        updatedGroupedByProposals = updatedGroupedByProposals.filter(
          (p) => p.proposal.id !== proposalId
        );
        updatedGroupedByStudents = updatedGroupedByStudents
          .map((studentGroup) => ({
            ...studentGroup,
            proposals: studentGroup.proposals.filter(
              (a) => a.id !== proposalId
            ),
          }))
          .filter((studentGroup) => studentGroup.proposals.length > 0);
      } else if (action === "decline") {
        updatedGroupedByProposals = updatedGroupedByProposals
          .map((proposalGroup) => {
            if (proposalGroup.proposal.id === proposalId) {
              return {
                ...proposalGroup,
                students: proposalGroup.students.filter(
                  (s) => s.id !== studentId
                ),
              };
            }
            return proposalGroup;
          })
          .filter((proposalGroup) => proposalGroup.students.length > 0);

        updatedGroupedByStudents = updatedGroupedByStudents
          .map((studentGroup) => {
            if (studentGroup.student.id === studentId) {
              return {
                ...studentGroup,
                proposals: studentGroup.proposals.filter(
                  (a) => a.id !== proposalId
                ),
              };
            }
            return studentGroup;
          })
          .filter((studentGroup) => studentGroup.proposals.length > 0);
      }

      console.log("ByProposal:\n", updatedGroupedByProposals);
      console.log("ByStudent:\n", updatedGroupedByStudents);

      return {
        ...prevData,
        groupedByProposals: updatedGroupedByProposals,
        groupedByStudents: updatedGroupedByStudents,
      };
    });
  };

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <Box
      sx={{
        display: "flex",
        alignContent: "center",
        flexDirection: "column",
      }}
    >
      <SectionTitle text={"Applicants Page:"} />
      {isLoading ? (
        <SkeletonApplicants count={4} />
      ) : data.groupedByProposals.length === 0 ? (
        <NoDataDisplayed textNoDataDisplayed="No applications available" />
      ) : (
        <>
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
            sx={{
              bgcolor: "#433F42",
              width: { xs: "90%", md: "50%" },
              marginLeft: { xs: "5%", md: "25%" },
            }}
          />
          <ProfessorApplicants
            groupedByProposalArray={
              groupBy === "proposal" ? data.groupedByProposals : null
            }
            groupedByStudentArray={
              groupBy === "student" ? data.groupedByStudents : null
            }
            actions={true}
            onApplicationStatusChange={handleApplicationStatusChange}
          />
        </>
      )}
    </Box>
  );
}

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
      marginLeft: "1rem",
    },
    "&:first-of-type": {
      borderRadius: "20px",
    },
  },
});

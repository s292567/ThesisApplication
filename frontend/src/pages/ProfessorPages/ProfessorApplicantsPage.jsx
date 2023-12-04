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
import { SkeletonApplicants } from "../../components";
import { getAllApplicationsDataForProfessor } from "../../api";

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
  const [groupBy, setGroupBy] = useState("proposal");

  const [data, setData] = useState({
    groupedByProposals: [],
    groupedByStudents: [],
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [dirty, setDirty] = useState(false);

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
  }, [dirty]);
  const refresh = () => {
    setDirty(!dirty);
  };
  if (isLoading) {
    return <SkeletonApplicants count={4} />;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  if (
    data.groupedByProposals.length === 0 &&
    data.groupedByStudents.length === 0
  ) {
    return (
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          padding: "1rem",
          marginTop: "3rem",
        }}
      >
        <Typography variant="h3" color="darkblue">
          No applications found for yours Theses.
        </Typography>
        ;
      </Box>
    );
  }
  function handleGroupBy() {
    if (groupBy === "proposal") {
      setGroupBy("student");
    } else {
      setGroupBy("proposal");
    }
  }

  return (
    <Box sx={{ display: "flex", flexWrap: "wrap", alignContent: "center", flexDirection: "column", }}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          padding: "1rem",
          justifyContent: "center",
          maxWidth: "1000px",
        }}
      >
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

        <ProfessorApplicants
          groupedByProposalArray={
            groupBy === "proposal" ? data.groupedByProposals : null
          }
          groupedByStudentArray={
            groupBy === "student" ? data.groupedByStudents : null
          }
          refresh={refresh}
        />
      </Box>
    </Box>
  );
}

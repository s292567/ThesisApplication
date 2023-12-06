// ProfessorDashboardPage.jsx
import React, { useState, useEffect } from "react";
import {
  ThesesList,
  SkeletonThesisList,
  SectionTitle,
  MyOutlinedButton,
} from "../../components";
import { getAllProposals, getAllApplicationsForLoggedInStudent } from "../../api";
import { useNavigate } from "react-router-dom";
import { useUserContext } from "../../contexts";
import { Box, Divider, Grid } from "@mui/material";
import StudentApplications from "./StudentApplications";
import { SkeletonApplicants } from "../../components";
import { frontendRoutes } from "../../routes";

export default function StudentDashboardPage() {
  const [proposals, setProposals] = useState(null);
  const navigate = useNavigate();
  const { generalRoutes } = useUserContext();
  const [applications, setApplications] = useState(null);

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

    const fetchApplications = async () => {
      let username = localStorage.getItem("username");
      try {
        // This should be your API call
        return await getAllApplicationsForLoggedInStudent(username);
      } catch (error) {
        console.error("Failed to fetch applications:", error);
      }
    };

    fetchApplications().then((response) => setApplications(response));
  }, []);

  return (
    <>
      <Box>
        <SectionTitle text={"Theses Preview:"} />
        {proposals ? (
          <Box>
            <ThesesList
              thesesData={proposals.slice(0, 3)}
              view={"displayApply"}
            />
            <Grid container item justifyContent="center">
              <MyOutlinedButton
                text={"See More Theses"}
                colorBorder={"#003366"}
                colorBorderHover={"#1976d2"}
                style={{ fontSize: "large" }}
                onClick={() => {
                  navigate(generalRoutes.theses);
                }}
              />
            </Grid>
          </Box>
        ) : (
          <SkeletonThesisList count={3} />
        )}
      </Box>
      <Box padding={4} />
      <Divider variant="middle"/>
      <Box>
        <SectionTitle
          text={"Applications preview:"}
          
        />
        {applications ? (
          applications.length === 0 ? (
            <></>
          ) : (
            <Box>
              <StudentApplications applications={applications.slice(0, 2)} />
              <Grid container item justifyContent="center">
                <MyOutlinedButton
                  text={"See More Applications"}
                  colorBorder={"#003366"}
                  colorBorderHover={"#1976d2"}
                  style={{ fontSize: "large" }}
                  onClick={() => {
                    navigate(frontendRoutes.studentApplications);
                  }}
                />
              </Grid>
            </Box>
          )
        ) : (
          <SkeletonApplicants count={2} />
        )}
      </Box>
      <Box padding={4} />
    </>
  );
}

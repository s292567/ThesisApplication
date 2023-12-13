// ProfessorDashboardPage.jsx
import React, { useState, useEffect } from "react";
import { Box, Typography, Grid, Divider } from "@mui/material";
import {
  ThesesList,
  SkeletonThesisList,
  SectionTitle,
  MyOutlinedButton,
  SkeletonApplicants,
  NoDataDisplayed,
} from "../../components";
import {
  getProposalsByProfessorId,
  getAllApplicationsDataForProfessor,
} from "../../api";

import { useNavigate } from "react-router-dom";
import { useUserContext } from "../../contexts";
import ProfessorApplicants from "./ProfessorApplicants";
import { frontendRoutes } from "../../routes";

export default function ProfessorDashboardPage() {
  const [proposals, setProposals] = useState(null);
  const [applicants, setApplicants] = useState(null);

  const navigate = useNavigate();
  const { generalRoutes } = useUserContext();
  let username = localStorage.getItem("username");

  useEffect(() => {
    const fetchProposals = async () => {
      try {
        return await getProposalsByProfessorId(username);
      } catch (error) {
        console.error("Failed to fetch proposals:", error);
      }
    };

    fetchProposals().then((data) => {
      setProposals(data);
    });

    const fetchApplicants = async () => {
      try {
        // This should be your API call
        return await getAllApplicationsDataForProfessor(username);
      } catch (err) {
        console.error("Failed to fetch applicants:", err);
      }
    };

    fetchApplicants().then((response) => {
      setApplicants(response.groupedByStudents);
    });
  }, []);

  return (
    <>
      <Box>
        <SectionTitle text={"Theses Preview:"} />
        {proposals ? (
          proposals.length === 0 ? (
            <>
              <NoDataDisplayed textNoDataDisplayed={"No theses found."} />
            </>
          ) : (
            <Box>
              <ThesesList
                thesesData={proposals.slice(0, 2)}
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
          )
        ) : (
          <SkeletonThesisList count={3} />
        )}
      </Box>
      <Box padding={4} />
      <Divider variant="middle" />
      <Box>
        <SectionTitle text={"Applicants preview:"} />
        {applicants ? (
          applicants.length === 0 ? (
            <>
              <NoDataDisplayed textNoDataDisplayed={"No applicants found."} />
            </>
          ) : (
            <Box>
              <ProfessorApplicants
                groupedByStudentArray={applicants.slice(0, 2)}
              />
              <Grid container item justifyContent="center">
                <MyOutlinedButton
                  text={"See More Applicants"}
                  colorBorder={"#003366"}
                  colorBorderHover={"#1976d2"}
                  style={{ fontSize: "large" }}
                  onClick={() => {
                    navigate(frontendRoutes.professorApplicants);
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

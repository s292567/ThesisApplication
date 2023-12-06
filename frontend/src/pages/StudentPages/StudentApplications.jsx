// ThesesList.jsx
import React, { useState } from "react";
import { PastelComponent, StyledPaper } from "../../components";
import { Box, Grid, Typography } from "@mui/material";
import {ThesisDetail} from "../../components";

const getStatusProperties = (status) => {
  const properties = {
    accepted: { text: "Accepted", color: "#9ADE7B" },
    declined: { text: "Declined", color: "#FF8F8F" },
    pending: { text: "Pending", color: "#39A7FF" },
    default: { text: "Unknown", color: "black" }, // Default properties
  };

  return properties[status] || properties.default;
};

export default function StudentApplications({ applications }) {
  const [detailOpen, setDetailOpen] = useState(false);
  const [selectedThesis, setSelectedThesis] = useState(null);

  const handleOpenDetail = (thesis) => {
    setSelectedThesis(thesis);
    setDetailOpen(true);
  };

  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          flexGrow: 1,
        }}
      >
        <Grid container direction="column" justifyContent="center" spacing={3}>
          <Grid container item justifyContent="center">
            <Grid item xs={10} sm={10} md={8} lg={6} xl={5}>
              <StyledPaper
                elevation={0}
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  "&:hover": {
                    cursor: "default",
                    boxShadow: 0,
                  },
                  paddingBottom: "5px",
                  paddingTop: "20px",
                }}
              >
                <Typography
                  variant="h5"
                  mb={2}
                  sx={{ color: "#2f1c6a", fontWeight: "bold" }}
                >
                  Title
                </Typography>
                <Typography
                  variant="h5"
                  mb={2}
                  sx={{ color: "#2f1c6a", fontWeight: "bold" }}
                >
                  Status
                </Typography>
              </StyledPaper>
            </Grid>
          </Grid>

          {applications.map((application) => {
            const statusProperties = getStatusProperties(application.status);

            return (
              <Grid key={application.id} container item justifyContent="center">
                <Grid item xs={10} sm={10} md={8} lg={6} xl={5}>
                  <StyledPaper
                    elevation={1}
                    onClick={() => handleOpenDetail(application.proposal)}
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "space-between",
                    }}
                  >
                    {/** TITLE/DESCRIPTION SECTION */}
                    <Box>
                      <Typography
                        variant="h4"
                        mb={2}
                        sx={{ color: "#2f1c6a", fontWeight: "bold" }}
                      >
                        {application.proposal.title}
                      </Typography>
                      <PastelComponent
                        text={"View"}
                        textColor={"white"}
                        bgColor={"#94B3FD"}
                        style={{
                          width: "75px",
                          height: "55px",
                          borderRadius: "8px",
                        }}
                        onClick={(event) => {
                          event.stopPropagation();
                          handleOpenDetail(application.proposal);
                        }}
                      />
                    </Box>
                    <PastelComponent
                      text={statusProperties.text}
                      bgColor={statusProperties.color}
                      textColor="white"
                      style={{
                        width: "fit-content",
                        height: "fit-content",
                        alignSelf: "flex-start",
                        marginTop: "5px",
                      }}
                    />
                  </StyledPaper>
                </Grid>
              </Grid>
            );
          })}
        </Grid>
        <Box padding={3}></Box>
      </Box>

      {/** MODAL WITH THE THESIS DETAILS */}
      <ThesisDetail
        open={detailOpen}
        handleClose={() => setDetailOpen(false)}
        thesis={selectedThesis}
      />
    </>
  );
}

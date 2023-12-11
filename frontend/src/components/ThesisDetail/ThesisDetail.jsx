// ThesisDetail.jsx
import React, { useState } from "react";
import { useUserContext } from "../../contexts";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  Divider,
  Paper,
  IconButton,
  Typography,
  Box,
  Grid,
} from "@mui/material";
import { useLocation } from "react-router-dom";
import { Close } from "@mui/icons-material";
import { PastelComponent, WarningPopup } from "../index";
import { frontendRoutes } from "../../routes";
import { applyToProposal, getThesisStatusById } from "../../api";

export default function ThesisDetail({ thesis, open, handleClose }) {
  const { userId, user } = useUserContext();
  const location = useLocation();

  const [alreadyApplied, setAlreadyApplied] = useState(false);
  const [warningOpen, setWarningOpen] = useState(false);

  const formatFullName = (person) => `${person.name} ${person.surname}`;

  const handleApplied = async () => {
    try {
      await applyToProposal({
        studentId: userId,
        proposalId: thesis.id,
      });
      setAlreadyApplied(true);
      // Return a success message
      return "You have successfully applied to this thesis!";
    } catch (error) {
      console.error("Failed to apply:", error);
      // Throw an error with a message to be caught and displayed by the Snackbar
      throw new Error(error.message || "Failed to apply to the thesis.");
    }
  };

  if (!thesis) return null;

  const getThesisStatus = async (proposalId) => {
    try {
      return await getThesisStatusById(proposalId);
    } catch (error) {
      console.error("Failed to retrieve proposal status:", error);
      // Throw an error with a message to be caught and displayed by the Snackbar
      throw new Error(error.message || "Failed to retrieve proposal status.");
    }
  };

  useState(() => {
    thesis.id &&
      getThesisStatus(thesis.id).then((status) => {
        setAlreadyApplied(status);
      });
  }, []);

  const textColor = "#27005D";
  const subTitlesColor = "#40128B";

  return (
    <>
      <Dialog
        open={open}
        onClose={handleClose}
        scroll={"paper"}
        aria-labelledby="thesis-dialog-details"
        aria-describedby="thesis-dialog-details"
        maxWidth="lg"
        fullWidth={true}
        keepMounted={true}
        PaperProps={{
          sx: {
            m: 0,
            p: 1,
            border: "none",
            borderRadius: "20px",
            backgroundColor: "#F4F5FF",
            color: textColor,
          },
        }}
      >
        <DialogTitle>
          <PastelComponent
            bgColor={"white"}
            textColor={textColor}
            text={"valid until: " + thesis.expiration}
            style={{
              padding: "0.3rem 1rem",
              borderRadius: "10px",
              border: "1px solid whitesmoke",
              boxShadow: "0px 0px 10px rgba(0,0,0,0.1)",
              marginBottom: "0.5rem",
            }}
          />
          <PastelComponent
            bgColor={"white"}
            textColor={textColor}
            text={thesis.level}
            style={{
              padding: "0.3rem 1rem",
              borderRadius: "10px",
              border: "1px solid whitesmoke",
              boxShadow: "0px 0px 10px rgba(0,0,0,0.1)",
              marginBottom: "1rem",
            }}
          />

          <Typography mb={2} sx={{ fontSize: "3.2rem" }}>
            <b>{thesis.title}</b>
          </Typography>

          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <Box>
              <Typography variant="body1">
                <b>keywords:</b>
              </Typography>
              <Typography variant="body2" mb={2} color={textColor}>
                {thesis.keywords.join(", ")}
              </Typography>
            </Box>
            {/**
             * APPLY BUTTON SECTION
             */}
            {user.role === "Student" &&
            location.pathname !== frontendRoutes.studentApplications ? (
              !alreadyApplied ? (
                <>
                  <PastelComponent
                    text={"apply"}
                    textColor={"white"}
                    bgColor={"#2192FF"}
                    onClick={() => setWarningOpen(true)}
                    style={{
                      borderRadius: "12px",
                      padding: "0.4rem 1.2rem",
                      fontSize: "1.2rem",
                    }}
                  />
                  <WarningPopup
                    warningOpen={warningOpen}
                    setWarningOpen={setWarningOpen}
                    handleApplied={handleApplied}
                    warningMessage={"Are you sure you want to apply?"}
                  />
                </>
              ) : (
                <PastelComponent
                  text={"applied"}
                  textColor={"white"}
                  bgColor={"#63CE78"}
                  style={{
                    borderRadius: "12px",
                    padding: "0.4rem 1.2rem",
                    fontSize: "1.2rem",
                  }}
                />
              )
            ) : null}
          </Box>
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            position: "absolute",
            right: 24,
            top: 24,
            backgroundColor: "#E90064",
            color: "white",
          }}
        >
          <Close />
        </IconButton>
        <Divider variant="middle" sx={{ marginTop: "-1rem" }} />
        <DialogContent>
          <Paper
            elevation={0}
            sx={{
              padding: "1.5rem",
              borderRadius: "20px",
              border: "1px solid whitesmoke",
              backgroundColor: "white",
              color: textColor,
            }}
          >
            <Grid container spacing={2} mb={2}>
              <Grid item xs={12} container spacing={0}>
                <Grid item xs={12}>
                  <Typography variant="body1">Type:</Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="body1" color={subTitlesColor}>
                    <b>{thesis.type.join(", ")}</b>
                  </Typography>
                </Grid>
              </Grid>
              <Grid item xs={12} container spacing={0}>
                <Grid item xs={12}>
                  <Typography variant="body1">Professor:</Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="body1" color={subTitlesColor}>
                    <b>{formatFullName(thesis.supervisor)}</b>
                  </Typography>
                </Grid>
              </Grid>
              <Grid item xs={12} container spacing={0}>
                <Grid item xs={12}>
                  <Typography variant="body1">CoSupervisor:</Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="body1" color={subTitlesColor}>
                    <b>{thesis.coSupervisors.join(", ")}</b>
                  </Typography>
                </Grid>
              </Grid>
              <Grid item xs={12} container spacing={0}>
                <Grid item xs={12}>
                  <Typography variant="body1">Cds:</Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="body1" color={subTitlesColor}>
                    <b>{thesis.cds.join(", ")}</b>
                  </Typography>
                </Grid>
              </Grid>
            </Grid>

            <Divider sx={{ width: "60%", marginBottom: "2rem" }} />

            <Typography variant="h4" mb={1} color={subTitlesColor}>
              <b>Description</b>
            </Typography>
            <Typography variant="body1" ml={1} mb={5}>
              {thesis.description}
            </Typography>

            <Typography variant="h6" color={subTitlesColor}>
              <b>Departments groups</b>
            </Typography>
            <Typography variant="body1" ml={1} mb={2}>
              {thesis.groups.join(", ")}
            </Typography>

            {thesis.requiredKnowledge ? (
              <>
                <Typography variant="h6" color={subTitlesColor}>
                  <b>Required Knowledge</b>
                </Typography>
                <Typography variant="body1" ml={1} mb={6}>
                  {thesis.requiredKnowledge}
                </Typography>
              </>
            ) : null}

            {thesis.notes ? (
              <Typography variant="body2">
                <strong>Notes: </strong> {thesis.notes}
              </Typography>
            ) : null}
          </Paper>
        </DialogContent>
      </Dialog>
    </>
  );
}

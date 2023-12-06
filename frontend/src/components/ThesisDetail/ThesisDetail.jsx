// ThesisDetail.jsx
import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
  Divider,
  styled,
  useMediaQuery,
} from "@mui/material";

import { applyToProposal } from "../../api/index.js";
import { useUserContext } from "../../contexts/index.js";
import { WarningPopup } from "../index.js";
import { frontendRoutes } from "../../routes/index.js";
import { useLocation } from "react-router-dom";

export default function ThesisDetail({ open, handleClose, thesis }) {
  const { userId, user } = useUserContext();
  const formatFullName = (person) => `${person.name} ${person.surname}`;
  const isMobile = useMediaQuery("(max-width: 600px)");
  const location = useLocation();

  // HERE IN THEORY WE SHOULD CHECK IF THE STUDENT HAS ALREADY APPLIED TO THE THESIS OR NOT THROUGH AN API CALL
  const [ alreadyApplied, setAlreadyApplied ] = useState(false);

  const [warningOpen, setWarningOpen] = useState(false);
  const handleApplied = async () => {
    try {
      const response = await applyToProposal({
        studentId: userId,
        proposalId: thesis.id,
      }); // This should be your API call
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

  return (
    <>
      <MyDialog
        open={open}
        onClose={handleClose}
        scroll={"paper"}
        aria-labelledby="thesis-dialog-title"
        aria-describedby="thesis-dialog-description"
        maxWidth="lg"
        keepMounted={true}
      >
        <DialogTitle
          id="thesis-dialog-title"
          sx={{
            fontSize: "1.9rem",
            fontWeight: "600",
            color: (theme) => theme.palette.primary.dark,
          }}
        >
          {thesis.title}
        </DialogTitle>

        <DialogContent>
          <Box
            sx={{
              display: "flex",
              flexDirection: isMobile ? "column" : "row",
              justifyContent: "space-between",
            }}
          >
            {/* Left Section */}
            <Box
              sx={{
                flex: "1 1 auto",
                flexDirection: isMobile ? "row" : "column",
                marginRight: 2,
                backgroundColor: (theme) => theme.palette.primary.lighter,
                borderRadius: "12px",
              }}
            >
              <TextWrap
                variant="subtitle1"
                color="textPrimary"
                sx={{ fontSize: "1.2rem" }}
              >
                {thesis.type}
              </TextWrap>
              <TextWrap
                variant="subtitle1"
                color="textPrimary"
                sx={{ fontSize: "1.2rem" }}
              >
                {thesis.level}
              </TextWrap>
              <TextWrap variant="body1" sx={{ mt: 1 }}>
                Keywords: {thesis.keywords.join(", ")}
              </TextWrap>
              <TextWrap variant="body1" sx={{ mt: 1 }}>
                Required Knowledge: {thesis.requiredKnowledge}
              </TextWrap>
              <TextWrap variant="body1">
                Expiration: {thesis.expiration}
              </TextWrap>

              {(user.role === "Student" && location.pathname !== frontendRoutes.studentApplications) && (
                <ApplyButton
                  key="lateral"
                  isMobile={isMobile}
                  disabled={alreadyApplied}
                  onCLick={() => setWarningOpen(true)}
                />
              )}
            </Box>

            {/* Right Section */}
            <Divider
              orientation="vertical"
              flexItem
              sx={{ display: isMobile ? "none" : "flex" }}
            />
            <Box sx={{ flex: "1 1 auto", marginLeft: isMobile ? "none" : 2 }}>
              <Box sx={{ fontSize: "1.2rem", fontWeight: "500" }}>
                Supervisor:
                <TextWrap sx={{ maxWidth: "200px" }}>
                  {formatFullName(thesis.supervisor)}
                </TextWrap>
              </Box>
              {thesis.coSupervisors.length > 0 && (
                <Box sx={{ fontSize: "1.2rem", fontWeight: "500" }}>
                  Co-Supervisors:
                  <TextWrap>{thesis.coSupervisors.join(", ")}</TextWrap>
                </Box>
              )}
              <TextWrap mt={4}>
                <Typography
                  gutterBottom
                  sx={{
                    fontSize: "1.8rem",
                    color: (theme) => theme.palette.primary.dark,
                  }}
                >
                  Description:
                </Typography>
                <Typography sx={{ fontSize: "1.1rem" }}>
                  {" "}
                  {thesis.description}{" "}
                </Typography>
              </TextWrap>
              {thesis.notes && (
                <Typography variant="body2" sx={{ mt: 6 }}>
                  <strong>Notes: </strong> {thesis.notes}
                </Typography>
              )}
            </Box>
          </Box>
        </DialogContent>
        <DialogActions
          sx={{ justifyContent: "space-between", alignItems: "flex-end" }}
        >
          {(user.role === "Student" && location.pathname !== frontendRoutes.studentApplications) && (
            <>
              <ApplyButton
                key="lateral"
                isMobile={!isMobile}
                disabled={alreadyApplied}
                onCLick={() => setWarningOpen(true)}
              />
              <WarningPopup
                warningOpen={warningOpen}
                setWarningOpen={setWarningOpen}
                handleApplied={handleApplied}
                warningMessage={"Are you sure you want to apply?"}
              />
            </>
          )}

          <Button onClick={handleClose} color="error" size="large">
            Close
          </Button>
        </DialogActions>
      </MyDialog>
    </>
  );
}

const ApplyButton = ({ isMobile, onCLick, disabled=false }) => {
  return (
    <StyledButton
      size="large"
      onClick={() => onCLick()}
      disabled={disabled}
      sx={{ display: isMobile ? "none" : "block", mt: 2 }}
    >
      Apply
    </StyledButton>
  );
};

const TextWrap = styled(Box)({
  backgroundColor: "whitesmoke",
  borderRadius: "12px",
  padding: "0.3rem 0.8rem",
  marginBottom: "1rem",
  width: "auto",
});

const MyDialog = styled(Dialog)(({ theme }) => ({
  ".MuiPaper-root": {
    zIndex: 2000,
    borderRadius: "20px",
    padding: "2rem",
    backgroundColor: theme.palette.background.paper,
  },
}));

const StyledButton = styled(Button)(({ theme }) => ({
  backgroundColor: theme.palette.primary.dark,
  color: "white",
  "&:hover": {
    backgroundColor: theme.palette.primary.main,
  },
  "&:disabled": {
    backgroundColor: "grey",
  },
  fontWeight: "600",
  textTransform: "none",
  borderRadius: "20px",
  padding: theme.spacing(1, 3),
}));

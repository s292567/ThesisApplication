// WarningPopup.jsx
/* eslint-disable react/prop-types */
// eslint-disable-next-line no-unused-vars
import React, { useState, useCallback } from "react";
import {
  Snackbar,
  Alert,
  styled,
  Dialog,
  DialogTitle,
  Divider,
  DialogContent,
  Typography,
  Box,
} from "@mui/material";
import { WarningRounded } from "@mui/icons-material";

import { PastelComponent } from "../index.js";

export default function WarningPopup({

  warningOpen, // useState to manage the open/close state of the popup
  setWarningOpen, // useState to manage the open/close state of the popup
  handleApplied, // function to be called when the user clicks on "yes" (returns a promise)
  warningMessage, // message to be displayed in the popup
}) {
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");

  const handleCloseSnackbar = useCallback(() => {
    setSnackbarOpen(false);
  }, []);

  const handleYesClick = useCallback(async () => {
    try {
      const message = await handleApplied();
      setSnackbarMessage(message || "Success!");
      setSnackbarSeverity("success");
    } catch (error) {
      setSnackbarMessage(error.message || "Error occurred!");
      setSnackbarSeverity("error");
    } finally {
      setWarningOpen(false);
      setSnackbarOpen(true);
    }
  }, [handleApplied, setWarningOpen]);

  return (
    <>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={2500}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "top", horizontal: "left" }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbarSeverity}
          sx={{
            width: "100%",
            borderRadius: "10px !important",
            padding: "0.7rem 1rem !important",
            backgroundColor:  snackbarSeverity === "success" ? "#a6ff96e8 !important" : "#ffb3b3ed !important" ,
            fontWeight: "bold",
            fontSize: "medium",
          }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>

      {warningOpen && (
        <MyDialog
          key="childModal"
          open={warningOpen}
          onClose={() => setWarningOpen(false)}
          aria-labelledby="warning-modal"
          aria-describedby="warning-modal-description"
          maxWidth="sm"
          keepMounted={true}
          justifycontent="center"
        >
          <DialogTitle
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              color: "#ED174F",
              gap: "10px",
              fontSize: "xx-large",
            }}
          >
            <WarningRounded fontSize="large" /> Warning!
          </DialogTitle>
          <Divider />
          <DialogContent>
            <Typography variant="h6" sx={{ fontWeight: "bold" }}>
              {warningMessage}
            </Typography>
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                gap: "40px",
                justifyContent: "center",
                mt: 4,
              }}
            >
              <PastelComponent
                bgColor="#00B090"
                textColor="white"
                text="yes"
                fontSize="medium"
                style={{ width: "100px" }}
                onClick={handleYesClick}
              />

              <PastelComponent
                bgColor="#ED174F"
                textColor="white"
                text="no"
                fontSize="medium"
                style={{ width: "100px" }}
                onClick={() => {
                  setWarningOpen(false);
                }}
              />
            </Box>
          </DialogContent>
        </MyDialog>
      )}
    </>
  );
}

const MyDialog = styled(Dialog)(() => ({
  ".MuiPaper-root": {
    borderRadius: "20px",
    padding: "2rem",
  },
}));

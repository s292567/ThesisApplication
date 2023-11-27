import React from "react";
import {
  styled,
  Dialog,
  DialogTitle,
  Divider,
  DialogContent,
  Typography,
  Box,
  IconButton,
} from "@mui/material";
import WarningRounded from "@mui/icons-material/WarningRounded";
import Close from "@mui/icons-material/Close"; // Make sure this is the correct import for the Close icon

import { PastelComponent } from "./index.js";

const MyDialog = styled(Dialog)(({ theme }) => ({
  ".MuiPaper-root": {
    borderRadius: "20px",
    padding: "2rem",
    backgroundColor: theme.palette.background.paper,
  },
}));

export default function WarningPopup({
  warningOpen /* This is the boolean that will open the warning popup */,
  handleCloseWarning /* This is the function that closes the warning popup, and open the confirmed poupup */,
  handleApplyed /* This is the function that will be called when the user clicks on the "yes" button in the warning popup */,
  confirmedOpen /* This is the boolean that will open the confirmed popup */,
  handleClose /* This is the function that closes the confirmed popup and so close definitively the popup modal*/,
  msgWarning /* This is the message that will be displayed in the warning popup */,
  msgDone /* This is the message that will be displayed in the confirmed popup */,
}) {
  return (
    <>
      <MyDialog
        key="childModal"
        open={warningOpen}
        onClose={handleCloseWarning}
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
            color: "darkred",
            gap: "10px",
            fontSize: "xx-large",
          }}
        >
          <WarningRounded fontSize="large" /> Warning!
        </DialogTitle>
        <Divider />
        <DialogContent>
          <Typography variant="h6" sx={{fontWeight: 'bold'}}>{msgWarning}</Typography>
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
                bgColor="#ACCEA6"
                textColor="white"
                text="yes"
                fontSize="medium"
                style={{ width: "100px" }}
                onClick={handleApplyed}
              />

              <PastelComponent
                bgColor="#B41632"
                textColor="white"
                text="no"
                fontSize="medium"
                style={{ width: "120px" }}
                onClick={() => {handleCloseWarning()}}
              />
          </Box>
        </DialogContent>
      </MyDialog>

      {/* POPUP WHEN YOU CLICK YES ON THE WARNING POPUP */}
      <MyDialog
        key="child-child-Modal"
        open={confirmedOpen}
        onClose={handleClose}
        aria-labelledby="done-modal"
        maxWidth="sm"
        keepMounted={true}
        justifycontent="center"
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: "30px",
          }}
        >
          <Typography variant="h5" color="primary.dark">
            {msgDone}
          </Typography>
          <IconButton onClick={handleClose}>
            <Close fontSize="xx-large" />
          </IconButton>
        </Box>
      </MyDialog>
    </>
  );
}

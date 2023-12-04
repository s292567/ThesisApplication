// ThesisRow.jsx
import React, { useState } from "react";
import {
  Paper,
  Stack,
  Typography,
  styled,
  Box,
  Alert,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { Delete, EditNoteRounded } from "@mui/icons-material";
import { PastelComponent, ThesisDetail, WarningPopup } from "../index.js";
import { useUserContext } from "../../contexts";

import EditModal from "../EditProposal/Modal.jsx";
import Snackbar from "@mui/material/Snackbar";

const StyledPaper = styled(Paper)(({ theme }) => ({
  maxWidth: "100%",
  backgroundColor: "#F4F5FF",
  padding: "2rem",
  borderRadius: "0.8rem",
  ...theme.typography.body2,
  transition: "box-shadow .3s", // Smooth transition for shadow
  "& button": {
    display: "none",
  },
  "&:hover": {
    cursor: "pointer",
    "& button": { display: "block" },
    boxShadow: theme.shadows[24], // Elevated shadow on hover
  },
}));

export default function ThesisRow({
  thesis,
  reload,
  style = { backgroundColor: "#F4F5FF" },
}) {
  const [thessespage, setThessepage] = useState(true);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [detailOpen, setDetailOpen] = useState(false);
  const [edit, setEdit] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const { user } = useUserContext();

  const [popupProps, setPopupProps] = useState({
    warningOpen: false,
    handleCloseWarning: () =>
      setPopupProps({ ...popupProps, warningOpen: false }),
    handleApplyed: () =>
      setPopupProps({
        ...popupProps,
        warningOpen: false,
        confirmedOpen: true,
      }),
    confirmedOpen: false,
    handleClose: () => setPopupProps({ ...popupProps, confirmedOpen: false }),
    msgWarning: "Are you sure you want to delete THIS thesis?",
    msgDone: "Deleted successfully!",
  });
  const newReload = () => {
    reload();
  };

  const handleOpenDetail = () => {
    setDetailOpen(true);
  };

  setTimeout(() => {
    setSnackbarOpen(false);
  }, 5000);
  const handleCloseDetail = () => {
    setDetailOpen(false);
  };
  return (
    <>
      <StyledPaper elevation={1} onClick={handleOpenDetail} sx={{ ...style }}>
        <Typography
          variant="h4"
          mb={2}
          sx={{ color: "#2f1c6a", fontWeight: "bold" }}
        >
          {thesis.title}
        </Typography>
        <Typography fontSize="large" mb={2}>
          {!isMobile
            ? thesis.description
            : `${thesis.description.substring(0, 90)}...`}
        </Typography>
        {/** Buttons: VIEW, EDIT, DELETE, under the description inside the row */}
        <Stack
          direction="row"
          spacing={2}
          sx={{ display: "flex", justifyContent: "space-between" }}
        >
          <PastelComponent
            text={"View"}
            textColor={"white"}
            bgColor={"#9c8ffc"}
            style={{ width: "75px", height: "55px", borderRadius: "8px" }}
            onClick={(event) => {
              event.stopPropagation();
              handleOpenDetail();
            }}
          />
          {user.role === "Professor" && (
            <Box sx={{ display: "flex", flexDirection: "row", gap: "15px" }}>
              <PastelComponent
                bgColor={"#63ce78"}
                icon={
                  <EditNoteRounded
                    fontSize={"large"}
                    sx={{ marginTop: "2px" }}
                  />
                }
                textColor={"white"}
                style={{ width: "55px", height: "55px", borderRadius: "8px" }}
                onClick={(event) => {
                  event.stopPropagation();
                  setEdit(true);
                }}
              />
              <PastelComponent
                bgColor={"#ff7d36"}
                icon={<Delete fontSize={"large"} sx={{ marginTop: "2px" }} />}
                textColor={"white"}
                style={{ width: "55px", height: "55px", borderRadius: "8px" }}
                onClick={(event) => {
                  event.stopPropagation();
                  setPopupProps({ ...popupProps, warningOpen: true });
                }}
              />
            </Box>
          )}
        </Stack>
      </StyledPaper>

      {/**
       * MODAL TO DO THE POPUP THAT IS DISPLAYING THE DETAILS ABOUT THE THESIS 
       */}
      <ThesisDetail
        open={detailOpen}
        handleClose={handleCloseDetail}
        thesis={thesis}
        page={thessespage}
      />

      {/**
       * EDIT SHOULD BE ACCESSIBLE ONLY IF PROFESSOR 
       */}
      <EditModal
        open={edit}
        setEdit={setEdit}
        setSnackbarOpen={setSnackbarOpen}
        thesis={thesis}
        reload={newReload}
      />
      <Snackbar open={snackbarOpen} sx={{ width: "400px", height: "200px" }}>
        <Alert severity="success" sx={{ width: "100%" }}>
          Update successfully!
        </Alert>
      </Snackbar>

      {/**
       * MUST BE REFORMATTED SO THAT AFTER THE WARNING POPUP IS DISPLAYING ONLY AN ALERT
       */}
      <WarningPopup
        warningOpen={popupProps.warningOpen}
        handleCloseWarning={popupProps.handleCloseWarning}
        handleApplyed={popupProps.handleApplyed}
        confirmedOpen={popupProps.confirmedOpen}
        handleClose={popupProps.handleClose}
        msgWarning={popupProps.msgWarning}
        msgDone={popupProps.msgDone}
      />
    </>
  );
}

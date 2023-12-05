// ThesisRow.jsx
import React, { useState } from "react";
import {
  Paper,
  Stack,
  Typography,
  styled,
  Box,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { Delete, EditNoteRounded } from "@mui/icons-material";
import { PastelComponent, ThesisDetail } from "../index.js";
import { useUserContext } from "../../contexts";

export default function ThesisRow({
  thesis,
  reload,
  actions = false,
  style = { backgroundColor: "#F4F5FF" },
}) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const [detailOpen, setDetailOpen] = useState(false);

  const { user } = useUserContext();

  const newReload = () => {
    reload();
  };

  const handleOpenDetail = () => {
    setDetailOpen(true);
  };

  const handleCloseDetail = () => {
    setDetailOpen(false);
  };

  return (
    <>
      <StyledPaper elevation={1} onClick={handleOpenDetail} sx={{ ...style }}>
        {/** TITLE/DESCRIPTION SECTION */}
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
            bgColor={"#94B3FD"}
            style={{ width: "75px", height: "55px", borderRadius: "8px" }}
            onClick={(event) => {
              event.stopPropagation();
              handleOpenDetail();
            }}
          />
          {user.role === "Professor" && actions && (
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
                  /// EDIT FUNCTION
                }}
              />
              <PastelComponent
                bgColor={"#ff7d36"}
                icon={<Delete fontSize={"large"} sx={{ marginTop: "2px" }} />}
                textColor={"white"}
                style={{ width: "55px", height: "55px", borderRadius: "8px" }}
                onClick={(event) => {
                  event.stopPropagation();
                  /// DELETE FUNCTION
                }}
              />
            </Box>
          )}
        </Stack>
      </StyledPaper>

      {/**
       * MODAL THAT DO THE POPUP WHICH IS DISPLAYING THE DETAILS ABOUT THE THESIS
       */}
      <ThesisDetail
        open={detailOpen}
        handleClose={handleCloseDetail}
        thesis={thesis}
      />

      {/**
       * EDIT SHOULD BE ACCESSIBLE ONLY IF PROFESSOR
       */}

      {/**
       * MUST BE REFORMATTED SO THAT AFTER THE WARNING POPUP IS DISPLAYING ONLY AN ALERT
       */}
    </>
  );
}

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

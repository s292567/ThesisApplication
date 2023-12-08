// ThesisRow.jsx
import React, { useState } from "react";
import { Stack, Typography, Box, useMediaQuery, useTheme } from "@mui/material";
import {
  Delete,
  EditNoteRounded,
  ContentCopyOutlined,
} from "@mui/icons-material";
import {
  PastelComponent,
  ThesisDetail,
  StyledPaper,
  ThesisForm,
  WarningPopup,
} from "../index.js";
import { useUserContext } from "../../contexts";

export default function ThesisRow({
  thesis,
  actions = false,
  style = { backgroundColor: "#F4F5FF" },
  onDelete = () => {},
  onCopy = () => {},
}) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const [detailOpen, setDetailOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false); // EDIT MODAL
  const [warningOpen, setWarningOpen] = useState(false); // DELETE MODAL

  const { user } = useUserContext();

  const handleOpenDetail = () => {
    setDetailOpen(true);
  };

  const handleCloseDetail = () => {
    setDetailOpen(false);
  };

  const abilitateActions = () => {
    if (user.role === "Professor" && actions) return true;
    else return false;
  };

  return (
    <>
      <StyledPaper elevation={1} sx={{ ...style }}>
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
          {abilitateActions() ? (
            <>
              <PastelComponent
                bgColor={"#63ce78"} // Color for the copy button
                icon={<ContentCopyOutlined />} // Replace with your actual copy icon
                textColor={"white"}
                style={{ width: "55px", height: "55px", borderRadius: "8px", top: "0px", right: "0px" }}
                onClick={(event) => {
                  event.stopPropagation();
                  /// COPY FUNCTION  
                }}
              />
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
                    setEditOpen(true);
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
                    setWarningOpen(true);
                  }}
                />
                <ThesisForm
                  open={editOpen}
                  onClose={() => setEditOpen(false)}
                  onSubmit={() => console.log("submitted")}
                  thesis={thesis}
                />
              </Box>

            </>
          ) : null}
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
       * DELETE SHOULD BE ACCESSIBLE ONLY IF PROFESSOR
       */}
      {user.role === "Professor" && actions ? (
        <WarningPopup
          warningMessage={"Are you sure you want to delete this thesis?"}
          warningOpen={warningOpen}
          setWarningOpen={setWarningOpen}
          handleApplied={() => onDelete(thesis.id)}
        />
      ) : null}
    </>
  );
}

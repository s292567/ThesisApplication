// ThesisRow.jsx
import React, { useState } from "react";
import { Stack, Typography, Box, useMediaQuery, useTheme } from "@mui/material";
import {
  Delete,
  EditNoteRounded,
  ContentCopyOutlined,
  ArchiveRounded,
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
  onDelete = (id) => {},
  onCopy = (id) => {},
  onEdit = () => {},
  onArchive = () => {},
}) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const [detailOpen, setDetailOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false); // EDIT MODAL
  const [warningOpen, setWarningOpen] = useState(false); // DELETE MODAL
  const [warningMsg, setWarningMsg] = useState(""); 

  const [actionType, setActionType] = useState(""); // New state to track the action type

  const { user } = useUserContext();

  const handleAction = (type) => {
    setActionType(type);
    if (type === "delete") {
      setWarningMsg("Are you sure you want to delete this thesis?");
    } else if (type === "copy") {
      setWarningMsg("Are you sure you want to copy this thesis?");
    } else if (type === "archive") {
      setWarningMsg("Are you sure you want to archive this thesis?");
    }
    setWarningOpen(true);
  };

  const handleApplied = () => {
    if (actionType === "delete") {
      onDelete(thesis.id);
    } else if (actionType === "copy") {
      onCopy(thesis.id);
    } else if (actionType === "archive") {
      onArchive(thesis.id);
    }
  }; 

  const handleOpenDetail = () => {
    setDetailOpen(true);
  };

  const handleCloseDetail = () => {
    setDetailOpen(false);
  };

  const enableActions = user.role === "Professor" && actions;

  return (
    <>
      <StyledPaper elevation={1} sx={{ ...style, position: "relative" }}>
        {/** TITLE/DESCRIPTION SECTION */}
        <Typography
          variant="h4"
          mb={2}
          sx={{ color: "#2f1c6a", fontWeight: "bold", width: "70%" }}
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
          {enableActions ? (
            <>
              <PastelComponent
                textColor={"white"}
                icon={
                  <ContentCopyOutlined
                    fontSize="medium"
                    sx={{ marginTop: "8px" }}
                  />
                }
                bgColor={"#2192FF"}
                style={{
                  width: "55px",
                  height: "55px",
                  borderRadius: "8px",
                  position: "absolute",
                  right: "2rem",
                  top: "2rem",
                }}
                onClick={(event) => {
                  event.stopPropagation();
                  /// COPY FUNCTION
                  handleAction("copy");
                }}
              />
              <Box sx={{ display: "flex", flexDirection: "row", gap: "15px" }}>
                
                <PastelComponent
                  bgColor={"darkblue"}
                  icon={<ArchiveRounded fontSize="large" sx={{ marginTop: "3px" }} />}
                  textColor={"white"}
                  style={{ width: "auto", height: "55px", borderRadius: "8px" }}
                  onClick={(event) => {
                    event.stopPropagation();
                    /// ARCHIVE FUNCTION
                    handleAction("archive");
                  }}
                />
                <PastelComponent
                  bgColor={"#63ce78"}
                  icon={
                    <EditNoteRounded
                      fontSize="large"
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
                  icon={<Delete fontSize="large" sx={{ marginTop: "2px" }} />}
                  textColor={"white"}
                  style={{ width: "55px", height: "55px", borderRadius: "8px" }}
                  onClick={(event) => {
                    event.stopPropagation();
                    /// DELETE FUNCTION
                    handleAction("delete");
                  }}
                />
                {/**
                 * EDIT MODAL WITH THE FORM
                 */}
                {editOpen ? (
                  <ThesisForm
                    open={editOpen}
                    onClose={() => setEditOpen(false)}
                    onSubmit={onEdit}
                    thesis={thesis}
                  />
                ) : null}
              </Box>
            </>
          ) : null}
        </Stack>
      </StyledPaper>

      {/**
       * MODAL THAT DO THE POPUP WHICH IS DISPLAYING THE DETAILS ABOUT THE THESIS
       */}
      {detailOpen ? (
        <ThesisDetail
          open={detailOpen}
          handleClose={handleCloseDetail}
          thesis={thesis}
          onEdit={enableActions ? onEdit : null}
          onDelete={enableActions ? onDelete : null}
          onCopy={enableActions ? onCopy : null}
          onArchive={enableActions ? onArchive : null}
        />
      ) : null}

      {/**
       * DELETE SHOULD BE ACCESSIBLE ONLY IF PROFESSOR
       */}
      {user.role === "Professor" && actions ? (
        <WarningPopup
          warningMessage={warningMsg}
          warningOpen={warningOpen}
          setWarningOpen={setWarningOpen}
          handleApplied={handleApplied}
        />
      ) : null}
    </>
  );
}

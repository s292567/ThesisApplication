import React, {useContext, useEffect, useState} from "react";
import {
  useTheme,
  useMediaQuery,
  Box,
  Card,
  CardContent,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  IconButton,
  Collapse,
  CardHeader,
} from "@mui/material";
import {
  KeyboardArrowDownRounded,
  KeyboardArrowUpRounded,
} from "@mui/icons-material";

import { PastelComponent, ThesisRow } from "../../components";
import { WarningPopup, WithTooltip } from "../../components";
import {acceptApplication, declineApplication} from "../../api/API_applications.js";
import {useUserContext} from "../../contexts/index.js";

export default function ProfessorApplicants({
  groupedByProposalArray,
  groupedByStudentArray,
    refresh
}) {
  const [showApplicants, setShowApplicants] = useState({});
  const [action, setAction] = useState(""); // ["accept", "decline"]
  const [studentId, setStudentId] = useState("")
  const [proposalId, setProposalId] = useState("")

  /**
   * Warning Popup States and Handlers
   */
  const [warningOpen, setWarningOpen] = useState(false);
  const [confirmedOpen, setConfirmedOpen] = useState(false);
  const [msgWarning, setMsgWarning] = useState("");
  const [msgDone, setMsgDone] = useState("");
  const {userId}=useUserContext()

  useEffect(() => {

  }, []);

  const handleCloseWarning = () => {
    setWarningOpen(false);
  };

  const handleCloseConfirmed = () => {
    setConfirmedOpen(false);
  };

  const handleApplyed = () => {
    /**
     * ASYNC API CALL FUNCTION HERE !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
     */
    if(action === "accept"){
      acceptApplication(proposalId, studentId, userId)
      // API CALL HERE TO ACCEPT !!!!!!!!
    }else if(action === "decline"){
      declineApplication(proposalId, studentId, userId)
      // API CALL HERE TO DECLINE !!!!!!!!
    }
    setWarningOpen(false);
    setConfirmedOpen(true);
    setMsgDone("Application successfully processed.");
    refresh()
  };

  const handleAccept = (proposalId, studentId) => {
    setAction("accept");
    setProposalId(proposalId);
    setStudentId(studentId);
    setMsgWarning("Are you sure you want to accept this application?");
    setWarningOpen(true);
  };

  const handleDecline = (proposalId, studentId) => {
    setAction("decline");
    setProposalId(proposalId);
    setStudentId(studentId);
    console.log("ProposalId: "+proposalId +"StudentId: "+studentId);
    setMsgWarning("Are you sure you want to decline this application?");
    setWarningOpen(true);
  };

  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const isMediumScreen = useMediaQuery(theme.breakpoints.between("sm", "md"));

  // Toggle function for showing/hiding applicants on each proposal
  const toggleApplicants = (id) => {
    setShowApplicants((prevShow) => ({
      ...prevShow,
      [id]: !prevShow[id],
    }));
  };

  // Render the table head with field names based on screen size
  const renderTableHead = () => (
    <TableHead>
      <TableRow sx={{ "& .MuiTableCell-root": { fontWeight: "bold" } }}>
        {groupedByStudentArray ? (
          <TableCell>Proposal Title</TableCell>
        ) : (
          <TableCell>Student Name</TableCell>
        )}
        {(!isSmallScreen || isMediumScreen) && !groupedByStudentArray && (
          <TableCell>Student Email</TableCell>
        )}
        {!isSmallScreen && !isMediumScreen && !groupedByStudentArray && (
          <TableCell>Student Degree</TableCell>
        )}
        <TableCell>Status</TableCell>
      </TableRow>
    </TableHead>
  );

  // Render the table rows with applicant information based on screen size
  const renderTableRows = (items, isStudentGrouping, mainId) => (
    <TableBody>
      {items.map((item, index) => (
        <TableRow
          key={index}
          sx={{
            "&:last-child td, &:last-child th": {
              border: 0,
            },
            "& .MuiTableCell-root": {
              fontSize: "large",
              color: '#2f1c6a',
            },
          }}
        >
          <TableCell
            sx={{
              fontWeight: "bolder" ,
            }}
          >
            {isStudentGrouping ? (
              <WithTooltip
                tooltipContent={<ThesisRow thesis={item} style={{backgroundColor: 'white'}}/>}
                children={item.title}
              />
            ) : (
              item.name + " " + item.surname
            )}
          </TableCell>

          {(!isSmallScreen || isMediumScreen) && !isStudentGrouping && (
            <TableCell>{item.email}</TableCell>
          )}
          {!isSmallScreen && !isMediumScreen && !isStudentGrouping && (
            <TableCell>{item.codDegree}</TableCell>
          )}
          <TableCell>
            {/* Buttons or status indicators */}
            <Stack direction={isSmallScreen ? "column" : "row"} spacing={1}>
              <PastelComponent
                bgColor="#00B090"
                textColor="white"
                text="accept"
                fontSize="medium"
                style={{maxWidth: '130px'}}
                onClick={(event) => {
                  event.stopPropagation();
                  /* Accept logic here */
                  if (!isStudentGrouping)
                    handleAccept(mainId, item.id);
                  else
                    handleAccept(item.id, mainId);
                }}
              />

              <PastelComponent
                bgColor="#ED174F"
                textColor="white"
                text="decline"
                fontSize="medium"
                style={{maxWidth: '130px'}}
                onClick={(event) => {
                  event.stopPropagation();
                  /* Decline logic here */
                  if (!isStudentGrouping)
                    handleDecline(mainId, item.id);
                  else
                    handleDecline(item.id, mainId);
                }}
              />
            </Stack>
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
  );

  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "20px",
          padding: isSmallScreen ? "0.5rem" : isMediumScreen ? "2rem" : "4rem",
          height: "max-content",
        }}
      >
        {(groupedByStudentArray || groupedByProposalArray).map((item) => (
          <Card
            key={groupedByStudentArray ? item.student.id : item.proposal.id }
            variant="outlined"
            sx={{
              maxWidth: "1000px",
              borderRadius: "18px",
              padding: "1rem",
              display: "flex",
              flex: 1,
              flexDirection: "column",
              backgroundColor: "#F4F5FF",
              border: "none",
              transition: "background-color 0.3s",
              "&:hover": {
                boxShadow: "0px 0px 10px 0px rgba(0,0,0,0.3)",
              },
              cursor: "pointer",
            }}
          >
            <CardHeader
              title={
                groupedByStudentArray ? (
                  <>
                    <Typography
                      variant="h4"
                      sx={{ fontWeight: "bold", marginRight: "1rem", color: "#2f1c6a", }}
                    >
                      {item.student.name + " " + item.student.surname}
                    </Typography>
                    <Typography variant="body1">{`${item.student.email} - ${item.student.codDegree}`}</Typography>
                  </>
                ) : (
                  <WithTooltip
                    tooltipContent={<ThesisRow thesis={item.proposal} style={{backgroundColor: 'white'}} />}
                    children={
                      <Typography
                        variant="h4"
                        sx={{
                          fontWeight: "bold",
                          color: "#2f1c6a",
                          marginRight: "1rem",
                        }}
                      >
                        {item.proposal.title}
                      </Typography>
                    }
                  />
                )
              }
              action={
                <IconButton
                  size="large"
                  sx={{
                    color: "white",
                    backgroundColor: "#2f1c6a",
                    padding: "12px",
                    borderRadius: "15px",
                    "&:hover": {
                      backgroundColor: "#B2B5E0",
                    },
                    height: "48px",
                    display: "inline-flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                  onClick={() =>
                    toggleApplicants(
                      groupedByStudentArray ? item.student.id : item.proposal.id
                    )
                  }
                >
                  {showApplicants[
                    groupedByStudentArray ? item.student.id : item.proposal.id
                  ] ? (
                    <KeyboardArrowUpRounded />
                  ) : (
                    <KeyboardArrowDownRounded />
                  )}
                  <Typography
                    variant="body1"
                    sx={{ marginLeft: "8px", fontWeight: "bold" }}
                  >
                    {groupedByStudentArray
                      ? item.proposals.length
                      : item.students.length}
                  </Typography>
                </IconButton>
              }
              sx={{
                display: "flex",
                alignItems: "center",
                alignContent: "center",
                verticalAlign: "middle",
                "& .MuiCardHeader-action": {
                  display: "flex",
                  alignSelf: "center",
                },
              }}
            />

            { /* Card content is displaying the table */ }
            <CardContent>
              <Collapse
                in={
                  showApplicants[
                    groupedByStudentArray ? item.student.id : item.proposal.id
                  ]
                }
              >
                <TableContainer>
                  <Table>
                    {renderTableHead()}
                    {renderTableRows(
                      groupedByStudentArray
                        ? item.proposals
                        : item.students,
                      !!groupedByStudentArray,
                        groupedByStudentArray
                            ? item.student.id
                            : item.proposal.id,
                    )}
                  </Table>
                </TableContainer>
              </Collapse>
            </CardContent>
          </Card>
        ))}
        <WarningPopup
          warningOpen={warningOpen}
          handleCloseWarning={handleCloseWarning}
          confirmedOpen={confirmedOpen}
          handleClose={handleCloseConfirmed}
          msgWarning={msgWarning}
          msgDone={msgDone}
          handleApplyed={handleApplyed}
        />
      </Box>
    </>
  );
}

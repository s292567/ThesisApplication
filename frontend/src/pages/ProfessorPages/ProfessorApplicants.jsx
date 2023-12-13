// ProfessorApplicants.jsx is the component that renders the logic for the table of applicants
import React, { useState } from "react";
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
  Grid,
} from "@mui/material";
import {
  InfoRounded,
  KeyboardArrowDownRounded,
  KeyboardArrowUpRounded,
} from "@mui/icons-material";

import { PastelComponent, ThesisRow } from "../../components";
import { WarningPopup, WithTooltip } from "../../components";
import {
  acceptApplication,
  declineApplication,
} from "../../api/API_applications.js";
import { useUserContext } from "../../contexts/index.js";

export default function ProfessorApplicants({
  groupedByProposalArray = null,
  groupedByStudentArray = null,
  actions = false,
  onApplicationStatusChange = () => {},
}) {
  const [showApplicants, setShowApplicants] = useState({});
  const [action, setAction] = useState(""); // ["accept", "decline"]
  const [IDs, setIDs] = useState({
    proposalId: "",
    studentId: "",
  }); // { proposalId, studentId }
  const { userId } = useUserContext();
  const [warningOpen, setWarningOpen] = useState(false);
  const [msgWarning, setMsgWarning] = useState("");

  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const isMediumScreen = useMediaQuery(theme.breakpoints.between("sm", "md"));

  const handleApplied = async () => {
    try {
      if (action === "accept") {
        await acceptApplication(IDs.proposalId, IDs.studentId, userId);
        onApplicationStatusChange(
          IDs.proposalId,
          IDs.studentId,
          "accept"
        );
        return "Application successfully ACCEPTED.";
      } else if (action === "decline") {
        await declineApplication(IDs.proposalId, IDs.studentId, userId);
        onApplicationStatusChange(
          IDs.proposalId,
          IDs.studentId,
          "decline"
        );
        return "Application successfully DECLINED.";
      }
    } catch (error) {
      console.error("Error processing application:", error);
      throw new Error("Failed to process the application.");
    }
  };

  const handleAccept = (proposalId, studentId) => {
    setAction("accept");
    setIDs({ proposalId, studentId });
    setMsgWarning("Are you sure you want to accept this application?");
    setWarningOpen(true);
  };
  const handleDecline = (proposalId, studentId) => {
    setAction("decline");
    setIDs({ proposalId, studentId });
    setMsgWarning("Are you sure you want to decline this application?");
    setWarningOpen(true);
  };

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
        {actions ? <TableCell>Status</TableCell> : null}
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
              color: "#2f1c6a",
            },
          }}
        >
          <TableCell
            sx={{
              fontWeight: "bolder",
            }}
          >
            {isStudentGrouping ? (
              <>
                <WithTooltip
                  tooltipContent={
                    <ThesisRow
                      thesis={item}
                      style={{ backgroundColor: "white" }}
                    />
                  }
                  children={
                    <>
                      {item.title}{" "}
                      <InfoRounded
                        sx={{ justifyContent: "center", marginLeft: "0.1rem" }}
                      />{" "}
                    </>
                  }
                />
              </>
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
          {actions ? (
            <TableCell>
              {/* Buttons or status indicators */}
              <Stack direction={isSmallScreen ? "column" : "row"} spacing={1}>
                <PastelComponent
                  bgColor="#00B090"
                  textColor="white"
                  text="accept"
                  fontSize="medium"
                  style={{ maxWidth: "130px" }}
                  onClick={(event) => {
                    event.stopPropagation();
                    /* Accept logic here */
                    if (!isStudentGrouping) handleAccept(mainId, item.id);
                    else handleAccept(item.id, mainId);
                  }}
                />

                <PastelComponent
                  bgColor="#ED174F"
                  textColor="white"
                  text="decline"
                  fontSize="medium"
                  style={{ maxWidth: "130px" }}
                  onClick={(event) => {
                    event.stopPropagation();
                    /* Decline logic here */
                    if (!isStudentGrouping) handleDecline(mainId, item.id);
                    else handleDecline(item.id, mainId);
                  }}
                />
              </Stack>
            </TableCell>
          ) : null}
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
          padding: isSmallScreen ? "1rem" : isMediumScreen ? "2rem" : "4rem",
          paddingTop: "2rem",
          height: "max-content",
        }}
      >
        <Grid container direction="column" justifyContent="center" spacing={3}>
          {(groupedByStudentArray || groupedByProposalArray).map((item) => (
            <Grid
              container
              item
              justifyContent="center"
              key={groupedByStudentArray ? item.student.id : item.proposal.id}
            >
              <Grid item xs={10} sm={10} md={10} lg={8} xl={6}>
                <Card
                  variant="outlined"
                  sx={{
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
                            sx={{
                              fontWeight: "bold",
                              marginRight: "1rem",
                              color: "#2f1c6a",
                            }}
                          >
                            {item.student.name + " " + item.student.surname}
                          </Typography>
                          <Typography variant="body1">{`${item.student.email} - ${item.student.codDegree}`}</Typography>
                        </>
                      ) : (
                        <>
                          <WithTooltip
                            tooltipContent={
                              <ThesisRow
                                thesis={item.proposal}
                                style={{ backgroundColor: "white" }}
                              />
                            }
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
                                <InfoRounded sx={{ marginLeft: "0.5rem" }} />
                              </Typography>
                            }
                          />
                        </>
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
                            groupedByStudentArray
                              ? item.student.id
                              : item.proposal.id
                          )
                        }
                      >
                        {showApplicants[
                          groupedByStudentArray
                            ? item.student.id
                            : item.proposal.id
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

                  {/* Card content is displaying the table */}
                  <CardContent>
                    <Collapse
                      in={
                        showApplicants[
                          groupedByStudentArray
                            ? item.student.id
                            : item.proposal.id
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
                              : item.proposal.id
                          )}
                        </Table>
                      </TableContainer>
                    </Collapse>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          ))}
        </Grid>
        <WarningPopup
          warningOpen={warningOpen}
          setWarningOpen={setWarningOpen}
          handleApplied={handleApplied}
          warningMessage={msgWarning}
        />
      </Box>
    </>
  );
}

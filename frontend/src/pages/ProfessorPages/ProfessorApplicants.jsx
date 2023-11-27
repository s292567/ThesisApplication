import React, {useState} from "react";
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
  Tooltip,
} from "@mui/material";
import {
  KeyboardArrowDownRounded,
  KeyboardArrowUpRounded,
} from "@mui/icons-material";

import {PastelComponent} from "../../components";
import {WarningPopup} from "../../components";

export default function ProfessorApplicants({
                                              groupedByProposalArray,
                                              groupedByStudentArray,
                                            }) {
  const [showApplicants, setShowApplicants] = useState({});

  /**
   * Warning Popup States and Handlers
   */
  const [warningOpen, setWarningOpen] = useState(false);
  const [confirmedOpen, setConfirmedOpen] = useState(false);
  const [msgWarning, setMsgWarning] = useState("");
  const [msgDone, setMsgDone] = useState("");

  const handleCloseWarning = () => {
    setWarningOpen(false);
  };

  const handleCloseConfirmed = () => {
    setConfirmedOpen(false);
  };

  const handleApplyed = () => {
    // Logic after accepting the warning popup
    // Logic for modifying the application of the Student so that the groupBy list is changed

    /**
     * ASYNC API CALL FUNCTION HERE !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
     */

    setWarningOpen(false);
    setConfirmedOpen(true);
    setMsgDone("Application successfully processed.");
  };

  const handleAccept = () => {
    setMsgWarning("Are you sure you want to accept this application?");
    setWarningOpen(true);
  };

  const handleDecline = () => {
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
      <TableRow sx={{"& .MuiTableCell-root": {fontWeight: "bold"}}}>

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
  const renderTableRows = (items, isStudentGrouping) => (
    <TableBody>
      {items.map((item) => (
        <TableRow
          key={isStudentGrouping ? item.proposal_id : item.student_id}
          sx={{
            "&:last-child td, &:last-child th": {
              border: 0,
            },
            "& .MuiTableCell-root": {
              fontSize: "medium",
            },
          }}
        >
          <Tooltip title={ isStudentGrouping ? 'Thesis Title' : 'Student name'}>
            <TableCell
              sx={{
                fontWeight: isStudentGrouping ? "bolder" : "inherit",
                color: isStudentGrouping ? "#03468f" : "black",
              }}
            >
              {isStudentGrouping ? item.proposal_title : item.student_name}
            </TableCell>
          </Tooltip>
          {(!isSmallScreen || isMediumScreen) && !isStudentGrouping && (
            <TableCell>{item.student_email}</TableCell>
          )}
          {!isSmallScreen && !isMediumScreen && !isStudentGrouping && (
            <TableCell>{item.student_degree}</TableCell>
          )}
          <TableCell>
            {/* Buttons or status indicators */}
            <Stack direction={isSmallScreen ? "column" : "row"} spacing={1}>
              <PastelComponent
                bgColor="#ACCEA6"
                textColor="white"
                text="accept"
                fontSize="medium"
                onClick={(event) => {
                  event.stopPropagation();
                  /* Accept logic here */
                  handleAccept();
                }}
              />

              <PastelComponent
                bgColor="#B41632"
                textColor="white"
                text="decline"
                fontSize="medium"
                onClick={(event) => {
                  event.stopPropagation();
                  /* Decline logic here */
                  handleDecline();
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
            key={groupedByStudentArray ? item.student_id : item.proposal_id}
            variant="outlined"
            sx={{
              maxWidth: "1000px",
              borderRadius: "18px",
              padding: "1rem",
              display: "flex",
              flex: 1,
              flexDirection: "column",
              backgroundColor: "white",
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
                      sx={{fontWeight: "bold", marginRight: "1rem"}}
                    >
                      {item.student_name}
                    </Typography>
                    <Typography variant="body1">{`${item.student_email} - ${item.student_degree}`}</Typography>
                  </>
                ) : (
                  <Typography
                    variant="h4"
                    sx={{
                      fontWeight: "bold",
                      color: "#03468f",
                      marginRight: "1rem",
                    }}
                  >
                    {item.proposal_title}
                  </Typography>
                )
              }
              action={
                <IconButton
                  size="large"
                  sx={{
                    color: "#03468f",
                    backgroundColor: "#ffe0c8",
                    padding: "12px",
                    borderRadius: "15px",
                    "&:hover": {
                      backgroundColor: "#ffd0b0",
                    },
                    height: "48px",
                    display: "inline-flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  {showApplicants[
                    groupedByStudentArray ? item.student_id : item.proposal_id
                    ] ? (
                    <KeyboardArrowUpRounded/>
                  ) : (
                    <KeyboardArrowDownRounded/>
                  )}
                  <Typography
                    variant="body1"
                    sx={{marginLeft: "8px", fontWeight: "bold"}}
                  >
                    {groupedByStudentArray
                      ? item.applications.length
                      : item.applicants.length}
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
              onClick={() =>
                toggleApplicants(
                  groupedByStudentArray ? item.student_id : item.proposal_id
                )
              }
            />
            <CardContent>
              <Collapse
                in={
                  showApplicants[
                    groupedByStudentArray ? item.student_id : item.proposal_id
                    ]
                }
              >
                <TableContainer>
                  <Table>
                    {renderTableHead()}
                    {renderTableRows(
                      groupedByStudentArray
                        ? item.applications
                        : item.applicants,
                      !!groupedByStudentArray
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

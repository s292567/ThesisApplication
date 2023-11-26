import React, { useState } from "react";
import {
  useTheme,
  useMediaQuery,
  Box,
  Card,
  CardContent,
  Button,
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
import VisibilityIcon from "@mui/icons-material/Visibility";
import { KeyboardArrowDownRounded, KeyboardArrowUpRounded } from "@mui/icons-material";
import { PastelComponent } from "../../components";

export default function ProfessorApplicants({
  groupedByProposalArray,
  groupedByStudentArray,
}) {
  const [showApplicants, setShowApplicants] = useState({});

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
        {groupedByStudentArray ? <TableCell>Proposal Title</TableCell> : <TableCell>Student Name</TableCell>}
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
        <TableRow key={isStudentGrouping ? item.proposal_id : item.student_id}>
          <TableCell>{isStudentGrouping ? item.proposal_title : item.student_name}</TableCell>
          {(!isSmallScreen || isMediumScreen) && !isStudentGrouping && (
            <TableCell>{item.student_email}</TableCell>
          )}
          {!isSmallScreen && !isMediumScreen && !isStudentGrouping && (
            <TableCell>{item.student_degree}</TableCell>
          )}
          <TableCell>
            <Stack direction={isSmallScreen ? "column" : "row"} spacing={1}>
              <Button variant="outlined" color="success">Accept</Button>
              <Button variant="outlined" color="error">Decline</Button>
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
          padding: isSmallScreen ? "1rem" : isMediumScreen ? "2rem" : "4rem",
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
              backgroundColor: "white",
              transition: "background-color 0.3s",
              "&:hover": {
                boxShadow: "0px 0px 10px 0px rgba(0,0,0,0.3)",
              },
              cursor: "pointer",
            }}
            onClick={() => toggleApplicants(groupedByStudentArray ? item.student_id : item.proposal_id)}
          >
            <CardHeader
              title={
                groupedByStudentArray ? (
                  <>
                    <Typography variant="h5" sx={{ fontWeight: "bold" }}>{item.student_name}</Typography>
                    <Typography variant="body1">{`${item.student_email} - ${item.student_degree}`}</Typography>
                  </>
                ) : (
                  <Typography variant="h4" sx={{ fontWeight: "bold", color: "#03468f" }}>{item.proposal_title}</Typography>
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
                  onClick={(event) => {
                    event.stopPropagation();
                    toggleApplicants(groupedByStudentArray ? item.student_id : item.proposal_id);
                  }}
                >
                  {showApplicants[groupedByStudentArray ? item.student_id : item.proposal_id] ? <KeyboardArrowUpRounded /> : <KeyboardArrowDownRounded />}
                  <Typography variant="body1" sx={{ marginLeft: "8px", fontWeight: "bold" }}>
                    {groupedByStudentArray ? item.applications.length : item.applicants.length}
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
            <CardContent>
              <Collapse in={showApplicants[groupedByStudentArray ? item.student_id : item.proposal_id]}>
                <TableContainer>
                  <Table>
                    {renderTableHead()}
                    {renderTableRows(groupedByStudentArray ? item.applications : item.applicants, !!groupedByStudentArray)}
                  </Table>
                </TableContainer>
              </Collapse>
            </CardContent>
          </Card>
        ))}
      </Box>
    </>
  );
}

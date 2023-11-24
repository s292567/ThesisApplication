import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Divider,
  Paper,
  Stack,
  styled,
  Typography,
} from "@mui/material";
import { MyOutlinedButton } from "../../components/index.js";

const MyPaperWrap = styled(Paper)(({ theme }) => ({
  width: "100%",
  padding: "2rem",
  borderRadius: "18px",
}));

export default function ProfessorApplicantsPage() {
  /*
  const [applications, setApplications] = useState([]);
  const [students, setStudents] = useState([]);
  const [proposals, setProposals] = useState([]);
  */
  let groupedByProposalArray = [];
  let groupedByStudentArray = [];

  const combinedListTmp = applications.map((application) => {
    const student = students.find((s) => s.id === application.student_id);
    const proposal = proposals.find((p) => p.id === application.proposal_id);

    return {
      application_id: application.id,
      student_id: application.student_id,
      student_name: student ? `${student.name} ${student.surname}` : "Unknown",
      proposal_id: application.proposal_id,
      proposal_title: proposal ? proposal.title : "Unknown",
      status_application_student: application.status,
    };
  });

  console.log(combinedListTmp);

  const groupedByProposal = combinedListTmp.reduce((acc, item) => {
    if (!acc[item.proposal_id]) {
      acc[item.proposal_id] = {
        proposal_id: item.proposal_id,
        proposal_title: item.proposal_title,
        applicants: [],
      };
    }

    acc[item.proposal_id].applicants.push({
      student_id: item.student_id,
      student_name: item.student_name,
      status_application_student: item.status_application_student,
    });

    return acc;
  }, {});

  groupedByProposalArray = Object.values(groupedByProposal);
  console.log(groupedByProposalArray);

  const groupedByStudent = combinedListTmp.reduce((acc, item) => {
    if (!acc[item.student_id]) {
      acc[item.student_id] = {
        student_id: item.student_id,
        student_name: item.student_name,
        applications: [],
      };
    }

    acc[item.student_id].applications.push({
      proposal_id: item.proposal_id,
      proposal_title: item.proposal_title,
      status: item.status_application_student,
    });

    return acc;
  }, {});

  groupedByStudentArray = Object.values(groupedByStudent);
  console.log(groupedByStudentArray);

  const [combinedList, setCombinedList] = useState(groupedByStudentArray);

  const handleClicked = () => {
    console.log("clicked");
  };

  return (
    <Box
      sx={{
        dipslay: "flex",
        marginTop: "2rem",
        marginBottom: "2rem",
        padding: "4rem",
        height: "100vh",
        flexGrow: "1",
      }}
    >
      <Stack
        direction="column"
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: "20px",
          flexGrow: "1",
        }}
      >
        {groupedByProposalArray.map((application) => {
          return (
            <MyPaperWrap key={application.proposal_id} elevation={3}>
              <Stack
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  flexDirection: { md: "row", xs: "column" },
                }}
              >
                {/* Thesis Title */}
                <Typography
                  variant="h5"
                  sx={{
                    fontWeight: "bold",
                    color: "#03468f",
                    textDecoration: "underline",
                    textDecorationColor: "orange",
                    marginBottom: { "(maxWidth: 950px)": 0, xs: 3 },
                  }}
                >
                  {application.proposal_title}
                </Typography>

                {/* Mapped to the number of students */}
                <Stack
                  direction="column"
                  spacign={5}
                  sx={{ alignItems: "center", gap: "20px" }}
                >
                  {application.applicants.map((applicant) => {
                    return (
                      <Box>
                        <Stack
                          key={applicant.id}
                          direction="row"
                          sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            gap: "20px",
                            flexDirection: { sm: "row", xs: "column" },
                          }}
                        >
                          {/* Student Names */}
                          <PastelComponent
                            bgColor={"#ffc892"}
                            textColor={"black"}
                            text={applicant.student_name}
                            fontSize={"1rem"}
                          />
                          <Divider
                            orientation="vertical"
                            flexItem
                            sx={{ display: { xs: "none", sm: "block" } }}
                          />

                          {/* Student Status */}
                          <Box sx={{ display: "flex", gap: "10px" }}>
                            <PastelComponent
                              bgColor={"#b7ecba"}
                              textColor={"#373435"}
                              text={"accept"}
                              fontSize={"1rem"}
                              onClick={handleClicked}
                            />
                            <PastelComponent
                              bgColor={"#f7b7b7"}
                              textColor={"#373435"}
                              text={"decline"}
                              fontSize={"1rem"}
                              onClick={handleClicked}
                            />
                          </Box>
                        </Stack>
                        <Divider
                          orientation="horizontal"
                          variant="middle"
                          sx={{ marginTop: "1rem" }}
                        />
                      </Box>
                    );
                  })}
                </Stack>
              </Stack>
            </MyPaperWrap>
          );
        })}
      </Stack>
    </Box>
  );
}

function PastelComponent({
  bgColor,
  textColor,
  text,
  fontSize,
  onClick,
  style,
}) {
  // if onClick is not passed, then onClick is null and the component returned is a Paper component with all the props passed to it (bgColor, textColor, text, fontSize)
  // if onClick is passed, then onClick is a function and the component returned is a button with all the props passed to it (bgColor, textColor, text, fontSize, onClick as a function to onClick of the button)

  const stylePastel = {
    backgroundColor: bgColor,
    color: textColor,
    fontSize: fontSize,
    borderRadius: "18px",
    width: "100%",
    height: "100%",
    padding: "6px 12px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontWeight: "bold",
    ...style,
  };

  return onClick ? (
    <Button
      variant="text"
      onClick={() => onClick()}
      sx={{
        ...stylePastel,
        "&:hover": {
          backgroundColor: bgColor,
          color: textColor,
        },
      }}
    >
      {text}
    </Button>
  ) : (
    <Paper
      elevation={0}
      sx={{
        ...stylePastel,
        ...style,
      }}
    >
      {text}
    </Paper>
  );
}

const students = [
  {
    id: 1,
    surname: "Rossi",
    name: "Mario",
    gender: "Male",
    nationality: "Italian",
    email: "mario.rossi@email.com",
    degree: "Computer Science",
    enrollmentYear: 2020,
  },
  {
    id: 2,
    surname: "Bianchi",
    name: "Luca",
    gender: "Male",
    nationality: "Italian",
    email: "luca.bianchi@email.com",
    degree: "Electrical Engineering",
    enrollmentYear: 2021,
  },
  {
    id: 3,
    surname: "Verdi",
    name: "Sofia",
    gender: "Female",
    nationality: "Italian",
    email: "sofia.verdi@email.com",
    degree: "Mechanical Engineering",
    enrollmentYear: 2019,
  },
  // ... more students
];
const proposals = [
  {
    id: "a1b2c3",
    title: "Artificial Intelligence in Robotics",
    supervisor: "Prof. Gianni",
    coSupervisors: "Prof. Marta, Prof. Carlo",
    keywords: "AI, Robotics",
    type: "Research",
    groups: "G1, G2",
    description: "Exploring AI applications in autonomous robots.",
    requiredKnowledge: "Basics of AI, Machine Learning",
    notes: "Focus on practical implementations",
    expiration: "2023-12-31",
    level: "MSc",
    cds: "Computer Science",
  },
  {
    id: "d4e5f6",
    title: "Renewable Energy Systems",
    supervisor: "Prof. Elena",
    coSupervisors: "",
    keywords: "Renewable Energy, Sustainability",
    type: "Development",
    groups: "G3",
    description: "Designing sustainable energy solutions.",
    requiredKnowledge: "Fundamentals of Renewable Energy",
    notes: "",
    expiration: "2023-06-30",
    level: "BSc",
    cds: "Electrical Engineering",
  },
  // ... more proposals
];

const applications = [
  { id: "x123", student_id: 1, proposal_id: "a1b2c3", status: "pending" },
  { id: "y456", student_id: 2, proposal_id: "a1b2c3", status: "accepted" },
  { id: "z789", student_id: 3, proposal_id: "d4e5f6", status: "declined" },
  // ... more applications
];

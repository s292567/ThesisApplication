import React from "react";
import { List, ListItem, Typography, Grid, Paper } from "@mui/material";
import "./ThesisProposalList.css";
import { useNavigate } from "react-router-dom";
import ThesisProposalDetails from "../ThesisProposalDetails/ThesisProposalDetails";
import { useWindowDimensions } from "../useWindowDimensions";

const ThesisProposalsList = () => {
  const navigate = useNavigate();
  // Function to handle See More button click
  const handleSeeMoreClick = () => {
    navigate("studentDashboard-:studentId/requestedProposals");
  };

  const [openDetails, setOpenDetails] = React.useState(false);
  const handleOpenDetails = () => setOpenDetails(true);

  const windowWidth = useWindowDimensions().width;

  const fakeProposals = [
    {
      id: "P12345",
      title: "Development of an Advanced AI Assistant",
      supervisor: "Dr. Jane Smith",
      coSupervisors: "Prof. John Doe, Dr. Emily White",
      keywords: "Artificial Intelligence, Machine Learning, User Interface",
      type: "Research",
      groups: "AI Lab, ML Group",
      description:
        "This proposal focuses on developing an advanced AI assistant capable of understanding and performing complex tasks. The project will involve developing novel machine learning models and user interface improvements.",
      requiredKnowledge:
        "Python, Machine Learning, Natural Language Processing",
      notes: "Previous experience with deep learning frameworks is a plus.",
      expiration: "2023-12-31",
      level: "MSc",
      cds: "Computer Science and Engineering",
    },
    {
      id: "P67890",
      title: "Exploring Quantum Computing in Cryptography",
      supervisor: "Dr. Alan Turing",
      keywords: "Quantum Computing, Cryptography, Security",
      type: "Research",
      groups: "Quantum Research Lab",
      description:
        "This proposal aims to explore the applications of quantum computing in the field of cryptography, focusing on developing secure communication methods.",
      requiredKnowledge: "Cryptography, Quantum Mechanics, Programming",
      notes: "Interest in quantum algorithms is desirable.",
      expiration: "2024-05-30",
      level: "PhD",
      cds: "Physics and Computer Science",
    },
    {
      id: "P24680",
      title: "Innovations in Renewable Energy Sources",
      supervisor: "Prof. Emma Green",
      coSupervisors: "Dr. John Doe, Dr. Emily White",
      keywords: "Renewable Energy, Sustainability, Environmental Science",
      type: "Development",
      groups: "Sustainable Energy Lab",
      description:
        "The project focuses on developing innovative and efficient renewable energy sources to reduce carbon footprint and promote sustainability.",
      requiredKnowledge: "Environmental Science, Engineering, Material Science",
      expiration: "2023-11-15",
      level: "MSc",
      cds: "Environmental Engineering",
    },
  ];

  const formatDate = (date) => {
    const tmp = date.split("-");
    const day = tmp[2];
    const month = tmp[1].toUpperCase().slice(0, 3);
    const year = tmp[0];
    return { day, month, year };
  };

  return (
    <Paper elevation={3} className="thesis-proposals-list-container">
      <Typography variant="h6" className="title-section">
        Thesis Proposals List
      </Typography>

      <List className="thesis-proposals-list">
        <ListItem className="list-header">
          <Grid container>
            <Grid item xs={2} sm={2} md={2} lg={2}>
              <Typography variant="subtitle1" component="div">
                Deadline
              </Typography>
            </Grid>
            <Grid item xs={6} sm={7} md={7} lg={7}>
              <Typography variant="subtitle1" component="div">
                Class
              </Typography>
            </Grid>
            <Grid item xs={4} sm={3} md={3} lg={3}>
              <Typography variant="subtitle1" component="div">
                Supervisor
              </Typography>
            </Grid>
          </Grid>
        </ListItem>

        {fakeProposals.map((proposal) => {
          const { day, month, year } = formatDate(proposal.expiration);
          return (
            <ListItem key={proposal.id} className="list-item">
              <Grid container alignItems="center" spacing={0}>
                <Grid
                  item
                  xs={2}
                  sm={2}
                  md={2}
                  lg={2}
                  className="date-container"
                >
                  <Typography variant="h6" component="div" className="date-day">
                    {day}
                  </Typography>
                  <Typography variant="caption" component="div">
                    {month}
                  </Typography>
                  <Typography variant="caption" component="div">
                    {year}
                  </Typography>
                </Grid>

                <Grid
                  item
                  xs={6}
                  sm={6}
                  md={7}
                  lg={7}
                  className="class-container"
                >
                  <Typography
                    variant="subtitle1"
                    component="div"
                    className="class-title"
                  >
                    {proposal.title}
                  </Typography>
                  <Typography variant="body2" component="div">
                    {windowWidth > 1024
                      ? proposal.description
                      : `${proposal.description.substring(0, 50)}...`}
                  </Typography>
                  <button
                    className="read-more-button"
                    onClick={handleOpenDetails}
                  >
                    Read More
                  </button>
                </Grid>

                <Grid
                  item
                  xs={3}
                  sm={3}
                  md={3}
                  lg={3}
                  className="supervisor-container"
                >
                  <Typography variant="body1" component="div">
                    {proposal.supervisor}
                  </Typography>
                </Grid>
              </Grid>
              <ThesisProposalDetails
                open={openDetails}
                setOpen={setOpenDetails}
                proposal={proposal}
              />
            </ListItem>
          );
        })}
      </List>
      <div className="see-more-container">
        <button
          className="see-more-button" // Use class instead of inline styles
          onClick={handleSeeMoreClick}
        >
          See more
        </button>
      </div>
    </Paper>
  );
};

export default ThesisProposalsList;

import React from "react";
import { List, ListItem, Typography, Grid, Paper } from "@mui/material";
import "./ThesisProposalList.css";

const ThesisProposalsList = () => {
  const fakeProposals = [
    {
      id: 1,
      deadline: new Date(2023, 3, 9), // 9th April 2023
      title: "Database and Information Systems",
      description:
        "A Little Description, Key Words, Type, Groups, Requirements",
      supervisor: "Professor Maurizio Morisio",
    },
    {
      id: 2,
      deadline: new Date(2023, 11, 10), // 10th December 2023
      title: "AI and Machine Learning",
      description:
        "A little description, Key Words, Type, Groups, Requirements",
      supervisor: "Professor Caboy",
    },
    // ... add more fake proposals if needed
  ];

  const formatDate = (date) => {
    const day = date.getDate();
    const month = date
      .toLocaleString("default", { month: "short" })
      .toUpperCase();
    const year = date.getFullYear();
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
          const { day, month, year } = formatDate(proposal.deadline);
          return (
            <ListItem key={proposal.id} className="list-item">
              <Grid container alignItems="center">
                <Grid
                  item
                  xs={2}
                  sm={2}
                  md={2}
                  lg={2}
                  className="date-container"
                >
                  <Typography variant="h6" component="div">
                    {day}
                  </Typography>
                  <Typography variant="caption" component="div">
                    {month}
                  </Typography>
                  <Typography variant="caption" component="div">
                    {year}
                  </Typography>
                </Grid>
                <Grid item xs={0.5} className="spacer" />
                <Grid
                  item
                  xs={5.5}
                  sm={6.5}
                  md={6.5}
                  lg={6.5}
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
                    {proposal.description}
                  </Typography>
                </Grid>
                <Grid item xs={0.5} className="spacer" />
                <Grid
                  item
                  xs={3.5}
                  sm={2.5}
                  md={2.5}
                  lg={2.5}
                  className="supervisor-container"
                >
                  <Typography variant="body1" component="div">
                    {proposal.supervisor}
                  </Typography>
                </Grid>
              </Grid>
            </ListItem>
          );
        })}
      </List>
    </Paper>
  );
};

export default ThesisProposalsList;

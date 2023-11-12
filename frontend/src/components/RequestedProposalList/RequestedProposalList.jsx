import React from "react";
import Paper from "@mui/material/Paper";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";

import { useNavigate } from "react-router-dom";

import "./RequestedProposalList.css";
import { useWindowDimensions } from "../useWindowDimensions";

const RequestedProposals = () => {
  const navigate = useNavigate();

  // Get the window width
  const windowWidth = useWindowDimensions().width;
  // Placeholder data

  const proposals = [
    {
      title: "THESIS TITLE NAME",
      department: "Department, Professor",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,",
    },
    {
      title: "THESIS TITLE NAME",
      department: "Department, Professor",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,",
    },
    {
      title: "THESIS TITLE NAME",
      department: "Department, Professor",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,",
    },
    // ... other proposals
  ];

  // Function to handle See More button click
  const handleSeeMoreClick = () => {
    navigate("studentDashboard-:studentId/requestedProposals");
  };

  return (
    <Paper elevation={3} className="requested-proposals-container">
      <Typography variant="h6" className="title-section">
        Requested Proposals
      </Typography>

      <List className="list-container">
        {proposals.slice(0, 2).map(
          (
            proposal,
            index // Only display first two proposals
          ) => (
            <React.Fragment key={index}>
              {index !== 0 && <Divider component="li" />}
              <ListItem alignItems="flex-start">
                <ListItemText
                  primary={<div className="title-round-shape">{proposal.title}</div>}
                  secondary={
                    <>
                      <Typography
                        component="span"
                        variant="body2"
                        color="text.primary"
                        style={{ fontWeight: "bold" }}
                        margin={2}
                      >
                        {proposal.department}
                      </Typography>
                      —{" "}
                      {windowWidth > 1024
                        ? proposal.description
                        : proposal.description.substring(0, 50) + "..."}
                      {/* Limit description to 150 chars */}
                    </>
                  }
                />
                <button
                  className="read-more-button" // Use class instead of inline styles
                >
                  Read More
                </button>
              </ListItem>
            </React.Fragment>
          )
        )}
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

export default RequestedProposals;

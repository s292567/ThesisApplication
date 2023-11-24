import React from "react";
import {
  List,
  ListItem,
  Typography,
  Grid,
  Paper,
  Divider,
} from "@mui/material";

import { useNavigate } from "react-router-dom";

import "./RequestedProposalList.css";
import { useWindowDimensions } from "../../utils/useWindowDimensions";

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
        {proposals.slice(0, 2).map((proposal, index) => (
          <React.Fragment key={index}>
            {index !== 0 && <Divider component="li" />}
            <ListItem>
              <Grid container alignItems="center" spacing={2}>
                {" "}
                {/* Added spacing for better layout */}
                <Grid
                  item
                  xs={12}
                  sm={8}
                  md={9}
                  lg={9} // Adjusted the grid sizing
                  className="list-item-text"
                >
                  <Typography
                    variant="subtitle1"
                    component="div"
                    className="title-round-shape"
                  >
                    {proposal.title}
                  </Typography>

                  <Typography variant="body2" component="div">
                    <strong>{proposal.department}</strong> -{" "}
                    {windowWidth > 1024
                      ? proposal.description
                      : `${proposal.description.substring(0, 50)}...`}
                  </Typography>
                </Grid>
                <Grid
                  item
                  xs={12}
                  sm={4}
                  md={3}
                  lg={3} // Adjusted the grid sizing
                  className="supervisor-container"
                >
                  <button className="read-more-button">Read More</button>
                </Grid>
              </Grid>
            </ListItem>
          </React.Fragment>
        ))}
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

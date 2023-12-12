// SortingToolbar.jsx
import React, { useState } from "react";
import { AppBar, Toolbar, Typography, Box } from "@mui/material";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import { PastelComponent } from "../index"; // Import PastelComponent
import { useUserContext } from "../../contexts";

export default function SortingToolbar({ proposals, onSortedData }) {
  
  const { user } = useUserContext();

  const [sortState, setSortState] = useState({
    title: "",
    expiration: "",
    cds: "",
    keywords: "",
  });

  const buttonTextColor = "white";
  const buttonBgColor = "#94B3FD";

  const orderButtons = ["title", "expiration", "keywords"];
  if (user.role === "Professor") {
    orderButtons.push("cds");
  }

  const handleSort = (criteria) => {
    const newSortOrder =
      sortState[criteria] === "ascending"
        ? "descending"
        : sortState[criteria] === "descending"
        ? ""
        : "ascending";
    const newSortState = { ...sortState, [criteria]: newSortOrder };
    setSortState(newSortState);

    const sortedData = newSortOrder
      ? sortThesisData(proposals, criteria, newSortOrder)
      : proposals;
    
      onSortedData(sortedData, criteria, newSortOrder); // Pass additional parameters
  };

  const renderSortIcon = (criteria) => {
    return sortState[criteria] === "ascending" ? (
      <ArrowUpwardIcon />
    ) : sortState[criteria] === "descending" ? (
      <ArrowDownwardIcon />
    ) : null;
  };

  return (
    <AppBar
      position="static"
      sx={{
        backgroundColor: "#FFFFFFFA",
        boxShadow: "none",
        padding: 1,
        marginBottom: "1rem",
      }}
    >
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
          marginY: "1rem",
        }}
      >
        <Typography variant="h6" color={"black"} mb={2}>
          <b>order by:</b>
        </Typography>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
          }}
        >
          {/* Sorting Buttons */}
          {orderButtons.map((criteria) => (
            <PastelComponent
              key={criteria}
              bgColor={buttonBgColor}
              textColor={buttonTextColor}
              text={criteria.charAt(0).toUpperCase() + criteria.slice(1)}
              icon={renderSortIcon(criteria)}
              style={{
                marginRight: { xs: "5px", md: "1rem" },
                fontSize: { xs: "small",sm:"x-large"},
              }}
              onClick={() => handleSort(criteria)}
            />
          ))}
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export const sortThesisData = (thesisData, sortCriteria, sortOrder) => {
  return [...thesisData].sort((a, b) => {
    let valueA, valueB;

    if (sortCriteria === "expiration") {
      valueA = new Date(a[sortCriteria]);
      valueB = new Date(b[sortCriteria]);
    } else if (sortCriteria === "keywords") {
      valueA = a[sortCriteria].join(", ");
      valueB = b[sortCriteria].join(", ");
    } else {
      valueA = a[sortCriteria];
      valueB = b[sortCriteria];
    }

    if (valueA < valueB) {
      return sortOrder === "ascending" ? -1 : 1;
    }
    if (valueA > valueB) {
      return sortOrder === "ascending" ? 1 : -1;
    }
    return 0;
  });
};
import React, { useState } from "react";

import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import SearchIcon from "@mui/icons-material/Search";

import "./SettingsProposalsBar.css";

const SettingsProposalsBar = () => {
  const [showFilters, setShowFilters] = useState(false);

  const toggleFilters = () => {
    setShowFilters(!showFilters);
  };

  const handleSearchIconClick = () => {
    // Define what you want to do when the search icon is clicked
    console.log("Search icon clicked");
  };

  return (
    <div className="content">
      <div className="search-bar">
        <div className="search-input-container">
          <SearchIcon className="search-icon" onClick={handleSearchIconClick} />
          <input
            type="text"
            placeholder="Search proposal..."
            className="search-input"
          />
        </div>
        <div className="filter-container">
          <button
            className={`filters-button ${showFilters ? "active" : ""}`}
            onClick={toggleFilters}
          >
            <FilterAltIcon />
            Filters
            <KeyboardArrowDownIcon />
          </button>
          {showFilters && <FiltersDropdown />}
        </div>
        <button className="create-proposal-button">+ Create proposal</button>
      </div>
    </div>
  );
};

const FiltersDropdown = () => {
  return (
    <div className="filters-dropdown">
      <div className="filter-section">
        <h4>Filter 1:</h4>
        <label>
          <input type="checkbox" /> Option 1
        </label>
        <label>
          <input type="checkbox" /> Option 2
        </label>
        <label>
          <input type="checkbox" /> Option 3
        </label>
      </div>
      <div className="filter-section">
        <h4>Filter 2:</h4>
        <label>
          <input type="checkbox" /> Option 1
        </label>
        <label>
          <input type="checkbox" /> Option 2
        </label>
      </div>
      <button className="apply-filters">Apply</button>
    </div>
  );
};

export default SettingsProposalsBar;

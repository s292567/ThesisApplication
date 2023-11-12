import React, { useState } from "react";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import SearchIcon from "@mui/icons-material/Search";
import "./SearchBarStudent.css";

const SearchBarStudent = () => {
  const [showFilters, setShowFilters] = useState(false);

  const toggleFilters = () => {
    setShowFilters(!showFilters);
  };

  return (
    <div className="search-bar">
      <SearchIcon className="search-icon" />
      <input
        type="text"
        placeholder="Search proposal..."
        className="search-input"
      />
      <div className="filter-container">
        <button
          className={`filter-button ${showFilters ? "active" : ""}`}
          onClick={toggleFilters}
        >
          <FilterAltIcon className="filter-icon" />
          <span className="filter-text">Filters</span>
          <KeyboardArrowDownIcon className="arrow-icon" />
        </button>
        {showFilters && <FiltersDropdown />}
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

export default SearchBarStudent;

// React component for the webpage
import React from "react";
import "./SettingsProposalsBar.css"; // make sure to have the correct path to your CSS file

import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import FilterAltIcon from '@mui/icons-material/FilterAlt';

const SettingsProposalsBar = () => {
  return (
    <div className="content">
      <div className="search-bar">
        <input type="text" placeholder="Search proposal..." />
        <button className="filters-button">
          <FilterAltIcon />
          Filters 
          <KeyboardArrowDownIcon />
        </button>
        <button className="create-proposal-button">+ Create proposal</button>
      </div>
    </div>
  );
};

export default SettingsProposalsBar;

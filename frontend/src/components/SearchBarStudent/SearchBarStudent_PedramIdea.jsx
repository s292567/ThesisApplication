import React, { useState, useEffect } from "react";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import SearchIcon from "@mui/icons-material/Search";
import "./SearchBarStudent.css";

const SearchBarStudent = () => {
  const [showFilters, setShowFilters] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [cdsFilter, setCdsFilter] = useState("");
  const [proposals, setProposals] = useState([]);

  const toggleFilters = () => {
    setShowFilters(!showFilters);
  };

  const handleSearch = async () => {
    try {
      const response = await fetch(
        `/API/thesis/proposals/search?query=${searchQuery}`
      );
      const data = await response.json();
      setProposals(data);
    } catch (error) {
      console.error("Error fetching search results:", error);
    }
  };

  const handleFilterByCds = async () => {
    try {
      const response = await fetch(
        `/API/thesis/proposals/cds?cds=${cdsFilter}`
      );
      const data = await response.json();
      setProposals(data);
    } catch (error) {
      console.error("Error fetching filter results:", error);
    }
  };

  const handleApplyFilters = async () => {
    await handleFilterByCds();
    handleSearch();
  };

  useEffect(() => {
    // Fetch all proposals on initial component mount
    const fetchAllProposals = async () => {
      try {
        const response = await fetch("/API/thesis/proposals/all");
        const data = await response.json();
        setProposals(data);
      } catch (error) {
        console.error("Error fetching all proposals:", error);
      }
    };

    fetchAllProposals();
  }, []);

  return (
    <div className="search-bar">
      <SearchIcon className="search-icon" />
      <input
        type="text"
        placeholder="Search proposal..."
        className="search-input"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
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
        {showFilters && (
          <FiltersDropdown
            handleFilterByCds={handleFilterByCds}
            handleSearch={handleSearch}
            handleApplyFilters={handleApplyFilters}
            cdsFilter={cdsFilter}
            setCdsFilter={setCdsFilter}
          />
        )}
      </div>
      {/* Display the search results */}
      <div className="search-results">
        {proposals.map((proposal) => (
          <div key={proposal.id}>
            {/* Render proposal information as needed */}
            <h3>{proposal.title}</h3>
          </div>
        ))}
      </div>
    </div>
  );
};

const FiltersDropdown = ({
  handleFilterByCds,
  handleSearch,
  handleApplyFilters,
  cdsFilter,
  setCdsFilter,
}) => {
  const handleCdsChange = (event) => {
    setCdsFilter(event.target.value);
  };

  return (
    <div className="filters-dropdown">
      <div className="filter-sections">
        <div className="filter-section">
          <h4>Filter by CDS:</h4>
          <select onChange={handleCdsChange} value={cdsFilter}>
            <option value="">Select CDS</option>
            <option value="ENG4">ENG4</option>
            {/* Add more options ?*/}
          </select>
        </div>
        {/* Add additional filter sections ? */}
      </div>
      <button className="apply-filters" onClick={handleApplyFilters}>
        Apply
      </button>
    </div>
  );
};

const CheckBoxes = () => {
  
  const [checked, setChecked] = useState({
    title: false,
    supervisor: false,
    coSupervisors: false,
    keywords: false,
    type: false,
    groups: false,
    description: false,
    requiredKnowledge: false,
    notes: false,
    expiration: false,
    Msc: false,
    Bsc: false, 
    cds: false,
  });

  return <div className="checkboxes">{/* Add checkboxes as needed */}</div>;
};

export default SearchBarStudent;

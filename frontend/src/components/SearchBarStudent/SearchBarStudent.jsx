import React, {useContext, useState} from "react";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import SearchIcon from "@mui/icons-material/Search";
import {searchProposals} from "../../API/API_proposals.js";
import "./SearchBarStudent.css";
import {AuthContext} from "react-oauth2-code-pkce";

const SearchBarStudent = () => {
  const [showFilters, setShowFilters] = useState(false);
    const {tokenData} = useContext(AuthContext);
  const toggleFilters = () => {
    setShowFilters(!showFilters);
  };
  const [searchbarInput,setSearchbarInput]=useState("")
  return (
    <div className="search-bar">
      <SearchIcon className="search-icon" />
      <form className="form"  onSubmit={(event) => {event.preventDefault()

        var username= tokenData.preferred_username;
          console.log(searchbarInput)

        searchProposals(username.split("@")[0].toString(),searchbarInput.toString())
      }}>
      <input
        type="text"
        placeholder="Search proposal..."
        className="search-input"
        onChange={(value)=>{
          setSearchbarInput(value)
        }}
      />
      </form>



    </div>
  );
};

const FiltersDropdown = () => {
  return (
    <div className="filters-dropdown">
      {/*You can do a map here */}
      <div className="filter-sections">
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
      </div>
      <button className="apply-filters">Apply</button>
    </div>
  );
};

export default SearchBarStudent;

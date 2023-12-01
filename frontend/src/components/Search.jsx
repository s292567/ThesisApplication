import React from "react";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputAdornment from "@mui/material/InputAdornment";
import SearchIcon from "@mui/icons-material/Search";

function Search({ searchInput, handleSearchInputChange }) {


    return (
        <OutlinedInput
            sx={{ borderRadius: 4, width: { md: "400px", xs: "200px" } }}
            placeholder="Search proposal..."
            onChange={(e) => handleSearchInputChange(e.target.value)}
            value={searchInput}
            startAdornment={
                <InputAdornment position="start">
                    <SearchIcon sx={{ color: "text.disabled", width: 20, height: 20 }} />
                </InputAdornment>
            }
        />
    );
}

export default Search;

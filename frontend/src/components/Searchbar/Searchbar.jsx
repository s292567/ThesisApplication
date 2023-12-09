// Searchbar.jsx
import { AppBar, Toolbar, Box, Divider } from "@mui/material";
import { useState, useEffect } from "react";
import SearchBarComponent from "./SearchBarComponent";
import FilterComponent from "./FilterComponent";
import FilterTag from "./FilterTag";

import {
  getDistinctCds,
  getDistinctCoSupervisors,
  getDistinctSupervisors,
  getDistinctGroups,
  getDistinctKeywords,
  getDistinctTypes,
  getDistinctLevels,
} from "../../api";
import PastelComponent from "../PastelComponent/PastelComponent";

export default function Searchbar() {
  const [searchQuery, setSearchQuery] = useState("");

  const [filters, setFilters] = useState([]);
  const [apiData, setApiData] = useState([]); // Initialized as an empty object
  const [open, setOpen] = useState(false);

  // Fetch data from APIs
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = {
          Cds: await getDistinctCds(),
          CoSupervisors: await getDistinctCoSupervisors(),
          Supervisors: await getDistinctSupervisors(),
          Groups: await getDistinctGroups(),
          Keywords: await getDistinctKeywords(),
          Types: await getDistinctTypes(),
          Levels: await getDistinctLevels(),
        };

        setApiData(data); // Setting the state with the fetched data
      } catch (error) {
        console.error("Error fetching data", error);
      }
    };

    fetchData();
  }, []);

  // Clear all filters
  const clearAllFilters = () => {
    setFilters([]);
  };

  const removeFilter = (filterName) => {
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    /// IN THEORY EVERY TIME A FILTER IS REMOVED, THE API MUST BE CALLED AGAIN SO THAT THE RESULTS ARE UPDATED
    /// WITH THE NEW FILTERS AND IT MUST BE DONE HERE I THINK
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    const newFilters = { ...filters };
    delete newFilters[filterName];
    setFilters(newFilters);
  };

  // This is the selected filter tags that will be displayed
  const filterTags = Object.keys(filters).map((filterName) => (
    <FilterTag
      key={filterName}
      label={`${filterName}: ${filters[filterName]}`}
      onRemove={() => removeFilter(filterName)}
    />
  ));

  return (
    <AppBar
      position="sticky"
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
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            flexDirection: "row",
            flexWrap: "wrap",
            width: "100%",
            gap: "1rem",
            marginBottom: "1.5rem",
          }}
        >
          <SearchBarComponent
            value={searchQuery}
            onClick={() => setOpen(true)}
            onSearch={() => {}}
          />
          <FilterComponent
            open={open}
            handleClose={() => setOpen(false)}
            setFilters={setFilters}
            apiData={apiData}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
          />
        </Box>

        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            flexDirection: "row-reverse",
            flexWrap: "wrap",
            width: "100%",
            gap: "1rem",
            alignItems: "middle",
          }}
        >
          {filterTags.length > 0 && (
            <PastelComponent
              bgColor="#BC7AF9"
              textColor="white"
              text="Clear all"
              onClick={clearAllFilters}
              style={{ marginTop: "3px" }}
            />
          )}
          <Box
            sx={{
              display: "flex",
              overflowX: "auto", // Allow horizontal scrolling
              whiteSpace: "nowrap", // Keep items in a single line
              "&::-webkit-scrollbar": {
                height: "6px",
              },
              "&::-webkit-scrollbar-thumb": {
                backgroundColor: "rgba(0,0,0,0.2)",
                borderRadius: "20px",
              },
              gap: 1,
              width: "80%", // Ensure the Box takes full width of the parent
            }}
          >
            {filterTags}
          </Box>
        </Box>
        <Divider variant="middle" sx={{ marginTop: "1rem", width: "100%" }} />
      </Toolbar>
    </AppBar>
  );
}

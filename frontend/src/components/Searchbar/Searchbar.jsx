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
import {useUserContext} from "../../contexts/index.js";

export default function Searchbar({ clearSearch, handleResearch }) {
  const {user} = useUserContext();
  const [searchQuery, setSearchQuery] = useState("");

  const [filters, setFilters] = useState({});
  const [apiData, setApiData] = useState({}); // Initialized as an empty object
  const [open, setOpen] = useState(false);

  // Fetch data from APIs
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = {
          cds: await getDistinctCds(),
          coSupervisors: await getDistinctCoSupervisors(),
          supervisor: await getDistinctSupervisors(),
          groups: await getDistinctGroups(),
          keywords: await getDistinctKeywords(),
          types: await getDistinctTypes(),
          levels: await getDistinctLevels(),
        };
        if(user.role === "Student") {
          delete data.cds;
        }
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
    setSearchQuery("");
    clearSearch();
  };

  const removeFilter = (filterName) => {
    const newFilters = { ...filters };
    delete newFilters[filterName];
    setFilters(newFilters);
    handleResearch(newFilters, searchQuery);
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
            onSearch={setSearchQuery}
            style={{ width: { xs: "70%", md: "40%" } }}
          />
          {open ? (
            <FilterComponent
              open={open}
              filters={filters}
              handleClose={() => setOpen(false)}
              setFilters={setFilters}
              apiData={apiData}
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              handleResearch={handleResearch}
            />
          ) : null}
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
          {filterTags.length > 0 || searchQuery !== "" ? (
            <PastelComponent
              bgColor="#BC7AF9"
              textColor="white"
              text="Clear all"
              onClick={clearAllFilters}
              style={{ marginTop: "3px" }}
            />
          ) : null}
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

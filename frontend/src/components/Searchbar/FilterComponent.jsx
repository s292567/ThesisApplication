// FilterComponent.jsx is a component that renders the filter dialog for the searchbar
/* eslint-disable react/prop-types */
import { useState } from "react";
import { Close } from "@mui/icons-material";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
  Divider,
  DialogActions,
  Grid,
  Typography,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers";
import dayjs from "dayjs";

import PastelComponent from "../PastelComponent/PastelComponent";
import SearchBarComponent from "./SearchBarComponent";
import CustomAutocomplete from "../GeneralComponents/CustomAutocomplete";

export default function FilterComponent({
  open,
  handleClose,
  filters,
  setFilters,
  apiData,
  searchQuery,
  setSearchQuery,
  handleResearch,
}) {
  const cleanFilters = {
    endDate: null,
    cds: [],
    coSupervisors: [],
    supervisor: null,
    groups: [],
    keywords: [],
    types: [],
    levels: [],
  }
  const defaultFilters = {
    ...cleanFilters,
    ...filters
  };
  const [tempFilters, setTempFilters] = useState(defaultFilters);

  const handleFilterChange = (filterName, value) => {
    // Update the filter value
    setTempFilters({ ...tempFilters, [filterName]: value });
  };

  const applyFilters = () => {
    const searchFilters = { ...tempFilters };
    // if there are some null values or empty arrays, remove them before setting the filters
    Object.keys(searchFilters).forEach(
      (key) =>
        (searchFilters[key] === null ||
          (Array.isArray(searchFilters[key]) &&
            searchFilters[key].length === 0)) &&
        delete searchFilters[key]
    );
    setFilters(searchFilters);
    handleResearch(searchFilters, searchQuery);
    handleClose();
  };

  const handleDateChange = (newValue) => {
    // Format the date to "YYYY-MM-DD" or set to null if no date is selected
    const formattedDate = newValue
      ? dayjs(newValue).format("YYYY-MM-DD")
      : null;
    setTempFilters({ ...tempFilters, endDate: formattedDate });
  };

  const clearFilters = () => {
    setTempFilters(cleanFilters); // Clear local temporary filters
  };

  const filterComponents = Object.keys(apiData).map((filterName) => (
    <Grid item xs={12} sm={6} key={filterName}>
      {/* Each filter in a grid item */}
      <CustomAutocomplete
        label={filterName}
        value={tempFilters[filterName]}
        options={apiData[filterName]}
        onChange={(event, newValue) => handleFilterChange(filterName, newValue)}
        name={filterName}
        multiple={filterName !== "supervisor"}
        style={{ marginBottom: 0, marginTop: 0 }}
      />
    </Grid>
  ));

  return (
    <>
      <Dialog
        open={open}
        onClose={handleClose}
        scroll={"paper"}
        aria-labelledby="thesis-dialog-edit"
        aria-describedby="thesis-dialog-edit"
        maxWidth="md"
        fullWidth
        keepMounted={true}
        PaperProps={{
          sx: {
            m: 0,
            p: 1,
            border: "none",
            borderRadius: "20px",
            backgroundColor: "#F4F5FF",
            color: "black",
          },
        }}
      >
        <DialogTitle sx={{ fontSize: "2.8rem" }}>
          {/** ACTUAL SEARCHBAR */}
          <SearchBarComponent
            value={searchQuery}
            onSearch={setSearchQuery}
            onClick={() => {}}
          />
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            position: "absolute",
            right: 24,
            top: 24,
            backgroundColor: "#E90064",
            color: "white",
          }}
        >
          <Close />
        </IconButton>
        <Divider variant="middle" sx={{ marginTop: "-1rem" }} />
        <DialogContent>
          <Typography variant="h3" mb={2}>
            Filters
          </Typography>
          <Grid container spacing={2}>
            {filterComponents}
            <Grid item xs={12} sm={6}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  label="End Date"
                  value={tempFilters.endDate}
                  onChange={handleDateChange}
                  slotProps={{ textField: { variant: "outlined" } }}
                  minDate={dayjs()} // Restricting past dates
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      backgroundColor: "white",
                      borderRadius: "12px",
                      width: "90%",
                      "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                        borderColor: "#2192FF",
                      },
                    },
                  }}
                />
              </LocalizationProvider>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions
          sx={{
            padding: "1rem",
          }}
        >
          <PastelComponent
            bgColor="#BC7AF9"
            textColor="white"
            text="Clear all"
            onClick={clearFilters}
          />
          <PastelComponent
            bgColor="#2192FF"
            textColor="white"
            text="filter"
            onClick={applyFilters}
            style={{ marginRight: { sm: "2rem", xs: 0 } }}
          />
        </DialogActions>
      </Dialog>
    </>
  );
}

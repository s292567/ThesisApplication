// ThesisForm.jsx (continued)
import React, { useEffect, useState } from "react";
import {
  Alert,
  CircularProgress,
  Dialog,
  Divider,
  IconButton,
  Paper,
  Snackbar,
  styled,
  TextField,
} from "@mui/material";
import { Close } from "@mui/icons-material";

import {
  getDistinctCds,
  getDistinctCoSupervisors,
  getDistinctGroups,
  getDistinctKeywords,
  getDistinctLevels,
  getDistinctSupervisors,
  getDistinctTypes,
} from "../../api";

import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import { PastelComponent, CustomAutocomplete } from "../index";

export default function ThesisForm({ open, onClose, thesis = {}, onSubmit }) {
  const defaultFormData = {
    title: thesis.title || "",
    coSupervisors: Array.isArray(thesis.coSupervisors)
      ? [...thesis.coSupervisors]
      : [], // Ensure it's an array before spreading // Optional
    keywords: Array.isArray(thesis.keywords) ? [...thesis.keywords] : [],
    type: Array.isArray(thesis.type) ? [...thesis.type] : [],
    groups: Array.isArray(thesis.groups) ? [...thesis.groups] : [],
    description: thesis.description || "",
    requiredKnowledge: thesis.requiredKnowledge || "", // Optional
    notes: thesis.notes || "", // Optional
    expiration: thesis.expiration ? dayjs(thesis.expiration) : dayjs(),
    level: thesis.level || null,
    cds: Array.isArray(thesis.cds) ? [...thesis.cds] : [],
  };

  const [formData, setFormData] = useState(defaultFormData);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [missingFields, setMissingFields] = useState([]);
  const [loading, setLoading] = useState(true);

  const [apiData, setApiData] = useState({}); // Initialized as an empty object
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

        setApiData(data); // Setting the state with the fetched data
      } catch (error) {
        console.error("Error fetching data", error);
      }
    };

    fetchData().then(() => setLoading(false));
  }, []);

  const handleDateChange = (newValue) => {
    const formattedDate = newValue ? dayjs(newValue) : null;
    setFormData({ ...formData, expiration: formattedDate });
  };

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleAutocompleteChange = (event, newValue, name) => {
    setFormData({ ...formData, [name]: Array.isArray(newValue) ? [...newValue] : newValue });
  };

  const handleSubmit = () => {
    const requiredFields = [
      { name: "title", label: "Title" },
      { name: "keywords", label: "Keywords" },
      { name: "groups", label: "Groups" },
      { name: "expiration", label: "Expiration Date" },
      { name: "type", label: "Type" },
      { name: "description", label: "Description" },
      { name: "level", label: "Level" },
      { name: "cds", label: "CDS" },
    ];

    const missing = requiredFields.filter(
      (field) =>
        !formData[field.name] ||
        formData[field.name].length === 0 ||
        formData[field.name] === "" ||
        formData[field.name] === null
    );
    if (missing.length > 0) {
      setMissingFields(missing.map((field) => field.label));
      setSnackbarOpen(true);
      return;
    }

    const updatedThesis = {
      ...formData,
      id: thesis.id || "", // Keep the existing ID for editing, will be undefined for new thesis
      expiration: dayjs(formData.expiration).format("YYYY-MM-DD"),
    };

    onSubmit(updatedThesis);
    onClose();
  };

  const handleDiscard = () => {
    setFormData(defaultFormData);
    onClose();
  };

  const textColor = "#27005D";

  return (
    <>
      <Dialog
        open={open}
        onClose={onClose}
        scroll={"paper"}
        aria-labelledby="thesis-dialog-edit"
        aria-describedby="thesis-dialog-edit"
        maxWidth="lg"
        fullWidth={true}
        keepMounted={true}
        PaperProps={{
          sx: {
            m: 0,
            padding: "1.5rem",
            paddingTop: "2rem",
            border: "none",
            borderRadius: "20px",
            backgroundColor: "#F4F5FF",
            color: textColor,
          },
        }}
      >
        {loading ? (
          <>
            <CircularProgress sx={{marginBottom: "1rem"}}/> Loading...
          </>
        ) : (
          <>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label="expiration"
                name="expiration"
                value={formData.expiration}
                onChange={handleDateChange}
                slotProps={{ textField: { variant: "outlined" } }}
                minDate={dayjs()} // Restricting past dates
                sx={{
                  "& .MuiOutlinedInput-root": {
                    backgroundColor: "white",
                    borderRadius: "12px",
                    width: { xs: "50%", md: "25%" },
                    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                      borderColor: "#2192FF",
                    },
                  },
                }}
              />
            </LocalizationProvider>

            {/**
             * LEVEL (AUTOCOMPLETE)
             */}
            <CustomAutocomplete
              label="Level"
              value={formData.level}
              options={apiData.levels}
              onChange={handleAutocompleteChange}
              name="level"
              multiple={false} // Single selection for Level
              style={{ width: { xs: "50%", md: "25%" } }}
            />

            <StyledTextField
              fullWidth
              name="title"
              label="Thesis Title"
              placeholder="Thesis Title"
              value={formData.title}
              onChange={handleChange}
              variant="outlined"
              margin="normal"
              size="medium"
              sx={{ border: "none" }}
              InputProps={{
                style: {
                  width: "100%",
                  fontSize: "2.8rem",
                  fontWeight: "bold",
                  backgroundColor: "white",
                }, // Style for text inside the TextField
              }}
            />
            {/**
             * AUTOCOMPLETE FOR KEYWORDS
             */}
            <CustomAutocomplete
              label="Keywords"
              value={formData.keywords}
              options={apiData.keywords}
              onChange={handleAutocompleteChange}
              name="keywords"
              allowNewValues={true}
            />

            <IconButton
              aria-label="close"
              onClick={() => onClose()}
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
            <Divider
              variant="middle"
              sx={{ marginTop: "1rem", marginBottom: "2rem" }}
            />

            <Paper
              elevation={0}
              sx={{
                padding: "1.5rem",
                borderRadius: "20px",
                border: "1px solid whitesmoke",
                backgroundColor: "white",
                color: textColor,
                marginRight: "2rem",
                marginLeft: "1rem",
              }}
            >
              {/**
               *
               * ORDER OF THE FORM FIELDS:
               * 1. Type (autocomplete)
               * 2. Supervisor (autocomplete that accept only one value)
               * 3. Co-Supervisor (autocomplete)
               * 4. Cds (autocomplete)
               * 5. Description (text field multiline)
               * 6. Groups (autocomplete)
               * 7. Required Knowledge (text field multiline)
               * 8. Notes (text field multiline)
               *
               */}

              <CustomAutocomplete
                label="Type"
                value={formData.type}
                options={apiData.types}
                onChange={handleAutocompleteChange}
                name="type"
                allowNewValues={true}
              />

              <CustomAutocomplete
                label="Co-Supervisor"
                value={formData.coSupervisors}
                options={apiData.coSupervisors}
                onChange={handleAutocompleteChange}
                name="coSupervisors"
              />

              <CustomAutocomplete
                label="cds"
                value={formData.cds}
                options={apiData.cds}
                onChange={handleAutocompleteChange}
                name="cds"
              />

              <Divider sx={{ marginBottom: "2rem" }} />

              <StyledTextField
                fullWidth
                label="Description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                margin="normal"
                multiline
                rows={4}
              />

              <CustomAutocomplete
                label="Groups"
                value={formData.groups}
                options={apiData.groups}
                onChange={handleAutocompleteChange}
                name="groups"
              />

              <StyledTextField
                fullWidth
                label="Required Knowledge"
                name="requiredKnowledge"
                value={formData.requiredKnowledge}
                onChange={handleChange}
                margin="normal"
                multiline
                rows={4}
              />

              <StyledTextField
                fullWidth
                label="Notes (optional)"
                name="notes"
                value={formData.notes}
                onChange={handleChange}
                margin="normal"
                multiline
                rows={3}
              />
            </Paper>
            {/* Buttons to submit or discard */}
            <div
              style={{
                marginTop: "20px",
                display: "flex",
                justifyContent: "flex-start",
                gap: "30px",
                marginLeft: "1.5rem",
              }}
            >
              <PastelComponent
                bgColor="#ff7d36"
                textColor="white"
                text="Discard"
                onClick={handleDiscard}
              />
              <PastelComponent
                bgColor="#63ce78"
                textColor="white"
                text="Submit"
                onClick={handleSubmit}
              />
            </div>
          </>
        )}
      </Dialog>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={4000}
        onClose={() => setSnackbarOpen(false)}
        anchorOrigin={{ vertical: "top", horizontal: "left" }}
      >
        <Alert
          onClose={() => setSnackbarOpen(false)}
          severity={"error"}
          sx={{
            width: "100%",
            borderRadius: "10px !important",
            padding: "0.7rem 1rem !important",
            backgroundColor: "#ffb3b3ed !important",
            fontSize: "medium",
          }}
        >
          Please fill in all the missing fields:  <b>{missingFields.join(", ")}</b>
        </Alert>
      </Snackbar>
    </>
  );
}

const StyledTextField = styled(TextField)({
  "& .MuiOutlinedInput-root": {
    // Target the outline input root
    borderRadius: "25px", // Set the border radius
    backgroundColor: "white",
    color: "#27005D",
    fontSize: "1.2rem",
    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
      // Target the border when focused
      borderColor: "#2192FF", // Change to your desired color
    },
  },
  "& .MuiFormLabel-root": {
    color: "#40128B",
  },
  width: "90%",
});

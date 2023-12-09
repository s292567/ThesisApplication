// ThesiForm.jsx (continued)
import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  TextField,
  Snackbar,
  IconButton,
  Divider,
  Autocomplete,
  styled,
  Paper,
  Alert,
  Grid,
  Typography,
  createFilterOptions,
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
import PastelComponent from "../PastelComponent/PastelComponent";

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

  const [apiData, setApiData] = useState([]); // Initialized as an empty object

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

  const handleDateChange = (newValue) => {
    // Format the date to "YYYY-MM-DD" or set to null if no date is selected
    const formattedDate = newValue
      ? dayjs(newValue)
      : null;
    setFormData({ ...formData, expiration: formattedDate });
  };

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleAutocompleteChange = (event, newValue, name) => {
    setFormData({ ...formData, [name]: newValue });
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
      id: thesis.id || "", // Keep the existing ID for editing, will be undefined for new thesis
      expiration: dayjs(formData.expiration).format("YYYY-MM-DD"),
      ...formData,
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
            padding: "1rem",
            paddingTop: "2rem",
            border: "none",
            borderRadius: "20px",
            backgroundColor: "#F4F5FF",
            color: textColor,
          },
        }}
      >
        <DialogTitle>
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
                  width: "90%",
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
            options={apiData.Levels}
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
            options={apiData.Keywords}
            onChange={handleAutocompleteChange}
            name="keywords"
            multiple
            allowNewValues={true}
          />
        </DialogTitle>
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
        <Divider variant="middle" sx={{ marginTop: "-1rem" }} />
        <DialogContent>
          <Paper
            elevation={0}
            sx={{
              padding: "1.5rem",
              paddingLeft: "2rem",
              borderRadius: "20px",
              border: "1px solid whitesmoke",
              backgroundColor: "white",
              color: textColor,
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
              options={apiData.Types}
              onChange={handleAutocompleteChange}
              name="type"
              multiple
              allowNewValues={true}
            />

            <CustomAutocomplete
              label="Co-Supervisor"
              value={formData.coSupervisors}
              options={apiData.CoSupervisors}
              onChange={handleAutocompleteChange}
              name="coSupervisors"
              multiple
            />

            <CustomAutocomplete
              label="cds"
              value={formData.cds}
              options={apiData.Cds}
              onChange={handleAutocompleteChange}
              name="cds"
              multiple
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
              options={apiData.Groups}
              onChange={handleAutocompleteChange}
              name="groups"
              multiple
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
              justifyContent: "space-between",
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
        </DialogContent>
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
          Missing fields: <b>{missingFields.join(", ")}</b>
        </Alert>
      </Snackbar>
    </>
  );
}

const filter = createFilterOptions();
function CustomAutocomplete({
  label,
  value,
  options,
  onChange,
  name,
  multiple = true,
  allowNewValues = false,
  style = {},
}) {
  const [inputValue, setInputValue] = useState("");

  // Function to determine whether the selected option matches the value
  const isOptionEqualToValue = (option, value) => {
    return option === value || value === "";
  };

  // Function to handle when new value is added
  const handleInputChange = (event, newInputValue) => {
    setInputValue(newInputValue);
  };

  // Function to handle when the value is changed (selected from dropdown or entered)
  const handleChange = (event, newValue, role) => {
    if ((role === "input" || role === "selectOptions") && allowNewValues) {
      onChange(event, [...value, inputValue], name);
      setInputValue("");
    } else {
      onChange(event, newValue, name);
    }
  };

  return (
    <Autocomplete
      multiple={multiple}
      options={options || []}
      value={value}
      onChange={handleChange}
      isOptionEqualToValue={isOptionEqualToValue}
      onInputChange={handleInputChange}
      fullWidth
      filterOptions={(options, params) => {
        const filtered = filter(options, params);

        const { inputValue } = params;

        const isExisting = options.some((option) => inputValue === option);
        if (inputValue !== "" && !isExisting && allowNewValues) {
          filtered.push(inputValue);
        }

        return filtered;
      }}
      filterSelectedOptions
      freeSolo={allowNewValues}
      inputValue={inputValue}
      renderInput={(params) => (
        <TextField
          {...params}
          label={label}
          sx={{
            "& .MuiOutlinedInput-root": {
              // Target the outline input root
              borderRadius: "18px", // Set the border radius
              backgroundColor: "white",
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
            fonrWeight: "bold",
            ...style,
          }}
        />
      )}
      sx={{
        marginBottom: "1rem",
        marginTop: "1rem",
        "& .MuiChip-root": {
          fontSize: "1.1rem",
          backgroundColor: "#40128B",
          color: "white",
          fonrWeight: "bold",
        },
        "& .MuiChip-deleteIcon": {
          color: "white !important",
        },
      }}
    />
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

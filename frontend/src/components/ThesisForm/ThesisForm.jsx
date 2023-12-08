// ThesiForm.jsx (continued)
import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  Button,
  TextField,
  Snackbar,
  IconButton,
  Divider,
} from "@mui/material";
import { Close } from "@mui/icons-material";
import { AsynchronousAutocomplete } from "../index";
// import { DatePicker } from '@mui/x-date-pickers/DatePicker';

export default function ThesisForm({ open, onClose, thesis = {}, onSubmit }) {
  
  const defaultFormData = {
    title: thesis.title || "",
    coSupervisors: thesis.coSupervisors || [],
    keywords: thesis.keywords || [],
    type: thesis.type || [],
    groups: thesis.groups || "",
    description: thesis.description || "",
    requiredKnowledge: thesis.requiredKnowledge || "",
    notes: thesis.notes || "",
    expiration: thesis.expiration ? new Date(thesis.expiration) : new Date(),
    level: thesis.level || "",
    cds: thesis.cds || [],
  };

  const [formData, setFormData] = useState(defaultFormData);
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleAutocompleteChange = (field, isMultiple) => (event, newValue) => {
    console.log("newValue", newValue);
		const newFieldValue = isMultiple
      ? newValue
      : newValue !== null
      ? newValue.title
      : "";
    console.log(field, newFieldValue);
    setFormData({ ...formData, [field]: newFieldValue });
  };

  const handleSubmit = () => {
    if (!formData.title || !formData.type) {
      setSnackbarOpen(true);
      return;
    }
    onSubmit(formData);
  };

  // Example fetch functions - replace these with actual API calls
  const fetchLevels = [ "BSc", "MSc" ];
  const fetchCds = [
    { title: "Computer Science" },
    { title: "Engineering" },
  ];
  const fetchKeywords = async () => [
    { title: "AI" },
    { title: "Machine Learning" },
  ];
  const fetchTypes = async () => [{ title: "Research" }, { title: "Project" }];

  const textColor = "#27005D";
  const subTitlesColor = "#40128B";

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
            p: 1,
            border: "none",
            borderRadius: "20px",
            backgroundColor: "#F4F5FF",
            color: textColor,
          },
        }}
      >
        <DialogTitle>
          <TextField
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
                width: "80%",
                fontSize: "xx-large",
                fontWeight: "bold",
                backgroundColor: "white",
              }, // Style for text inside the TextField
            }}
            InputLabelProps={{
              style: { fontSize: "large", fontWeight: "bold" }, // Style for the label of the TextField
            }}
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
          {/* Other Dropdowns */}

          <AsynchronousAutocomplete
            label="Level"
            options={fetchLevels}
            value={formData.level}
            onChange={handleAutocompleteChange("level", false)}
            multiple={false}
          />
          <AsynchronousAutocomplete
            label="Course of Study"
            options={fetchCds}
            value={formData.cds}
            onChange={handleAutocompleteChange("cds", true)}
            multiple={true}
            createValue={true}
          />
          {/* Additional fields for other thesis attributes */}
          <TextField
            fullWidth
            label="Description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            margin="normal"
            multiline
            rows={4}
          />

          <TextField
            fullWidth
            label="Required Knowledge"
            name="requiredKnowledge"
            value={formData.requiredKnowledge}
            onChange={handleChange}
            margin="normal"
            multiline
            rows={4}
          />

          <TextField
            fullWidth
            label="Notes (optional)"
            name="notes"
            value={formData.notes}
            onChange={handleChange}
            margin="normal"
            multiline
            rows={3}
          />

          {/* Date Picker for expiration 
        
        <DatePicker
          label="Expiration"
          value={formData.expiration}
          onChange={(newValue) => {
            setFormData({ ...formData, expiration: newValue });
          }}
          renderInput={(params) => <TextField {...params} fullWidth margin="normal" />}
        />
          */}
          {/* Buttons to submit or discard */}
          <div
            style={{
              marginTop: "20px",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <Button variant="contained" color="primary" onClick={handleSubmit}>
              Submit
            </Button>
            <Button
              variant="outlined"
              onClick={() => {
                onClose();
              }}
            >
              Discard
            </Button>
          </div>
        </DialogContent>
      </Dialog>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={() => setSnackbarOpen(false)}
        message="Missing required fields"
      />
    </>
  );
}

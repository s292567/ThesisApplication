// RequestThesisForm.jsx
import React, { useEffect, useState } from "react";
import {
  Dialog,
  IconButton,
  Paper,
  Snackbar,
  Alert,
  styled,
  TextField,
  CircularProgress,
} from "@mui/material";
import { Close } from "@mui/icons-material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import { PastelComponent, CustomAutocomplete } from "../index";

import {
  // Replace these with your actual API functions
  getDistinctSupervisors,
  getDistinctCoSupervisors,
} from "../../api";

export default function RequestThesisForm({ open, onClose, onSubmit }) {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    supervisor: null,
    cosupervisors: [],
    approvalDate: dayjs(),
  });

  const [loading, setLoading] = useState(true);
  const [apiData, setApiData] = useState({});
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [missingFields, setMissingFields] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = {
          supervisors: await getDistinctSupervisors(),
          coSupervisors: await getDistinctCoSupervisors(),
        };
        setApiData(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  const handleDateChange = (newValue) => {
    setFormData({ ...formData, approvalDate: newValue });
  };

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleAutocompleteChange = (event, newValue, name) => {
    setFormData({
      ...formData,
      [name]: Array.isArray(newValue) ? [...newValue] : newValue,
    });
  };

  const handleSubmit = () => {
    const requiredFields = [
      { name: "title", label: "Thesis Title" },
      { name: "description", label: "Description" },
      { name: "approvalDate", label: "Approval Date" },
      { name: "supervisor", label: "Supervisor" },
    ];
    const missingFields = requiredFields.filter(
      (field) => !formData[field.name]
    );
    if (missingFields.length > 0) {
      setMissingFields(missingFields.map((field) => field.label));
      setSnackbarOpen(true);
      return;
    }

    const updatedFormData = {
      ...formData,
      approvalDate: formData.approvalDate.format("YYYY-MM-DD"),
    };

    onSubmit(updatedFormData);
    onClose();
  };

  const textColor = "#27005D";

  return (
    <>
      <Dialog
        open={open}
        onClose={onClose}
        scroll={"paper"}
        maxWidth="lg"
        fullWidth={true}
        PaperProps={{
          sx: {
            m: 0,
            padding: "2rem",
            paddingTop: "3rem",
            border: "none",
            borderRadius: "20px",
            backgroundColor: "#F4F5FF",
            color: textColor,
          },
        }}
      >
        {loading ? (
          <CircularProgress />
        ) : (
          <>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label="Approval Date"
                name="approvalDate"
                value={formData.approvalDate}
                onChange={handleDateChange}
                renderInput={(params) => <TextField {...params} />}
                minDate={dayjs()}
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
            <CustomAutocomplete
              label="Supervisor"
              value={formData.supervisor}
              options={apiData.supervisors}
              onChange={handleAutocompleteChange}
              name="supervisor"
              multiple={false}
            />

            <CustomAutocomplete
              label="Co-Supervisors"
              value={formData.cosupervisors}
              options={apiData.coSupervisors}
              onChange={handleAutocompleteChange}
              name="cosupervisors"
              multiple
            />

            <StyledTextField
              fullWidth
              name="description"
              label="Description"
              value={formData.description}
              onChange={handleChange}
              margin="normal"
              multiline
              rows={4}
            />

            <IconButton
              aria-label="close"
              onClick={onClose}
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

            <div
              style={{
                marginTop: "20px",
                display: "flex",
                justifyContent: "flex-start",
                gap: "30px",
              }}
            >
              <PastelComponent
                bgColor="#ff7d36"
                textColor="white"
                text="Discard"
                onClick={onClose}
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
          Please fill in all the missing fields:{" "}
          <b>{missingFields.join(", ")}</b>
        </Alert>
      </Snackbar>
    </>
  );
}

const StyledTextField = styled(TextField)({
  "& .MuiOutlinedInput-root": {
    borderRadius: "25px",
    backgroundColor: "white",
    color: "#27005D",
    fontSize: "1.2rem",
    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
      borderColor: "#2192FF",
    },
  },
  "& .MuiFormLabel-root": {
    color: "#40128B",
  },
  width: "90%",
});

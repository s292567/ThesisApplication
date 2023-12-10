import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  Button,
  DialogActions,
  DialogContent,
  IconButton,
} from "@mui/material";
import { LocalizationProvider, DateCalendar } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { AccessTimeFilledRounded, Close } from "@mui/icons-material";
import { PastelComponent } from "../index";

export default function VirtualClock() {
  const [open, setOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(dayjs());

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDateChange = (newValue) => {
    setSelectedDate(newValue);
  };

  const handleSubmit = () => {
    const formattedDate = selectedDate.format("YYYY-MM-DD");
    console.log("Submitting date:", formattedDate);
    // Replace this console.log with your API call
    // yourApiFunction(formattedDate);

    handleClose();
  };

  return (
    <>
      <PastelComponent
        onClick={handleOpen}
        bgColor={"#04009A"}
        textColor={"white"}
        text="Virtual Clock"
        icon={<AccessTimeFilledRounded sx={{ marginRight: "3px" }} />}
        style={{
          position: "absolute",
          left: "2rem",
          paddingRight: "1rem",
        }}
      />

      <Dialog
        open={open}
        onClose={handleClose}
        scroll={"paper"}
        aria-labelledby="virtual-clock-dialog"
        aria-describedby="virtual-clock-dialog-description"
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
          },
        }}
      >
        <DialogTitle>
          <b>Virtual Clock</b>
          <br />
          <br />
          To change the date pick one from the calendar and then press change.
          <br />
          <b>
            Remember that when the date is changed, you cannot go back in time.
          </b>
        </DialogTitle>

        <IconButton
          aria-label="close"
          onClick={() => handleClose()}
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

        <DialogContent>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DateCalendar
              label={"Expiration date"}
              date={selectedDate}
              onChange={handleDateChange}
              minDate={dayjs()}
              sx={{
                backgroundColor: "white",
                borderRadius: "20px",
                width: "fit-content",
                padding: "1rem",
                paddingX: "2rem",
                "& .MuiButtonBase-root": {
                  // Targeting the days in the calendar
                  fontSize: "1.3rem", // Adjust the font size as needed
                  padding: "1rem",
                },
                "& .MuiTypography-root": {
                  // Targeting text, including month and year in the header
                  
                  fontSize: "1.1rem", // Adjust the font size as needed
                },
              }}
            />
          </LocalizationProvider>
        </DialogContent>
        <DialogActions sx={{padding: "1rem", marginTop: "1.5rem"}}>
          <PastelComponent
            bgColor={"#04009A"}
            textColor={"white"}
            text="Change"
            onClick={handleSubmit}
            style={{
              position: "absolute",
              right: "35%",
            }}
          />
        </DialogActions>
      </Dialog>
    </>
  );
}

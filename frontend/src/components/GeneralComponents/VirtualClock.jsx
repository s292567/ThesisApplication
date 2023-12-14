// VirtualClock.jsx
import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogActions,
  DialogContent,
  IconButton,
} from "@mui/material";
import { LocalizationProvider, DateCalendar } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { AccessTimeFilledRounded, Close } from "@mui/icons-material";
import { PastelComponent } from "../index";
import { getVirtualClock, setVirtualClock } from "../../api";
import { useNavigate } from "react-router-dom";

export default function VirtualClock({ virtualDate }) {
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(dayjs());
  const [minDate, setMinDate] = useState(dayjs());

  useEffect(() => {
    const fetchMinDate = async () => {
      try {
        const minDate = await getVirtualClock();
        if (minDate !== null) {
          setMinDate(dayjs(minDate));
          setSelectedDate(dayjs(minDate));
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchMinDate();
  }, []);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDateChange = (newValue) => {
    setSelectedDate(newValue);
  };

  const handleSubmit = async () => {
    const formattedDate = selectedDate.format("YYYY-MM-DD");
    console.log("Submitting date:", formattedDate);
    try {
      await setVirtualClock(formattedDate);
      /** Forced refresh  */
      navigate("/refresh");
      navigate(-1);
    } catch (error) {
      console.log(error);
    } finally {
      handleClose();
    }
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
        maxWidth="sm"
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
              minDate={minDate}
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
        <DialogActions sx={{ padding: "1rem", marginTop: "1.5rem" }}>
          <PastelComponent
            bgColor={"#04009A"}
            textColor={"white"}
            text="Change"
            onClick={handleSubmit}
            style={{
              position: "absolute",
              right: "20%",
            }}
          />
        </DialogActions>
      </Dialog>
    </>
  );
}

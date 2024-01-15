
/* eslint-disable react/prop-types */
// eslint-disable-next-line no-unused-vars
import React, { useState, useCallback } from "react";
import {
    Snackbar,
    Alert,
    styled,
    Dialog,
    DialogTitle,
    Divider,
    DialogContent,
    Typography,
    Box,
    TextField
} from "@mui/material";


import { PastelComponent } from "../index.js";
 export default function ChangePopup({

                                         changeOpen, // useState to manage the open/close state of the popup
                                         setChangeOpen, // useState to manage the open/close state of the popup
                                         handleApplied, // function to be called when the user clicks on "yes" (returns a promise)
                                     }) {
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState("");
    const [snackbarSeverity, setSnackbarSeverity] = useState("success");
     const [changeDescription, setChangeDescription] = useState('');
     const [error, setError] = useState(false);


    const handleCloseSnackbar = useCallback(() => {
        setSnackbarOpen(false);
    }, []);

    const handleSendClick = useCallback(async () => {
        try {
            if (!changeDescription.trim()) {
                setError(true);
                setSnackbarOpen(false); // Close Snackbar if there was any previous error
                setSnackbarMessage("You should fill here!");
                setSnackbarSeverity("error");
            } else {
                const message = await handleApplied();
                setSnackbarMessage(message || "Success!");
                setSnackbarSeverity("success");
                setChangeOpen(false);
                setSnackbarOpen(true); // Show Snackbar only on success
            }
        } catch (error) {
            console.error("Error occurred:", error);
            setSnackbarMessage(error.message || "Error occurred!");
            setSnackbarSeverity("error");
            setChangeOpen(false);
            setSnackbarOpen(true);
        }
    }, [handleApplied, setChangeOpen, changeDescription]);
     const handleInputChange = (event) => {
         setChangeDescription(event.target.value);
         setError(false);
     };

    return (
        <>
            <Snackbar
                open={snackbarOpen}
                autoHideDuration={2500}
                onClose={handleCloseSnackbar}
                anchorOrigin={{ vertical: "top", horizontal: "left" }}
            >
                <Alert
                    onClose={handleCloseSnackbar}
                    severity={snackbarSeverity}
                    sx={{
                        width: "100%",
                        borderRadius: "10px !important",
                        padding: "0.7rem 1rem !important",
                        backgroundColor:  snackbarSeverity === "success" ? "#a6ff96e8 !important" : "#ffb3b3ed !important" ,
                        fontWeight: "bold",
                        fontSize: "medium",
                    }}
                >
                    {snackbarMessage}
                </Alert>
            </Snackbar>

            {changeOpen && (
                <MyDialog
                    key="childModal"
                    open={changeOpen}
                    onClose={() => setChangeOpen(false)}
                    aria-labelledby="change-modal"
                    aria-describedby="change-modal-description"
                    maxWidth="md"
                    keepMounted={true}
                    justifycontent="center"
                >
                    <DialogTitle
                        sx={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            color: "#ED174F",
                            gap: "10px",
                            fontSize: "xx-large",
                        }}


                    >
                        <Typography variant="h5" sx={{ fontWeight: "bold" }}>
                           Change The Request
                        </Typography>
                    </DialogTitle>
                    <Divider />
                    <DialogContent>
                        <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                            The changes should be:
                        </Typography>
                        <TextField
                            id="outlined-basic"
                            label={"The Change needed"}
                            error={error}
                            helperText={error ? "This field is required" : ""}
                            variant="outlined"
                            fullWidth
                            color="success"
                            value={changeDescription}
                            onChange={handleInputChange}

                            style={{marginTop:"25px", marginBottom:"20px",borderWidth: "10px" }}
                        />
                        <Box
                            sx={{
                                display: "flex",
                                flexDirection: "row",
                                gap: "40px",
                                justifyContent: "center",
                                mt: 4,
                            }}
                        >
                            <PastelComponent
                                bgColor="#00B090"
                                textColor="white"
                                text="Send"
                                fontSize="medium"
                                style={{ width: "100px" }}
                                onClick={handleSendClick}
                            />

                            <PastelComponent
                                bgColor="#ED174F"
                                textColor="white"
                                text="Cancle"
                                fontSize="medium"
                                style={{ width: "100px" }}
                                onClick={() => {
                                    setChangeOpen(false);
                                }}
                            />
                        </Box>
                    </DialogContent>
                </MyDialog>
            )}
        </>
    );
}

const MyDialog = styled(Dialog)(() => ({
    ".MuiPaper-root": {
        borderRadius: "20px",
        padding: "2rem",
    },
}));

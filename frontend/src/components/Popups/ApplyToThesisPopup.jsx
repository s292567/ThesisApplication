// ApplyToThesisPopup.jsx
import React, { useState, useCallback } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Typography,
  IconButton,
  Box,
} from "@mui/material";
import {
  CloudUploadOutlined,
  Check as CheckIcon,
  Close as CloseIcon,
} from "@mui/icons-material";
import { useDropzone } from "react-dropzone";

export default function ApplyToThesisPopup({ open, onClose, handleAppling }) {
  const [file, setFile] = useState(null);

  const onDrop = useCallback((acceptedFiles) => {
    // Check if the first file in the acceptedFiles array is a PDF
    const file = acceptedFiles[0];
    if (file && file.type === "application/pdf") {
      setFile(file);
    } else {
      // Handle the case where the file is not a PDF
      alert("Please upload a PDF file.");
    }
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    multiple: false,
    accept: {
      // Accept only PDF files
      "application/pdf": [".pdf"],
    },
  });

  const handleRemoveFile = () => {
    setFile(null);
  };

  const handleApply = () => {
    // Logic to handle apply with or without CV
    // handleAppling(file);
    onClose();
  };

  const handleGoBack = () => {
    onClose();
    setFile(null);
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      sx={{ "& .MuiDialog-paper": { borderRadius: "18px", border: 0 } }}
    >
      <DialogTitle>Are you sure you want to <b>apply</b> to <b>this thesis</b>?</DialogTitle>
      <Divider variant="middle" />
      <DialogContent>
        <Box>
          <Typography variant="body1" gutterBottom>
            Upload a CV (optional):
          </Typography>
          {!file ? (
            <Box
              {...getRootProps()}
              sx={{
                border: "2px dashed grey",
                borderRadius: "12px",
                padding: "20px",
                textAlign: "center",
                cursor: "pointer",
                margin: "1rem",
                paddingY: "2rem",
              }}
            >
              <input {...getInputProps()} />
              <CloudUploadOutlined style={{ fontSize: "50px" }} />
              <Typography variant="body2">
                Drag and drop file here
                <br />
                or click to select it
              </Typography>
            </Box>
          ) : (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <CheckIcon color="success" />
              <Typography
                variant="body2"
                style={{ flexGrow: 1, marginLeft: 8 }}
              >
                {file.name}
              </Typography>
              <IconButton onClick={handleRemoveFile}>
                <CloseIcon />
              </IconButton>
            </div>
          )}
        </Box>
      </DialogContent>
      <Divider variant="middle" />
      <DialogActions sx={{justifyContent: "center"}}>
        <Button onClick={handleApply}>
          {file ? "Applying with CV" : "Apply"}
        </Button>
        <Button onClick={handleGoBack}>Go Back</Button>
      </DialogActions>
    </Dialog>
  );
}

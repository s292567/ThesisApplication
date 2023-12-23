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
  styled,
  Paper,
  useMediaQuery,
} from "@mui/material";
import {
  CloudUploadOutlined,
  CheckRounded as CheckIcon,
  Close as CloseIcon,
} from "@mui/icons-material";
import { useDropzone } from "react-dropzone";
import { PastelComponent } from "../index";

export default function ApplyToThesisPopup({ open, onClose, handleAppling }) {
  const [file, setFile] = useState(null);

  const isMobile = useMediaQuery("(max-width: 600px)");
  const scale = isMobile ? 0.7 : 1;

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
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setFile(file);
  };
  const handleApply = () => {
    // Logic to handle apply with or without CV
    handleAppling(file);
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
      sx={{
        "& .MuiDialog-paper": {
          borderRadius: "18px",
          border: 0,
          padding: "1rem",
        },
      }}
    >
      <DialogTitle sx={{ padding: "1rem" }}>
        <Typography gutterBottom mb={2} sx={{ fontSize: `${scale*2}rem` }}>
          Are you sure you want to <b>apply</b> to <b>this thesis</b>?
        </Typography>
      </DialogTitle>

      <StyledDivider />

      <DialogContent>
        <Paper
          sx={{
            padding: "1rem",
            paddingTop: "1.5rem",
            borderRadius: "18px",
            border: "none",
            backgroundColor: "whitesmoke",
          }}
          elevation={0}
        >
          <Typography
            gutterBottom
            sx={{
              marginLeft: "1rem",
              color: "#4F709C",
              fontWeight: "bold",
              fontSize: "1rem",
            }}
          >
            Upload a CV (optional):
          </Typography>

          {!file ? (

              <input type="file" onChange={handleFileChange}/>

          ) : (
            <Box
              sx={{
                border: "none",
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-start",
                gap: "5px",
              }}
            >
              <FileWrapper
                sx={{
                  border: "none",
                  display: "flex",
                  flexDirection: "row",
                  gap: "10px",
                  cursor: "default",
                }}
              >
                <CheckIcon sx={{fontWeight: "bold", color: "darkblue"}}/>
                <Typography
                  sx={{
                    fontWeight: "bold",
                    fontSize: "1.2rem",
                    color: "darkblue",
                    marginRight: "1rem",
                  }}
                >
                  {file.name}
                </Typography>
              </FileWrapper>

              <IconButton onClick={handleRemoveFile}>
                <CloseIcon sx={{ color: "darkred" }} />
              </IconButton>
            </Box>
          )}
        </Paper>
      </DialogContent>

      <DialogActions sx={{ justifyContent: "flex-start", marginLeft: "2rem", gap: "20px"}}>
        
        <PastelComponent
          bgColor={"#2192FF"}
          textColor={"white"}
          text={file ? "applying with CV" : "apply without CV"}
          onClick={handleApply}
          style={{paddingX: "1rem", paddingY: "0.6rem", borderRadius: "15px"}}
         />
        
        <PastelComponent
          bgColor={"#ED174F"}
          textColor={"white"}
          text={"go back"}
          onClick={handleGoBack}
          style={{paddingX: "1rem", paddingY: "0.6rem", borderRadius: "15px"}}
        />
      </DialogActions>
    </Dialog>
  );
}

const StyledDivider = styled(Divider)({
  width: "80%",
  marginLeft: "10%",
  marginBottom: "1rem",
});

const FileWrapper = styled(Paper)({
  border: "2px dashed #4F709C",
  backgroundColor: "#d1e3f9",
  borderRadius: "18px",
  padding: "20px",
  textAlign: "center",
  cursor: "pointer",
  margin: "1rem",
  paddingY: "2rem",
});

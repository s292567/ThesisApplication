import React, { useState } from 'react';
import { Dialog, IconButton, Box } from '@mui/material';
import { Close, ArrowBackIos as ArrowBackIosIcon, ArrowForwardIos as ArrowForwardIosIcon } from '@mui/icons-material';
import { Document, Page, pdfjs } from 'react-pdf';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';

// Set worker for react-pdf
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

export default function PdfViewerModal({ open, onClose, file }) {
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
    setPageNumber(1); // Reset to first page when new document is loaded
  };

  const goToPrevPage = () => {
    setPageNumber(prevPageNumber => Math.max(prevPageNumber - 1, 1));
  };

  const goToNextPage = () => {
    setPageNumber(prevPageNumber => Math.min(prevPageNumber + 1, numPages));
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="md" sx={{padding: "1rem"}}>
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
      <Document file={file} onLoadSuccess={onDocumentLoadSuccess}>
        <Page pageNumber={pageNumber} />
      </Document>
      <Box display="flex" justifyContent="center" alignItems="center" p={2}>
        <IconButton onClick={goToPrevPage} disabled={pageNumber <= 1}>
          <ArrowBackIosIcon />
        </IconButton>
        <Box m={1}>
          Page {pageNumber} of {numPages}
        </Box>
        <IconButton onClick={goToNextPage} disabled={pageNumber >= numPages}>
          <ArrowForwardIosIcon />
        </IconButton>
      </Box>
    </Dialog>
  );
}

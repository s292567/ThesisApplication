import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "80%",
  maxWidth: 600,
  maxHeight: "60vh", // Sets the maximum height of the modal
  backgroundColor: "background.paper", // Replace with actual color value if necessary
  border: "none",
  boxShadow: 5,
  padding: 6,
  paddingBottom: 12,
  borderRadius: 6,
  overflowY: "auto",
};

const modalButtonStyle = {
  fontSize: 'large !important',
    fontWeight: 'bold !important',
    borderRadius: '12px !important',
    border: 'none',
    background: 'whitesmoke !important',
    cursor: 'pointer ',
    padding: '0.5rem 1rem !important', // Adjust padding as needed
    marginRight: '1rem !important',
};

const formatDate = (date) => {
  const tmp = date.split("-");
  const day = tmp[2];
  const month = tmp[1].toUpperCase().slice(0, 3);
  const year = tmp[0];
  return { day, month, year };
};

/**                             { proposal } the proposal will be passed down to the element from the caller  */
export default function ThesisProposalDetails() {
  const [open, setOpen] = React.useState(false);
  const [childOpen, setChildOpen] = React.useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setChildOpen(false); // Close child modal as well when parent is closed
  };

  const handleApply = () => setChildOpen(true);
  const handleChildClose = () => setChildOpen(false);

  const proposal = {
    id: "P12345",
    title: "Development of an Advanced AI Assistant",
    supervisor: "Dr. Jane Smith",
    coSupervisors: "Prof. John Doe, Dr. Emily White",
    keywords: "Artificial Intelligence, Machine Learning, User Interface",
    type: "Research",
    groups: "AI Lab, ML Group",
    description:
      "This proposal focuses on developing an advanced AI assistant capable of understanding and performing complex tasks. The project will involve developing novel machine learning models and user interface improvements.",
    requiredKnowledge: "Python, Machine Learning, Natural Language Processing",
    notes: "Previous experience with deep learning frameworks is a plus.",
    expiration: "2023-12-31",
    level: "MSc",
    cds: "Computer Science and Engineering",
  };

  const hasOptionalFields =
    proposal.coSupervisors && proposal.requiredKnowledge && proposal.notes;

  const { day, month, year } = formatDate(proposal.expiration);

  return (
    <div>
      {/** The button must me removed in the final version and also the handleOpen must be passed down from the parent component */}
      <Button onClick={handleOpen}>Open modal</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            ...modalStyle,
            "@media (max-width: 768px)": {
              padding: 4,
              paddingBottom: 12,
              marginTop: 5,
              marginBottom: 5,
            },
          }}
        >
          {/* Close button */}
          <IconButton
            aria-label="close"
            onClick={handleClose}
            sx={{
              position: "absolute",
              right: "1rem",
              top: "1rem",
              color: "black", // You can change the color
            }}
          >
            <CancelOutlinedIcon sx={{ fontSize: "xx-large" }} />
          </IconButton>
          <Typography
            id="modal-modal-title"
            variant="h6"
            component="h2"
            sx={{ mt: 2, textAlign: "center" }}
          >
            {proposal.title}
          </Typography>
          <Typography sx={{ mb: 2, textAlign: "center" }}>
            {proposal.type}
          </Typography>

          <Divider sx={{ my: 2 }} />

          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Typography>
                <strong>Supervisor:</strong>
                <br />
                {proposal.supervisor}
              </Typography>
            </Grid>
            <Grid item xs={6} sx={{ textAlign: "right" }}>
              {proposal.coSupervisors && (
                <Typography>
                  <strong>Co-Supervisors:</strong>
                  <br />
                  {proposal.coSupervisors}
                </Typography>
              )}
            </Grid>
          </Grid>

          <Typography sx={{ mb: 2, mt: 2 }}>
            <strong>Keywords:</strong> <br /> {proposal.keywords}
          </Typography>

          <Grid container spacing={2} sx={{ mb: 2 }}>
            <Grid item xs={2} sm={2} md={2} lg={2}>
              <Typography>
                <strong>ExpirationDate:</strong> <br />
              </Typography>
              <Typography
                variant="h6"
                component="div"
                sx={{ backgroundColor: "whitesmoke", textAlign: "center" }}
              >
                {day}
              </Typography>
              <Typography
                variant="caption"
                component="div"
                sx={{ backgroundColor: "whitesmoke", textAlign: "center" }}
              >
                {month}
              </Typography>
              <Typography
                variant="caption"
                component="div"
                sx={{ backgroundColor: "whitesmoke", textAlign: "center" }}
              >
                {year}
              </Typography>
            </Grid>
          </Grid>

          <Grid container spacing={2} sx={{ mb: 2 }}>
            <Grid item xs={6}>
              <Typography>
                <strong>Course of Study:</strong> <br /> {proposal.cds}
              </Typography>
            </Grid>
            <Grid item xs={6} sx={{ textAlign: "left" }}>
              <Typography>
                <strong>
                  Level:
                  <br /> {proposal.level}
                </strong>
              </Typography>
            </Grid>
          </Grid>

          <Typography sx={{ mb: 2 }}>
            <strong>Description:</strong> <br /> {proposal.description}
          </Typography>
          {proposal.requiredKnowledge && (
            <Typography sx={{ mb: 2 }}>
              <strong>Required Knowledge:</strong> <br />{" "}
              {proposal.requiredKnowledge}
            </Typography>
          )}
          {proposal.notes && (
            <Typography sx={{ mb: 2 }}>
              <strong>Notes:</strong> <br /> {proposal.notes}
            </Typography>
          )}

          {/* Add other fields here in the format: */}
          {/* <Typography><strong>Field Name:</strong><br /> field</Typography> */}

          {!hasOptionalFields && (
            <Typography sx={{ mt: 2, fontStyle: "italic" }}>
              *N.B: some fields are not present in this proposal*
            </Typography>
          )}

          <Box sx={{ display: "flex", justifyContent: "center", mt: '5rem' }}>
            <Button sx={modalButtonStyle} onClick={handleClose} >
              Close
            </Button>
            <Button sx={modalButtonStyle} onClick={handleApply} >Apply</Button>
          </Box>
        </Box>
      </Modal>

      {/* Nested Child Modal */}
      <Modal open={childOpen} onClose={handleChildClose}>
        <Box
          sx={{
            ...modalStyle,
            maxHeight: "25vh",
            width: "50%",
            "@media (max-width: 768px)": {
              padding: 4,
              marginTop: 5,
              marginBottom: 5,
            },
            "@media (min-width: 1024px)": {
              width: "25%",
            },
          }}
        >
          <IconButton
            aria-label="close"
            onClick={handleChildClose}
            sx={{
              position: "absolute",
              right: "1rem",
              top: "1rem",
              color: "black",
            }}
          >
            <CancelOutlinedIcon sx={{ fontSize: "xx-large" }} />
          </IconButton>
          <Typography variant="h6" sx={{ mt: 2, textAlign: "center" }}>
            ATTENTION
          </Typography>
          <Typography sx={{ textAlign: "center", mt: 2 }}>
            Are you sure you want to apply to this thesis?
          </Typography>

          {/* Nested Modal Action Buttons */}
          <Box sx={{ display: "flex", mt: 2, justifyContent: "center" }}>
            <Button sx={modalButtonStyle} onClick={handleChildClose}>X</Button>
            <Button  sx={modalButtonStyle} onClick={handleClose}>YES</Button>
          </Box>
        </Box>
      </Modal>
    </div>
  );
}

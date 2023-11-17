import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import axios from 'axios';
import {useContext, useEffect} from "react";
import UserContext from "../../userContext.js";

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "80%",
  maxWidth: 900,
  maxHeight: "65vh",
    background: 'linear-gradient(to bottom, #FFC591, #FFFFFF)',
  border: "none",
  boxShadow: '0 0 5px rgba(0, 0, 0, 0.3)',
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


export default function ThesisProposalDetails({ proposal, open, setOpen}) {
  const [childOpen, setChildOpen] = React.useState(false);
  const [appModelOpen,setAppModelOpen]=React.useState(false);

  const handleClose = () => {
    setOpen(false);
    setChildOpen(false); // Close child modal as well when parent is closed
    setAppModelOpen(false);
  };

  const handleApply = () => setChildOpen(true);
    const {user} = useContext(UserContext)

    const handleYesClick = async () => {
        try {
            // Prepare the request body
            const requestBody = {
                studentId: user.username,
                proposalId: proposal.id,
            };

            // Make the API call using Axios
            const response = await axios.post('http://localhost:8081/API/thesis/proposals/apply', requestBody,{        headers: {
                    'Content-Type' : 'application/json' ,            'Authorization': 'Bearer '+ localStorage.getItem("jwt")
                }});

            // Check the response status and handle accordingly
            if (response.status === 201) {
                // Application to the proposal has been created
                setChildOpen(false);
                setAppModelOpen(true);
            } else {
                // Handle other response statuses
                console.error('Failed to apply to thesis proposal. Status:', response.status);
            }
        } catch (error) {
            // Handle network or other errors
            console.error('Error:', error.message);
        }
    };


    const handleChildClose = () => setChildOpen(false);
const handleAppModelClose=() => {
    setAppModelOpen(false);
    handleClose();
}

  const hasOptionalFields =
    proposal.coSupervisors && proposal.requiredKnowledge && proposal.notes;

  const { day, month, year } = formatDate(proposal.expiration);

  return (
    <div>
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
              paddingBottom: 30,
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
              top: "2.5rem",
              color: "black",
            }}
          >
            <CancelOutlinedIcon sx={{ fontSize: "xx-large" }} />
          </IconButton>
          <Typography
            id="modal-modal-title"
            variant="h6"
            component="h2"
            sx={{ mt: 2, textAlign: "center",
                fontWeight: 'bold',
                fontSize: '1.5rem',}}

          >
            {proposal.title}
          </Typography>

          <Divider sx={{ my: 2 }} />

          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Typography >
                   <span style={{ fontWeight: 'bold', fontSize: '1.2rem' }}>
                Supervisor:
                   </span>
                <br />
                  <span style={{ fontSize: '1.1rem' }}>
                {proposal.supervisor.name+" "+proposal.supervisor.surname}
                  </span>
              </Typography>
            </Grid>
              <Grid item xs={6} sx={{ textAlign: "right" }}>

                  {proposal.coSupervisors && (
               <Typography>
               <span style={{ fontWeight: 'bold', fontSize: '1.2rem' }}>
                Co-Supervisors:
                </span>
                <br />
                   <span style={{  fontSize: '1.1rem' }}>
             {proposal.coSupervisors}
                   </span>
              </Typography>
                  )}
              </Grid>
          </Grid>

          <Typography sx={{ mb: 2, mt: 2 }}>
               <span style={{ fontWeight: 'bold', fontSize: '1.2rem' }}>
            Keywords:
               </span>
              <br />
              <span style={{  fontSize: '1.1rem' }}>
                  {proposal.keywords}
              </span>
          </Typography>
            <Typography sx={{ mb: 2, mt:2 }}>
                <span style={{ fontWeight: 'bold', fontSize: '1.2rem' }}>
            Keywords:
               </span>
                {proposal.type}
            </Typography>
            <Typography sx={{ mb: 2, mt:2 }}>
                <span style={{ fontWeight: 'bold', fontSize: '1.2rem' }}>
            Groups:
               </span>
                {proposal.groups}
            </Typography>

            <Typography sx={{ mb: 2 }}>
              <span style={{ fontWeight: 'bold', fontSize: '1.2rem' }}>
                  Description:
              </span>
                <br />
                <span style={{  fontSize: '1.1rem' }}>
              {proposal.description}
              </span>
            </Typography>
            {proposal.requiredKnowledge && (
                <Typography sx={{ mb: 2 }}>
               <span style={{ fontWeight: 'bold', fontSize: '1.1rem' }}>

                   Required Knowledge:</span>
                    <br />
                    {" "}
                    {proposal.requiredKnowledge}
                </Typography>
            )}
            {proposal.notes && (
                <Typography sx={{ mb: 2 }}>
                <span style={{ fontWeight: 'bold', fontSize: '1.1rem' }}>
                    Notes:
                </span>
                    <br />
                    <span style={{  fontSize: '1.1rem' }}>
                {proposal.notes}
                </span>
                </Typography>
            )}
          <Grid container spacing={2} sx={{ mb: 2 }}>
            <Grid item xs={2} sm={2} md={2} lg={2}>
              <Typography>
                   <span style={{ fontWeight: 'bold', fontSize: '1.2rem'}}>
                Expiration Date:
                   </span>

                <br />
              </Typography>
                <Typography
                    variant="h6"
                    component="div"
                    style={{ display: 'inline-block', marginRight: '8px'}}

                >
                    {year}
                    -
                </Typography>
                <Typography
                    variant="h6"
                    component="div"
                    style={{ display: 'inline-block', marginRight: '8px'}}
                >
                    {month}
                    -
                </Typography>
              <Typography
                variant="h6"
                component="div"
                style={{ display: 'inline-block', marginRight: '8px'}}
              >
                {day}

              </Typography>


            </Grid>
          </Grid>

          <Grid container spacing={2} sx={{ mb: 2 }}>
              <Grid item xs={6} sx={{ textAlign: "left" }}>
                  <Typography>
                 <span style={{ fontWeight: 'bold', fontSize: '1.2rem' }}>
                  Level:
                 </span>
                      <br />
                      <span style={{  fontSize: '1.1rem' }}>
                      {proposal.level}
                  </span>
                  </Typography>
              </Grid>
            <Grid item xs={6}>
              <Typography>
                  <span style={{ fontWeight: 'bold', fontSize: '1.2rem' }}>
                      Course of Study:
                  </span>
                      <br />
                  <span style={{  fontSize: '1.1rem' }}>
                      {proposal.cds}
                  </span>
              </Typography>
            </Grid>

          </Grid>


          {/* Add other fields here in the format: */}
          {/* <Typography><strong>Field Name:</strong><br /> field</Typography> */}


          <Box sx={{ display: "flex", justifyContent: "center", mt: '2rem' }}>
            <Button sx={{
                ...modalButtonStyle,
                background: '#8E0000',
                color: '#ffffff', // Set text color to white
                padding: '0.7rem 2.2rem',
                marginRight: '3rem',
                '&:hover': {
                    background: '#530303',
                    color: '#ffffff', // Set hover text color to white
                },
            }} onClick={handleClose} >
              Close
            </Button>
            <Button sx={{
                ...modalButtonStyle,
                background: '#002147',
                color: '#ffffff', // Set text color to white
                padding: '0.7rem 2.2rem',
                marginRight: '-3rem',
                '&:hover': {
                    background: '#0A3B74',
                    color: '#ffffff', // Set hover text color to white
                },
            }}
                    onClick={handleApply} >Apply</Button>
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
            {/* Close button */}
            <IconButton
                aria-label="close"
                onClick={handleClose}
                sx={{
                    position: "absolute",
                    right: "1rem",
                    top: "1rem",
                    color: "black",
                }}
            >
                <CancelOutlinedIcon sx={{ fontSize: "xx-large" }} />
            </IconButton>
            <Typography
                id="modal-modal-title"
                variant="h6"
                component="h2"
                sx={{ mt: 2, textAlign: "center",
                    fontWeight: 'bold',
                    fontSize: '1.5rem',}}

            >
                Warning
            </Typography>
            <Divider sx={{ my: 2 }} />

          <Typography sx={{ textAlign: "center", mt: 2,marginTop: 5 }}>
               <span style={{ fontWeight: 'bold', fontSize: '1.2rem' }}>
            Are you sure you want to apply to this thesis?
               </span>
          </Typography>

          {/* Nested Modal Action Buttons */}
          <Box sx={{ display: "flex", mt: 2, justifyContent: "center", marginTop: 5 }}>
            <Button sx={{
                ...modalButtonStyle,
                background: '#8E0000',
                color: '#ffffff', // Set text color to white
                padding: '0.7rem 2.2rem',
                marginRight: '3rem',
                '&:hover': {
                    background: '#530303',
                    color: '#ffffff', // Set hover text color to white
                },
            }}
                    onClick={handleChildClose}>NO</Button>
            <Button  sx={{
                ...modalButtonStyle,
                background: '#002147',
                color: '#ffffff', // Set text color to white
                padding: '0.7rem 2.2rem',
                marginRight: '-1rem',
                '&:hover': {
                    background: '#0A3B74',
                    color: '#ffffff', // Set hover text color to white
                },
            }}
                     onClick={handleYesClick}>YES</Button>
          </Box>
        </Box>
      </Modal>
        <Modal open={appModelOpen} onClose={handleAppModelClose}>
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
                {/* Close button */}
                <IconButton
                    aria-label="close"
                    onClick={handleClose}
                    sx={{
                        position: "absolute",
                        right: "1rem",
                        top: "1rem",
                        color: "black",
                    }}
                >
                    <CancelOutlinedIcon sx={{ fontSize: "xx-large" }} />
                </IconButton>
                <Typography
                    id="modal-modal-title"
                    variant="h6"
                    component="h2"
                    sx={{ mt: 2, textAlign: "center",
                        fontWeight: 'bold',
                        fontSize: '1.5rem',}}

                >
                    Submitted
                </Typography>
                <Divider sx={{ my: 2 }} />

                <Typography sx={{ textAlign: "center", mt: 2,marginTop: 5 }}>
               <span style={{ fontWeight: 'bold', fontSize: '1.2rem' }}>
            The proposal is submitted
               </span>
                </Typography>

                {/* Nested Modal Action Buttons */}
                <Box sx={{ display: "flex", mt: 2, justifyContent: "center", marginTop: 5 }}>
                    <Button  sx={{
                        ...modalButtonStyle,
                        background: '#328E39',
                        color: '#ffffff', // Set text color to white
                        padding: '0.7rem 2.2rem',
                        marginRight: '-1rem',
                        '&:hover': {
                            background: '#207726',
                            color: '#ffffff', // Set hover text color to white
                        },
                    }}
                             onClick={handleAppModelClose}>
                        ok
                    </Button>
                </Box>
            </Box>
        </Modal>
    </div>
  );
}


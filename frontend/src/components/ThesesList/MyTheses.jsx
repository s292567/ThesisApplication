// ThesesList.jsx
import React, {useState} from 'react';
import {Paper, Stack, Typography, styled, Box, useMediaQuery, useTheme,} from '@mui/material';
import {MyOutlinedButton, PastelComponent, ThesisDetail} from "../index.js";
import {useLocation} from "react-router-dom";
import {useUserContext} from "../../contexts/index.js";
import Divider from '@mui/material/Divider';


// Custom styled Paper component
const DemoPaper = styled(Paper)(({theme}) => ({
  backgroundColor: '#F4F5FF',
  width: '800px',
  [theme.breakpoints.down('md')]: {
    width: '600px',
  },
  [theme.breakpoints.down(700)]: {
    width: '500px',
  },
  [theme.breakpoints.down('sm')]: {
    width: 'auto',
  },
  padding: "2rem",
  borderRadius: "0.8rem",
  ...theme.typography.body2,
  transition: 'box-shadow .3s', // Smooth transition for shadow
  "& button": {
    display: "none",
  },
  '&:hover': {
    cursor: "pointer",
    "& button": {display: "block"},
    boxShadow: theme.shadows[24], // Elevated shadow on hover
  },
}));

const getStatusColor = (status) => {
  switch (status) {
    case 'accepted':
      return 'green';
    case 'rejected':
      return 'red';
    case 'in_progress':
      return 'orange';
    default:
      return 'black'; // Default color or adjust as needed
  }
};


const getStatusText = (status) => {
  switch (status) {
    case 'accepted':
      return 'Accepted';
    case 'rejected':
      return 'Rejected';
    case 'in_progress':
      return 'In Progress';
    default:
      return 'Unknown';
  }
};

export default function MyTheses({thesesData, isMyThesesPage}) {
  const [mythesses, setMythesses] = useState(false);
  const [status, setStatus] = useState("");
  const [selectedThesis, setSelectedThesis] = useState(null);

  const location = useLocation();
  const {homeRoute, generalRoutes, user} = useUserContext();

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const handleOpenThesisDetail = (thesis) => {
    console.log('Opening Thesis Detail:', thesis);
    setSelectedThesis(thesis);
  };


  if (thesesData === undefined) {
    thesesData = [];
  }

  const handleCloseThesisDetail = () => {
    setSelectedThesis(null);
  };


  return (

    <>

      <Stack direction="column" flexWrap="wrap" spacing={2} mb={3}
             sx={{display: 'flex', justifyContent: "center", alignItems: "flex-start",}}>

        {thesesData.map((thesis) => (
          <Box key={thesis.id} flex={1} sx={{display: 'flex'}}>
            <DemoPaper elevation={1} onClick={() => handleOpenThesisDetail(thesis)}
            >
              <Box display="flex" alignItems="center">
                <Box flex={1}>
                  <Typography variant="h4" mb={2}>
                    {thesis.title}
                  </Typography>
                  <Typography fontSize="large" mb={2}>
                    {!isMobile ? thesis.description : `${thesis.description.substring(0, 90)}...`}
                  </Typography>
                  <Stack direction="row" spacing={2}>



                    <PastelComponent
                        text={'View'}
                        textColor={"white"}
                        bgColor={'#9c8ffc'}
                        style={{width: '75px', height: '55px', borderRadius: '8px',}}
                        onClick={(event) => {
                          event.stopPropagation();
                          handleOpenThesisDetail(thesis);

                        }}
                    />
                  </Stack>
                </Box>

                <Divider orientation="vertical" flexItem/>

                <Box ml={2}>
                  <Paper
                    style={{
                      background: getStatusColor(thesis.status),
                      borderRadius: '10px',
                      padding: '8px',
                    }}>
                    <Typography style={{color: 'white'}}>
                      {getStatusText(thesis.status)}
                    </Typography>
                  </Paper>
                </Box>
              </Box>
            </DemoPaper>

          </Box>
        ))}



        {selectedThesis !== null && (
          <ThesisDetail open={true} handleClose={() => setSelectedThesis(null)} thesis={selectedThesis}
                        page={mythesses}/>
        )}


      </Stack>
    </>

  );

}
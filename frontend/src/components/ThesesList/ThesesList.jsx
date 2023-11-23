// ThesesList.jsx
import React, {useState} from 'react';
import {Paper, Stack, Typography, styled, Box, useMediaQuery, useTheme} from '@mui/material';
import {MyOutlinedButton, ThesisDetail} from "../index.js";
import {useLocation} from "react-router-dom";
import {useUserContext} from "../../contexts/index.js";

// Custom styled Paper component
const DemoPaper = styled(Paper)(({theme}) => ({
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

export default function ThesesList({thesesData}) {

  const location = useLocation();
  const {homeRoute, generalRoutes} = useUserContext();

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  // State to track the selected thesis
  const [selectedThesis, setSelectedThesis] = useState(null);

  if (thesesData === undefined) {
    thesesData = [];
  }

  // Function to handle opening a thesis detail
  const handleOpenThesisDetail = (thesis) => {
    setSelectedThesis(thesis);
  };

  // Function to handle closing the thesis detail
  const handleCloseThesisDetail = () => {
    setSelectedThesis(null);
  };

  return (
    <Box sx={{display: 'flex', flexDirection: 'column', alignItems: 'flex-start'}}>
      <Stack direction="column" flexWrap="wrap" spacing={2} mb={3}
             sx={{display: 'flex', justifyContent: "center", alignItems: "flex-start",}}>
        {thesesData.map((thesis) => (
          <Box key={thesis.id} flex={1} sx={{display: 'flex'}}>
            <DemoPaper elevation={1} onClick={() => handleOpenThesisDetail(thesis)}>
              <Typography variant="h4" mb={2}>{thesis.title}</Typography>
              <Typography fontSize="large" mb={2}>
                {!isMobile ? thesis.description : `${thesis.description.substring(0, 90)}...`}
              </Typography>

              <MyOutlinedButton text={'view'}
                                colorBorder={'orange'}
                                colorBorderHover={'red'}
                                style={{fontSize: 'large',}}
                                onClick={(event) => {
                                  event.stopPropagation(); // Prevents the paper's onClick from firing
                                  handleOpenThesisDetail(thesis);
                                }}
              />

            </DemoPaper>
          </Box>
        ))}
      </Stack>
      {(location.pathname === homeRoute) &&
        <MyOutlinedButton text={'See More Theses'}
                          colorBorder={"#003366"}
                          colorBorderHover={'#1976d2'}
                          style={{fontSize: 'large', marginLeft: '3rem'}}
                          onClick={() => {
                            window.location.href = generalRoutes.theses;
                          }}/>
      }
      <Box padding={3}></Box>

      {selectedThesis && (
        <ThesisDetail open={!!selectedThesis} handleClose={handleCloseThesisDetail} thesis={selectedThesis}/>
      )}


    </Box>
  );
}
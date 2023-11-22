// ThesesList.jsx
import React, {useState} from 'react';
import {Paper, Stack, Typography, styled, Box, Button, useMediaQuery, useTheme} from '@mui/material';
import {ThesisDetail} from "../index.js";
import {useLocation} from "react-router-dom";
import {useUserContext} from "../../contexts/index.js";

// Custom styled Paper component
const DemoPaper = styled(Paper)(({theme}) => ({
  width: '800px',
  [theme.breakpoints.down('md')]: {
    width: '600px',
  },
  [theme.breakpoints.down(700)]:{
    width: '500px',
  },
  [theme.breakpoints.down('sm')]:{
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

const myOutlineButtonStyle = (color, hoverColor) => ({
  fontWeight: "bold",
  color: `${color}`,
  border: `2px solid ${color}`,
  "&:hover": {
    color: `${hoverColor}`,
    border: `2px solid ${hoverColor}`,
    backgroundColor: 'transparent',
  },
});
export default function ThesesList({ thesesData }) {

  const location = useLocation();
  const { homeRoute } = useUserContext();

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
      <Stack direction="column" flexWrap="wrap" spacing={2} mb={3} sx={{display: 'flex', justifyContent:"center", alignItems:"flex-start",}}>
        {thesesData.map((thesis) => (
          <Box key={thesis.id} flex={1} sx={{display: 'flex'}}>
            <DemoPaper elevation={1} onClick={() => handleOpenThesisDetail(thesis)}>
              <Typography variant="h4" mb={2}>{thesis.title}</Typography>
              <Typography fontSize="large" mb={2}>
                {!isMobile ? thesis.description : `${thesis.description.substring(0, 90)}...`}
              </Typography>
              <Button variant="outlined" size="large" sx={myOutlineButtonStyle("orange", "red")} onClick={(event) => {
                event.stopPropagation(); // Prevents the paper's onClick from firing
                handleOpenThesisDetail(thesis);
              }}>View</Button>
            </DemoPaper>
          </Box>
        ))}
      </Stack>
      { (location.pathname === homeRoute) &&
      <Button variant='outlined' sx={{
        ...myOutlineButtonStyle("#003366", "#1976d2"),
        marginLeft: '2rem',
        borderRadius: '12px',
        fontSize: 'large',
      }}> See More Theses </Button>
      }
      <Box padding={3}></Box>

      {selectedThesis && (
        <ThesisDetail open={!!selectedThesis} handleClose={handleCloseThesisDetail} thesis={selectedThesis} />
      )}


    </Box>
  );
}
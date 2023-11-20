// ThesisProposalList.jsx
import React from 'react';
import {Paper, Stack, Typography, styled, Box, Button, useMediaQuery, useTheme} from '@mui/material';

// Custom styled Paper component
const DemoPaper = styled(Paper)(({theme}) => ({
    [theme.breakpoints.up('md')]: {
        maxWidth: "60%",
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
    border: `1px solid ${color}`,
    "&:hover": {
        color: `${hoverColor}`,
        border: `2px solid ${hoverColor}`,
        backgroundColor: 'transparent',
    },
});
export default function ThesisProposalList({thesesData}) {

    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));

    if (thesesData === undefined) {
        thesesData = [];
    }

    return (
        <Box sx={{flexGrow: 1, marginBottom: "2rem"}}>
            <Stack direction="column" flexWrap="wrap" justifyContent="center" alignItems="flex-start" spacing={2}
                   mb={3}>
                {thesesData.map((thesis) => (
                    <DemoPaper key={thesis.id} elevation={1} onClick={() => {
                    }}>
                        <Typography variant="h4" mb={2}>{thesis.title}</Typography>
                        <Typography fontSize="large" mb={2}>
                            {!isMobile ? thesis.description : `${thesis.description.substring(0, 90)}...`}
                        </Typography>
                        <Button variant="outlined" size="large" sx={myOutlineButtonStyle("orange", "red")}>View</Button>
                    </DemoPaper>
                ))}
            </Stack>
            <Button variant='outlined' size="x-large" sx={{
                ...myOutlineButtonStyle("#003366", "#1976d2  "),
                marginLeft: '2rem',
                borderRadius: '12px'
            }}> See More Theses </Button>
        </Box>
    );
}

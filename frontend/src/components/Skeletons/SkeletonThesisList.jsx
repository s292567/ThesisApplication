import {Box, Paper, Skeleton, Stack, styled } from "@mui/material";


// Helper component to render Skeletons
const SkeletonDemoPaper = styled(Paper)(({theme}) => ({
  height: 180, // Adjust the height to match the content of your DemoPaper
  margin: theme.spacing(2), // Provide some space around each skeleton
  padding: theme.spacing(2),
  borderRadius: "0.8rem",
  transition: 'box-shadow .3s', // Smooth transition for shadow
  boxShadow: theme.shadows[1], // Default shadow
  backgroundColor: '#F4F5FF',
  [theme.breakpoints.up('md')]: {
    width: '800px',
  },
  [theme.breakpoints.down('md')]: {
    width: '500px',
  },
  [theme.breakpoints.down('sm')]: {
    width: '280px',
  },
}));

export default function SkeletonThesisList({count}) {
  return (
    <Box sx={{display: 'flex', marginBottom: '2rem'}}>
      <Stack direction="column" flexWrap="wrap" justifyContent="center" alignItems="flex-start" spacing={2} sx={{flexGrow: 1}}>
        {Array.from({length: count}, (_, index) => (
          <SkeletonDemoPaper key={index} variant="rectangular" animation="wave">
            {/* Title Skeleton */}
            <Skeleton variant="text"
                      sx={{borderRadius: '4px', fontSize: '1.5rem', height: 40, width: '60%',}} mb={2}/>
            {/* Description Skeleton */}
            <Skeleton variant="text" sx={{borderRadius: '4px', height: 20, width: '90%',}} mb={1}/>
            <Skeleton variant="text" sx={{borderRadius: '4px', height: 20, width: '80%',}} mb={1}/>
            <Skeleton variant="text" sx={{borderRadius: '4px', height: 20, width: '70%',}} mb={1}/>
            {/* Button Skeleton */}
            <Skeleton variant="rectangular"
                      sx={{borderRadius: '12px', height: 40, width: '15%', marginTop: 2}}/>
          </SkeletonDemoPaper>
        ))}
      </Stack>
    </Box>
  );
}

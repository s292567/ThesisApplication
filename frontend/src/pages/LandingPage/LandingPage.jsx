import {Stack, Box, styled, Paper, Card, CardMedia, CardActionArea, Typography} from "@mui/material";

import politoView from '../../assets/images/politoView.jpg';
import politoBiblio from '../../assets/images/politoBiblio.jpeg';

const MyBox = styled(Box)({
  display: 'flex',
  position: 'relative', // Set the position to relative
  alignItems: 'center', // Align items vertically
  justifyContent: 'center', // Align items horizontally
  flexGrow: '1'
});

const StyledPaper = styled(Paper)(({theme}) => ({
  position: 'absolute', // Set the position to absolute
  left: theme.spacing(6), // Offset from the left
  top: theme.spacing(6), // Offset from the top
  maxWidth: '400px', // Max width of the Paper
  padding: theme.spacing(2), // Padding inside the Paper
  backgroundColor: '#ffffffeb', // Background color
  borderRadius: '18px', // Rounded corners
  zIndex: 1 // Ensure it sits above the Card
}));

export default function LandingPage() {
  return (
    <Box sx={{height: 'max-content', flexDirection: 'column', justifyContent: 'center'}}>
      <Box sx={{display: 'flex', justifyContent: 'center', padding: '2rem', marginTop: '2rem'}}>
        <Typography variant='h2' component='h1' sx={{color: '#003576', fontWeight: 'bold'}}>
          Welcome @ Politecnico di Torino
        </Typography>
      </Box>
      <Stack sx={{
        display: 'flex',
        padding: '2rem',
        gap: '4rem',
        height: 'max-content',
        flexDirection: {xs: 'column', lg: 'row'},
      }}>
        <MyBox>
          <Card sx={{display: 'flex', maxWidth: '800px', borderRadius: '18px'}} elevation={5}>
            <CardActionArea>
              <CardMedia
                component='img'
                height='600'
                image={politoBiblio}
                title="Biblio Polito"
              />
            </CardActionArea>
          </Card>
          <StyledPaper>
            <Typography variant='h4' component='h2'>
              Discover the New Biblio
            </Typography>
            <Typography>
              Explore the vast resources and modern spaces of our newly opened library at Politecnico di Torino. A hub
              of
              knowledge and innovation.
            </Typography>
          </StyledPaper>
        </MyBox>


        <MyBox>
          <Card sx={{display: 'flex', maxWidth: '800px', borderRadius: '18px'}} elevation={5}>
            <CardActionArea>
              <CardMedia
                component='img'
                height='600'
                image={politoView}
                title="View Polito"
              />
            </CardActionArea>
          </Card>
          <StyledPaper>
            <Typography variant='h4' component='h2'>
              Life at Politecnico di Torino
            </Typography>
            <Typography>
              Experience the vibrant campus life at one of Italy's most prestigious universities. An environment
              fostering
              innovation and community.
            </Typography>
          </StyledPaper>
        </MyBox>
      </Stack>
    </Box>
  )
}

import { Alert, Box, Button, Typography, styled } from "@mui/material";
import { useNavigate } from "react-router-dom";


const MyAlert = styled(Alert)(({ theme }) => ({
    position: 'absolute', // Added for absolute positioning
    top: '50%', // Center vertically
    left: '50%', // Center horizontally
    transform: 'translate(-50%, -70%)', // Adjust position to the actual center
    minWidth: '300px', // Minimum width of the alert
    maxWidth: '60%', // Maximum width of the alert
    padding: '3rem',
    borderRadius: '15px',
    border: 'none',
    justifyContent: 'center',
    display: 'flex',
}));

const ErrorText = styled(Box)(({ theme }) => ({
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: theme.spacing(2),
    marginBottom: theme.spacing(4),
}));

const PageNotFound = () => {
    const navigate = useNavigate();


    return (
        <Box sx={{
            position: 'relative', // Relative positioning for the parent
            height: '100vh', // Full height of the viewport
            width: '100%', // Full width of the viewport
            display: 'flex', // Use flexbox for centering
        }}>
            <MyAlert variant="filled" severity="error">
                <ErrorText>
                    <Typography variant="h1">404</Typography>
                    <Typography variant="h5">
                        Sorry, the page you are looking for cannot be found.
                    </Typography>
                </ErrorText>
                <Button
                    onClick={() => {navigate("/"); }}
                    variant="contained"
                    sx={{
                        borderRadius: theme => theme.shape.borderRadius,
                        border: 'none',
                        backgroundColor: '#388E3C',
                        color: 'white',
                        fontSize: 'large',
                    }}
                >
                    Go Back to the Home page
                </Button>
            </MyAlert>
        </Box>
    );
};

export default PageNotFound;

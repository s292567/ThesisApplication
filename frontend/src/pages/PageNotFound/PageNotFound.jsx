import { Alert, Box, Button, Typography, styled } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useUserContext } from "../../contexts";

const MyAlert = styled(Alert)(({ theme }) => ({
  marginTop: "5rem",
  marginBottom: "5rem",
  padding: "2rem",
  borderRadius: "13px",
  border: "none",
  justifyContent: "center",
  ".MuiAlert-message": {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "1rem",
  },
}));

const ErrorText = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  marginRight: "2rem",
  gap: "1rem",
  marginBottom: "2rem",
}));

const PageNotFound = () => {

  const navigate = useNavigate();
  const { homePageRoute } = useUserContext();

  return (
    <MyAlert variant="filled" severity="error">
      <ErrorText>
        <Typography variant="h1">404</Typography>
        <Typography variant="h5">
          Sorry, the page you are looking for cannot be found.
        </Typography>
      </ErrorText>
      <Button
        onClick={() => navigate(homePageRoute)}
        variant="contained"
        sx={{
          borderRadius: "13px",
          border: "none",
          backgroundColor: "#388E3C",
          color: "white",
          fontSize: "large",
        }}
      >
        Go Back to the Home page
      </Button>
    </MyAlert>
  );
};

export default PageNotFound;

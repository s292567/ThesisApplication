// DefaultLayoutPage.jsx
import { Box, styled } from "@mui/material";
import { Navbar } from "../../components";
import { Outlet } from "react-router-dom";

const MyMain = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  padding: "2rem",
  marginTop: "5rem",
  marginBottom: "6rem",
}));

function DefaultLayoutPage() {
  return (
    <Box>
      <Navbar />
      <MyMain>
        <Outlet />
      </MyMain>
    </Box>
  );
}

export default DefaultLayoutPage;

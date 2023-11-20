// DefaultLayoutPage.jsx
import { Box, styled } from "@mui/material";
import {BottomNavbar, Navbar} from "../../components";
import { Outlet } from "react-router-dom";
import {useUserContext} from "../../contexts";

const MyMain = styled(Box)(({ theme }) => ({
  display: "flex",
  flex: "1",
  flexDirection: "column",
  alignItems: "center",
  padding: "2rem",
  marginTop: "5rem",
  marginBottom: "6rem",
}));

function DefaultLayoutPage() {

  const { loggedIn } = useUserContext();

  return (
    <Box>
      <Navbar />
      <MyMain>
        <Outlet />
      </MyMain>
      { loggedIn && <BottomNavbar />}
    </Box>
  );
}

export default DefaultLayoutPage;

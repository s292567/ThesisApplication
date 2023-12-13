// DefaultLayoutPage.jsx
import { Box, styled } from "@mui/material";
import { Navbar, VirtualClock } from "../../components";
import { Outlet } from "react-router-dom";
import { useUserContext } from "../../contexts/index.js";

const MyMain = styled(Box)({
  display: "flex",
  flexDirection: "column",
  minHeight: "100vh",
  backgroundColor: "#FFFFFFFA",
});

function DefaultLayoutPage() {
  // it will be possible to implement here the redirection to the specific dashboard
  const { user, virtualDate } = useUserContext();

  return (
    <Box>
      <header>
        <Navbar />
      </header>
      <main>
        <MyMain>
          <Outlet />
        </MyMain>
      </main>
      <footer>
        {user ? (
          <>
            <Box sx={{ padding: "2rem" }} />
            <VirtualClock virtualDate={virtualDate} />
            <Box sx={{ padding: "3rem" }} />
          </>
        ) : null}
      </footer>
    </Box>
  );
}

export default DefaultLayoutPage;

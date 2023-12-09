// DefaultLayoutPage.jsx
import {Box, styled} from "@mui/material";
import {Navbar} from "../../components";
import {Outlet} from "react-router-dom";
import {useUserContext} from "../../contexts/index.js";

const MyMain = styled(Box)({
  display: "flex",
  flexDirection: "column",
  minHeight: "100vh",
  backgroundColor: "#FFFFFFFA",
});

function DefaultLayoutPage() {

  // it will be possible to implement here the redirection to the specific dashboard

  return (
    <Box>
      <header>
        <Navbar/>
      </header>
      <main>
        <MyMain>
          <Outlet/>
        </MyMain>
      </main>
      <footer>
      </footer>
    </Box>
  );
}

export default DefaultLayoutPage;

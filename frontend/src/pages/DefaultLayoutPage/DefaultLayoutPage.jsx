// DefaultLayoutPage.jsx
import {Box, styled} from "@mui/material";
import {Navbar} from "../../components";
import {Outlet} from "react-router-dom";
import {useUserContext} from "../../contexts/index.js";

const MyMain = styled(Box)({
  display: "flex",
  flexDirection: "column",
  minHeight: "100vh",
  alignItems: "center",
  backgroundColor: "#ebebeb",
});

function DefaultLayoutPage() {

    const { loggedIn } = useUserContext();

    return (
        <Box>
            <header>
                <Navbar/>
            </header>
            <main>
              <MyMain>
              { loggedIn ?
                <>
                <Box flex={1}  p={2} sx={{ display: { xs: "none", md: "block" } }} />
                <Box sx={{display: 'flex', flexDirection: 'column'}} flex={5} ml={3} mr={3} >
                  <Outlet/>
                </Box>
                <Box flex={1} p={2} sx={{ display: { xs: "none", md: "block" } }} />
                </>
               :
                <Outlet />
              }
              </MyMain>

            </main>
            <footer>
            </footer>
        </Box>
    );
}

export default DefaultLayoutPage;

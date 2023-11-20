// DefaultLayoutPage.jsx
import {Box, Stack, styled} from "@mui/material";
import {BottomNavbar, Navbar} from "../../components";
import {Outlet} from "react-router-dom";
import {useUserContext} from "../../contexts";

function DefaultLayoutPage() {

  const {loggedIn} = useUserContext();

  return (
    <Box>
      <Navbar/>
      <main>
        <Stack direction="column" spacing={2} justifyContent="space-between" >
          <Outlet/>
        </Stack>
      </main>
      <footer>
        {loggedIn && <BottomNavbar/>}
      </footer>
    </Box>
  );
}

export default DefaultLayoutPage;

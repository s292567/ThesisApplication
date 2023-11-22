// DefaultLayoutPage.jsx
import {Box, styled} from "@mui/material";
import {Navbar, Sidebar } from "../../components";
import {Outlet} from "react-router-dom";
import React from "react";
import {useUserContext} from "../../contexts/index.js";

const MyMain = styled(Box)(({theme}) => ({
  display: "flex",
  justifyContent: "center",
  height: "max-content",
  backgroundColor: "whitesmoke",
}));

function DefaultLayoutPage() {

    const { loggedIn } = useUserContext();

    return (
        <Box>
            <header>
                <Navbar/>
            </header>
            <main>
              { loggedIn ?
              <MyMain>
                <Box flex={1}  p={2} sx={{ display: { xs: "none", md: "block" } }} />
                <Box flex={4} ml={3} mr={3}>
                  <Outlet/>
                </Box>
                <Box flex={1} p={2} sx={{ display: { xs: "none", md: "block" } }} />
              </MyMain>
               : <Outlet />}
            </main>
            <footer>
            </footer>
        </Box>
    );
}

export default DefaultLayoutPage;

// DefaultLayoutPage.jsx
import {Box,} from "@mui/material";
import {Navbar} from "../../components";
import {Outlet} from "react-router-dom";

function DefaultLayoutPage() {

    return (
        <Box>
            <header>
                <Navbar/>
            </header>
            <main>
                <Outlet/>
            </main>
            <footer>
            </footer>
        </Box>
    );
}

export default DefaultLayoutPage;

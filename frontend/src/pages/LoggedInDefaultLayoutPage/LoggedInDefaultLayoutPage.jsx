// LoggedInDefaultLayoutPage.jsx
import { Box, Stack } from "@mui/material";
import { LoggedInNavbar } from "../../components";
import { Outlet } from "react-router-dom";

function LoggedInDefaultLayoutPage() {
  return (
    <Box>
      <LoggedInNavbar />
      <Stack direction="row" justifyContent="space-between" spacing={2}>
        <Outlet />
      </Stack>
    </Box>
  );
}

export default LoggedInDefaultLayoutPage;

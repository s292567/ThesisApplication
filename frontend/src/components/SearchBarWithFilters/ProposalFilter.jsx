import React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import Stack from "@mui/material/Stack";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import ProposalFilters from "./SearchFilters.jsx";

function ProposalFiltersWrapper(props) {
    const {
        groups,
        isDrawerOpen,
        toggleDrawer,
        filterValues,
        handleMenuInputChange,
        resetMenuFilters,
    } = props;

    return (
        <Drawer
            anchor="right"
            PaperProps={{ sx: { width: "300px", padding: "20px" } }}
            open={isDrawerOpen}
            onClose={toggleDrawer}
        >
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    height: "100vh",
                }}
            >
                <Stack direction="row" alignItems="center" justifyContent="space-between">
                    <Typography variant="h5" sx={{ py: 2, fontWeight: "bold" }}>
                        Filters
                    </Typography>
                    <Button onClick={() => toggleDrawer(false)}>Close</Button>
                </Stack>
                <Divider variant="middle" />
                <Box sx={{ mt: 2 }}>
                    {/* Additional components or content */}
                    <ProposalFilters
                        groups={groups}
                        isDrawerOpen={isDrawerOpen}
                        toggleDrawer={toggleDrawer}
                        filterValues={filterValues}
                        handleMenuInputChange={handleMenuInputChange}
                        resetMenuFilters={resetMenuFilters}
                    />
                </Box>
            </Box>
        </Drawer>
    );
}

export default ProposalFiltersWrapper;

import dayjs from "dayjs";
import Autocomplete from "@mui/material/Autocomplete";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import FormControl from "@mui/material/FormControl";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import CloseIcon from "@mui/icons-material/Close";
import FilterAltOffIcon from "@mui/icons-material/FilterAltOff";
import FilterListIcon from "@mui/icons-material/FilterList";
import { DatePicker } from "@mui/x-date-pickers";
import { TYPES } from "./utils/constants.js";

function ProposalFilters(props) {
  const { groups, isDrawerOpen, toggleDrawer, filterValues, handleMenuInputChange, resetMenuFilters } = props;

  return (
    <>
      <Button variant="outlined" onClick={toggleDrawer} endIcon={<FilterListIcon />}>
        Filters
      </Button>
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
            <Tooltip title="Close filters">
              <IconButton onClick={() => toggleDrawer(false)}>
                <CloseIcon />
              </IconButton>
            </Tooltip>
          </Stack>
          <Divider variant="middle" />
          <Box sx={{ mt: 2 }}>
            <Typography variant="h6" sx={{ my: 1 }}>
              Select Types:
            </Typography>
            <FormControl fullWidth sx={{ my: 2 }}>
              <Autocomplete
                size="small"
                multiple
                options={TYPES}
                value={filterValues.type}
                onChange={(event, value) => handleMenuInputChange("type", value)}
                filterSelectedOptions
                renderInput={(params) => <TextField {...params} label="Types" />}
              />
            </FormControl>
            <Typography variant="h6" sx={{ my: 1 }}>
              Select Groups:
            </Typography>
            <FormControl fullWidth sx={{ my: 2 }}>
              <Autocomplete
                size="small"
                multiple
                options={groups.map((group) => group.cod_group)}
                value={filterValues.groups}
                onChange={(event, value) => handleMenuInputChange("groups", value)}
                renderInput={(params) => <TextField {...params} label="Groups" />}
              />
            </FormControl>
            <Divider variant="middle" sx={{ my: 2 }} />
            <Typography variant="h6" sx={{ my: 1 }}>
              Expiration Date Range:
            </Typography>
            <FormControl fullWidth sx={{ my: 2 }}>
              <Stack spacing={2}>
                <DatePicker
                  format="DD/MM/YYYY"
                  label="Start Date"
                  value={filterValues.startDate ? dayjs(filterValues.startDate) : null}
                  onChange={(newValue) => handleMenuInputChange("startDate", dayjs(newValue).format("YYYY-MM-DD"))}
                  slotProps={{
                    textField: {
                      variant: "outlined",
                      size: "small",
                    },
                  }}
                />
                <DatePicker
                  format="DD/MM/YYYY"
                  label="End Date"
                  value={filterValues.endDate ? dayjs(filterValues.endDate) : null}
                  onChange={(newValue) => handleMenuInputChange("endDate", dayjs(newValue).format("YYYY-MM-DD"))}
                  slotProps={{
                    textField: {
                      variant: "outlined",
                      size: "small",
                    },
                  }}
                />
              </Stack>
            </FormControl>
          </Box>
          <Box sx={{ mt: "auto" }}>
            <Button
              fullWidth
              variant="contained"
              sx={{ my: 2, backgroundColor: "#4caf50", color: "#fff" }}
              onClick={resetMenuFilters}
              endIcon={<FilterAltOffIcon />}
            >
              Clear filters
            </Button>
          </Box>
        </Box>
      </Drawer>
    </>
  );
}

export default ProposalFilters;

import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  InputBase,
  IconButton,
  Button,
  Modal,
  Box,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import FilterListIcon from "@mui/icons-material/FilterList";
import { styled, alpha } from "@mui/material/styles";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}));

const RoundShapeLabel = styled("div")(({ checked }) => ({
  borderRadius: "15px",
  padding: "5px 10px",
  backgroundColor: checked ? "blue" : "whitesmoke",
  color: checked ? "white" : "black",
  cursor: "pointer",
  userSelect: "none",
  margin: "5px 0",
  display: "inline-block",
}));

const SearchAppBar = () => {
  const [searchInput, setSearchInput] = useState("");

  const defaultChecked = {
    title: false,
    supervisor: false,
    coSupervisors: false,
    keywords: false,
    type: false,
    groups: false,
    description: false,
    requiredKnowledge: false,
    notes: false,
    expiration: false,
    Msc: false,
    Bsc: false,
    cds: false,
  };

  const [checked, setChecked] = useState({ ...defaultChecked });
  const [open, setOpen] = useState(false);

  const handleSearch = () => {
    let searchParams = Object.keys(checked).reduce((acc, key) => {
      if (checked[key] && key !== "Msc" && key !== "Bsc") {
        acc[key] = searchInput;
      }
      return acc;
    }, {});

    // Handle Msc and Bsc fields separately
    // i'm not sure HOW TO DO THAT.... it depepnds on the backend
    if (checked.Msc || checked.Bsc) {
      searchParams.level = [];
      if (checked.Msc) {
        searchParams.level.push("Msc");
      }
      if (checked.Bsc) {
        searchParams.level.push("Bsc");
      }
    }

    if ((Object.keys(searchParams).length === 0)) {
      // Perform normal search query
      getSearchCall(searchInput);
    } else {
      // Perform search query with filters
      getSearchCall(searchParams);
    }
  };

  const getSearchCall = (queryParams) => {
    console.log("Search Query:", queryParams);
    // Implement your search query logic here
  };

  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ "aria-label": "search" }}
              onChange={(e) => setSearchInput(e.target.value)}
            />
          </Search>
          <IconButton onClick={handleSearch} color="inherit">
            <SearchIcon /> search
          </IconButton>
          <Button
            color="inherit"
            onClick={() => {
              setOpen(true);
            }}
          >
            <FilterListIcon />
          </Button>
        </Toolbar>
      </AppBar>
      <CheckBoxes
        defaultChecked={defaultChecked}
        checked={checked}
        setChecked={setChecked}
        open={open}
        setOpen={setOpen}
        handleSearch={handleSearch}
      />{" "}
    </div>
  );
};

const CheckBoxes = ({
  defaultChecked,
  checked,
  setChecked,
  open,
  setOpen,
  handleSearch,
}) => {
  const handleCheckChange = (key) => {
    setChecked({ ...checked, [key]: !checked[key] });
  };

  const handleClear = () => {
    setChecked({ ...defaultChecked });
  };

  const handleApply = () => {
    handleSearch();
    setOpen(false);
  };

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 4,
  };

  return (
    <div>
      <Modal
        open={open}
        onClose={() => {
          setOpen(false);
        }}
      >
        <Box sx={style}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
            }}
          >
            {Object.keys(checked).map((key) => (
              <RoundShapeLabel
                key={key}
                checked={checked[key]}
                onClick={() => handleCheckChange(key)}
              >
                {key}
              </RoundShapeLabel>
            ))}
          </Box>
          <Button onClick={handleClear}>Clear Filters</Button>
          <Button onClick={handleApply}>Apply</Button>
        </Box>
      </Modal>
    </div>
  );
};

export default SearchAppBar;

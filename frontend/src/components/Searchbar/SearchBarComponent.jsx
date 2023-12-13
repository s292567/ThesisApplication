// SearchBarComponent.jsx
/* eslint-disable react/prop-types */
import { Search } from "@mui/icons-material";
import { InputAdornment, TextField } from "@mui/material";

export default function SearchBarComponent({ value, onClick, onSearch, style={} }) {
  return (
    <TextField
      placeholder={value || "Search"}
      variant="outlined"
      onClick={onClick}
      fullWidth
      onChange={(e) => onSearch(e.target.value)}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <Search />
          </InputAdornment>
        ),
      }}
      sx={{
        width: "80%",
        backgroundColor: "white",
        borderRadius: "20px",
        "& .MuiOutlinedInput-root": {
          borderRadius: "20px",
          "& fieldset": {
            borderColor: "#2192FF",
          },
          "&:hover fieldset": {
            borderColor: "#2192FF",
          },
          "&.Mui-focused fieldset": {
            borderColor: "#2192FF",
          },
        },
        ...style,
      }}
    />
  );
}

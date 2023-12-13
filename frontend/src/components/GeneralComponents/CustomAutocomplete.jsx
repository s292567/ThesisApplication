// CustomAutocomplete.jsx
import { useState } from "react";
import { Autocomplete, TextField, createFilterOptions } from "@mui/material";

const filter = createFilterOptions();

export default function CustomAutocomplete({
  label,
  value,
  options,
  onChange,
  name,
  multiple = true,
  allowNewValues = false,
  style = {},
}) {
  // State to store the input value
  const [inputValue, setInputValue] = useState("");

  // Sort options alphabetically
  const sortedOptions = Array.isArray(options)
    ? options.sort((a, b) => {
      // Assuming 'a' and 'b' are strings. If they are objects, use a.name.localeCompare(b.name)
      return a.localeCompare(b);
    })
    : [];

  // Function to determine whether the selected option matches the value
  const isOptionEqualToValue = (option, value) => {
    return option === value || value === "";
  };

  // Function to handle when new value is added
  const handleInputChange = (event, newInputValue) => {
    setInputValue(newInputValue);
  };

  // Function to handle when the value is changed (selected from dropdown or entered)
  const handleChange = (event, newValue, role) => {
    if ((role === "input" || role === "selectOptions") && allowNewValues) {
      onChange(event, [...value, inputValue], name);
      setInputValue("");
    } else {
      onChange(event, newValue, name);
    }
  };

  return (
    <Autocomplete
      multiple={multiple}
      options={sortedOptions}
      value={value}
      onChange={handleChange}
      isOptionEqualToValue={isOptionEqualToValue}
      onInputChange={handleInputChange}
      fullWidth
      filterOptions={(options, params) => {
        const filtered = filter(options, params);

        const { inputValue } = params;

        const isExisting = options.some((option) => inputValue === option);
        if (inputValue !== "" && !isExisting && allowNewValues) {
          filtered.push(inputValue);
        }

        return filtered;
      }}
      filterSelectedOptions
      freeSolo={allowNewValues}
      inputValue={inputValue}
      renderInput={(params) => (
        <TextField
          {...params}
          label={label}
          sx={{
            "& .MuiOutlinedInput-root": {
              // Target the outline input root
              borderRadius: "18px", // Set the border radius
              backgroundColor: "white",
              fontSize: "1.2rem",
              "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                // Target the border when focused
                borderColor: "#2192FF", // Change to your desired color
              },
            },
            "& .MuiFormLabel-root": {
              color: "#40128B",
            },
            width: "90%",
            fontWeight: "bold",
          }}
        />
      )}
      sx={{
        marginBottom: "1rem",
        marginTop: "1rem",
        "& .MuiChip-root": {
          fontSize: "1.1rem",
          backgroundColor: "#40128B",
          color: "white",
          fontWeight: "bold",
        },
        "& .MuiChip-deleteIcon": {
          color: "white !important",
        },
        ...style,
      }}
    />
  );
}

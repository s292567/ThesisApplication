// AsynchronousAutocomplete.jsx
import { TextField, Autocomplete, createFilterOptions } from "@mui/material";


// AUTOCOMPLETE NOT WORKING AT ALL AND IT IS SHITTY

export default function AsynchronousAutocomplete({
  label,
  options,
  value,
  onChange,
  multiple,
  createValue = false,
}) {
  if (multiple) {
    return (
      <Autocomplete
        multiple
        id={`${label}-autocomplete`}
        options={options}
        renderInput={(params) => (
          <TextField {...params} label={label} placeholder={label} />
        )}
        sx={{ marginTop: "1rem", width: "60%" }}
      />
    );
  } else {
    return (
      <Autocomplete
        fullWidth
        id={`${label}-autocomplete`}
        disablePortal
        onChange={onChange}
        filterSelectedOptions
        
        options={options}
        renderInput={(params) => <TextField {...params} label={label} />}
        sx={{ marginTop: "1rem", width: "60%" }}
      />
    );
  }
}

// FilterTag.jsx
import { Chip } from '@mui/material';

export default function FilterTag({ label, onRemove }) {
  return (
    <Chip
      label={label}
      onDelete={onRemove}
      variant="filled"
      sx={{
        m: 0.5,
        paddingX: "0.5rem",
        paddingY: "1.2rem",
        border: "none",
        fontSize: "1rem",
        fontWeight: "bold",
        borderRadius: "20px",
        backgroundColor: "#2192FF",
        color: "white",
        "& .MuiChip-deleteIcon": {
          color: "white",
        },
        
      }}
    />
  );
}

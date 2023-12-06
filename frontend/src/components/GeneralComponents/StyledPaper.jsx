// StyledPaper.jsx
import { Paper, styled } from "@mui/material";

const StyledPaper = styled(Paper)(({ theme }) => ({
  maxWidth: "100%",
  backgroundColor: "#F4F5FF",
  padding: "2rem",
  borderRadius: "0.8rem",
  ...theme.typography.body2,
  transition: "box-shadow .3s",
  "& button": {
    display: "none",
  },
  "&:hover": {
    cursor: "pointer",
    "& button": { display: "block" },
    boxShadow: theme.shadows[24],
  },
}));

export default StyledPaper;

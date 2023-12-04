import { Typography } from "@mui/material";

export default function SectionTitle({ text }) {
  return (
    <>
      <Typography
        variant="h3"
        color={"orange"}
        mb={3}
        sx={{
          marginTop: "3rem",
          marginBottom: "2rem",
          padding: "1rem",
          display: "flex",
          justifyContent: "center",
        }}
      >
        {text}
      </Typography>
    </>
  );
}

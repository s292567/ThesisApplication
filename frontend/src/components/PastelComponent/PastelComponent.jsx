import React from "react";
import { Button, Paper } from "@mui/material";

export default function PastelComponent({
    bgColor,
    textColor,
    text,
    fontSize,
    onClick,
    endIcon,
    style,
  }) {
  
    const stylePastel = {
      backgroundColor: bgColor,
      color: textColor,
      fontSize: fontSize,
      borderRadius: "18px",
      width: "100%",
      height: "100%",
      padding: "6px 12px",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      fontWeight: "bold",
      ...style,
    };
    
    if (!endIcon) {
      endIcon = undefined;
    }

    return onClick ? (
      <Button
        variant="text"
        onClick={onClick}
        sx={{
          ...stylePastel,
          "&:hover": {
            backgroundColor: bgColor,
            color: textColor,
          },
          ...style,
        }}
        endIcon={endIcon}
      >
        {text}
      </Button>
    ) : (
      <Paper
        elevation={0}
        sx={{
          ...stylePastel,
          ...style,
        }}
      >
        {text}
      </Paper>
    );

}
  
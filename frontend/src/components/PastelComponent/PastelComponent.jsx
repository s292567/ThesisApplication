// PastelComponent.jsx
import React from "react";
import {Button, Paper, Box} from "@mui/material";

export default function PastelComponent({
                                          bgColor,
                                          textColor,
                                          text = "",
                                          icon = null,
                                          fontSize = "1rem",
                                          onClick = null,
                                          style = {},
                                        }) {
  const stylePastel = {
    backgroundColor: bgColor,
    color: textColor,
    fontSize: fontSize,
    borderRadius: "18px",
    width: 'fit-content',
    height: 'fit-content',
    padding: "6px 12px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontWeight: "bold",
    ...style,
  };

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
    >
      {icon !== null ? icon : null}
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
      {icon && <Box component="span" sx={{marginRight: "8px"}}>{icon}</Box>}
      {text}
    </Paper>
  );
}

// ThesesList.jsx
import React, { useState } from "react";
import {
  Paper,
  Stack,
  Typography,
  styled,
  Box,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { MyOutlinedButton, ThesisDetail } from "../index.js";
import {useLocation, useNavigate} from "react-router-dom";
import { useUserContext } from "../../contexts/index.js";

export default function ThesesList({ thesesData }) {
  const location = useLocation();
  const { homeRoute, generalRoutes } = useUserContext();
  const navigate = useNavigate();

  if (thesesData === undefined) {
    thesesData = [];
  }

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
      }}
    >
      <Stack
        direction="column"
        flexWrap="wrap"
        spacing={2}
        mb={3}
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "flex-start",
        }}
      >
        {thesesData.map((thesis) => {
          return <ThesisRow key={thesis.id} thesis={thesis}/>
        })}
      </Stack>
      {location.pathname === homeRoute && (
        <MyOutlinedButton
          text={"See More Theses"}
          colorBorder={"#003366"}
          colorBorderHover={"#1976d2"}
          style={{ fontSize: "large", marginLeft: "3rem" }}
          onClick={() => {
            navigate(generalRoutes.theses);
          }}
        />
      )}
      <Box padding={3}></Box>
    </Box>
  );
}

// ThesisRow.jsx
const StyledPaper = styled(Paper)(({ theme }) => ({
  width: "800px",
  [theme.breakpoints.down("md")]: {
    width: "600px",
  },
  [theme.breakpoints.down(700)]: {
    width: "500px",
  },
  [theme.breakpoints.down("sm")]: {
    width: "auto",
  },
  backgroundColor: '#F4F5FF',
  padding: "2rem",
  borderRadius: "0.8rem",
  ...theme.typography.body2,
  transition: "box-shadow .3s", // Smooth transition for shadow
  "& button": {
    display: "none",
  },
  "&:hover": {
    cursor: "pointer",
    "& button": { display: "block" },
    boxShadow: theme.shadows[24], // Elevated shadow on hover
  },
}));

export function ThesisRow({ thesis, style={backgroundColor: '#F4F5FF'} }) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [detailOpen, setDetailOpen] = useState(false);

  const handleOpenDetail = () => {
    setDetailOpen(true);
  };

  const handleCloseDetail = () => {
    setDetailOpen(false);
  };

  return (
    <>
      <Box flex={1} sx={{ display: "flex" }}>
        <StyledPaper elevation={1} onClick={handleOpenDetail} sx={{...style}}>
          <Typography variant="h4" mb={2}>
            {thesis.title}
          </Typography>
          <Typography fontSize="large" mb={2}>
            {!isMobile
              ? thesis.description
              : `${thesis.description.substring(0, 90)}...`}
          </Typography>
          <MyOutlinedButton
            text={"View"}
            colorBorder={"orange"}
            colorBorderHover={"red"}
            style={{ fontSize: "large" }}
            onClick={(event) => {
              event.stopPropagation();
              handleOpenDetail();
            }}
          />
        </StyledPaper>
      </Box>

      <ThesisDetail
        open={detailOpen}
        handleClose={handleCloseDetail}
        thesis={thesis}
      />
    </>
  );
}

// ThesesList.jsx
import React, { useState } from "react";
import {
  Paper,
  Stack,
  Typography,
  styled,
  Box,
  Alert,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { MyOutlinedButton, ThesisDetail } from "../index.js";
import {useLocation, useNavigate} from "react-router-dom";
import { useUserContext } from "../../contexts/index.js";
import EditModal from "../EditProposal/Modal.jsx";
import Snackbar from '@mui/material/Snackbar';

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


        {thesesData.map((thesis) => (
          <ThesisRow key={thesis.id} thesis={thesis}
          />
        ))}
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

export function ThesisRow({ thesis }) {
  const [thessespage, setThessepage] = useState(true);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [detailOpen, setDetailOpen] = useState(false);
  const [edit, setEdit] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const { userId, user } = useUserContext();

  const handleOpenDetail = () => {
    setDetailOpen(true);
  };

  setTimeout(() => {
    setSnackbarOpen(false);
  }, 5000)
  const handleCloseDetail = () => {
    setDetailOpen(false);
  };

  return (
    <>
      <Box flex={1} sx={{ display: "flex" }}>
        <StyledPaper elevation={1} >
          <Typography variant="h4" mb={2}>
            {thesis.title}
          </Typography>
          <Typography fontSize="large" mb={2}>
            {!isMobile
              ? thesis.description
              : `${thesis.description.substring(0, 90)}...`}
          </Typography>
          <Stack direction="row" spacing={2}>
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
          {user.role === 'Professor' && (
              <>
                <MyOutlinedButton text={'edit'}
                                  colorBorder={'green'}
                                  colorBorderHover={'darkgreen'}
                                  style={{fontSize: 'large',}}
                                  onClick={(event) => {
                                    event.stopPropagation();
                                    setEdit(true);
                                  }}

                />
                <MyOutlinedButton text={'delete'}
                                  colorBorder={'red'}
                                  colorBorderHover={'darkred'}
                                  style={{fontSize: 'large',}}
                />
              </>
          )}
          </Stack>
        </StyledPaper>
      </Box>

      <ThesisDetail
        open={detailOpen}
        handleClose={handleCloseDetail}
        thesis={thesis}
        page={thessespage}
      />

      <EditModal
        open={edit}
        setEdit={setEdit}
        setSnackbarOpen={setSnackbarOpen}
        thesis={thesis}
      />

      <Snackbar
          open={snackbarOpen}
          sx={{ width: '400px', height: '200px'}}

      >
        <Alert severity="success" sx={{ width: '100%' }}>
          Update successful!
        </Alert>
      </Snackbar>
    </>
  );
}

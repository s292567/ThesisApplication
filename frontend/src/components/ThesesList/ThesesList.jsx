// ThesesList.jsx
import { Stack, Box, Grid } from "@mui/material";
import { MyOutlinedButton, ThesisRow } from "../index.js";
import { useLocation, useNavigate } from "react-router-dom";
import { useUserContext } from "../../contexts";

export default function ThesesList({ thesesData, reload }) {
  const location = useLocation();
  const { homeRoute, generalRoutes } = useUserContext();
  const navigate = useNavigate();

  if (thesesData === undefined) {
    thesesData = [];
  }
  const newReload = () => {
    reload();
  };
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        flexGrow: 1,
      }}
    >
      <Grid container direction="column" justifyContent="center" spacing={3}>
        {thesesData.map((thesis) => {
          return (
            <Grid key={thesis.id} container item justifyContent="center">
              <Grid item xs={10} sm={10} md={8} lg={6} xl={5}>
                <ThesisRow key={thesis.id} thesis={thesis} reload={newReload} />
              </Grid>
            </Grid>
          );
        })}
        {location.pathname === homeRoute && (
          <Grid container item justifyContent="center">
            <MyOutlinedButton
              text={"See More Theses"}
              colorBorder={"#003366"}
              colorBorderHover={"#1976d2"}
              style={{ fontSize: "large", }}
              onClick={() => {
                navigate(generalRoutes.theses);
              }}
            />
          </Grid>
        )}
      </Grid>
      <Box padding={3}></Box>
    </Box>
  );
}

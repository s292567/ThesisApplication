// ThesesList.jsx
import { Box, Grid } from "@mui/material";
import { ThesisRow } from "../index.js";
import { useLocation } from "react-router-dom";
import { useUserContext } from "../../contexts";
import { frontendRoutes } from "../../routes/index.js";

export default function ThesesList({
  thesesData,
  handleDelete = () => {},
  handleCopy = () => {},
  handleEdit = () => {},
  handleArchive = () => {},
}) {
  const location = useLocation();
  const { homeRoute } = useUserContext();

  if (thesesData === undefined) {
    thesesData = [];
  }

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
                <ThesisRow
                  key={thesis.id}
                  thesis={thesis}
                  actions={location.pathname !== homeRoute && location.pathname !== frontendRoutes.professorArchivedTheses}
                  onDelete={handleDelete}
                  onCopy={handleCopy}
                  onEdit={handleEdit}
                  onArchive={handleArchive}
                />
              </Grid>
            </Grid>
          );
        })}
      </Grid>
      <Box padding={3}></Box>
    </Box>
  );
}

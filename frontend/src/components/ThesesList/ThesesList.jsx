// ThesesList.jsx
import {
  Stack,
  Box,
} from "@mui/material";
import { MyOutlinedButton, ThesisRow } from "../index.js";
import {useLocation, useNavigate} from "react-router-dom";
import { useUserContext } from "../../contexts";

export default function ThesesList({ thesesData, reload }) {
  const location = useLocation();
  const { homeRoute, generalRoutes } = useUserContext();
  const navigate = useNavigate();

  if (thesesData === undefined) {
    thesesData = [];
  }
    const newReload=()=>{
        reload()
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
          return <ThesisRow key={thesis.id} thesis={thesis} reload={newReload}/>
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


// SkeletonApplicants.jsx

import { Box, Grid, Paper, Skeleton, styled } from "@mui/material";
import context from "react-bootstrap/esm/AccordionContext";

const MySkeletonWrapper = styled(Paper)({
  maxWidth: "1000px",
  borderRadius: "18px",
  height: '100px',
  backgroundColor: "#F4F5FF",
  padding: "2rem",
  display: "flex",
  flex: 1,
  flexDirection: "row",
});

export default function SkeletonApplicants({ count }) {
  return (
    <Box sx={{display: 'flex', height: 'max-context', padding: '1rem'}}>
      <Grid container spacing={2}>
        {Array.from({ length: count }, (_, index) => (
          <Grid item container key={index} sx={{ justifyContent: "center" }}>
            <Grid item xs={20}>
              <MySkeletonWrapper elevation={1}>
                <Skeleton
                  variant="rectangular"
                  width="90%"
                  height={40}
                  sx={{
                    marginRight: "2rem",
                  }}
                />

                <Skeleton
                  variant="rectangular"
                  width={45}
                  height={35}
                  sx={{
                    borderRadius: "8px",
                  }}
                />
              </MySkeletonWrapper>
            </Grid>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

// SkeletonApplicants.jsx
/* eslint-disable react/prop-types */
import { Box, Grid, Paper, Skeleton, styled } from "@mui/material";

export default function SkeletonApplicants({ count }) {
  return (
    <Box sx={{display: 'flex', height: 'max-context', padding: '1rem', paddingTop: '2rem'}}>
      <Grid container direction="column" justifyContent="center" spacing={3}>
        {Array.from({ length: count }, (_, index) => (
          <Grid container item key={index} sx={{ justifyContent: "center" }}>
            <Grid item xs={10} sm={10} md={10} lg={8} xl={6}>
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

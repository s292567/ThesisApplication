/* eslint-disable react/prop-types */
import { StyledPaper } from "../index";
import { Grid, Typography } from "@mui/material";


export default function NoDataDisplayed({textNoDataDisplayed="No data available"}) {
  
  return (
    // I want to have a grid wrapper that set the grid nested at the center of the page and inside the grid I want the StyledPaper component with a Typography component inside it at the center of it with the text inside the variable textNoDataDisplayed and I want that grid to be at the center of the page and with a widht that depeds on the size of the window
    <Grid container justifyContent="center" alignItems="center" sx={{ width: "100%", marginTop: "1rem" }}>
      <Grid item xs={10} sm={10} md={8} lg={6} xl={5}>
        <StyledPaper>
          <Typography variant="h3" align="center" color={"darkblue"}>
            {textNoDataDisplayed}
          </Typography>
        </StyledPaper>
      </Grid>
    </Grid>
  );
}
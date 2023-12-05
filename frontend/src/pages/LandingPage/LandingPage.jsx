import {
  Stack,
  Box,
  styled,
  Paper,
  Card,
  CardMedia,
  CardActionArea,
  Typography,
} from "@mui/material";

import politoView from "../../assets/images/politoView.jpg";
import politoBiblio from "../../assets/images/politoBiblio.jpeg";

export default function LandingPage() {
  const cardData = [
    {
      image: politoBiblio,
      title: "Discover the New Biblio",
      description:
        "Explore the vast resources and modern spaces of our newly opened library at Politecnico di Torino. A hub of knowledge and innovation.",
    },
    {
      image: politoView,
      title: "Experience the Campus Life",
      description:
        "Immerse yourself in the vibrant campus life at Politecnico di Torino. Engage with diverse cultures and cutting-edge technology.",
    },
  ];

  return (
    <Box
      sx={{
        display: "flex",
        height: "max-content",
        flexDirection: "column",
        justifyContent: "center",
        flexWrap: "wrap",
        alignContent: "center",
      }}
    >
      <Typography
        variant="h2"
        component="h1"
        sx={{
          color: "#003576",
          fontWeight: "bold",
          padding: "1rem",
          display: "flex",
          flexDirection: "column",
          flexWrap: "wrap",
          alignContent: "center",
          marginTop: "1rem",
        }}
      >
        Welcome @ Politecnico di Torino
      </Typography>

      <Stack
        sx={{
          display: "flex",
          padding: "2rem",
          gap: "4rem",
          height: "max-content",
          flexDirection: { xs: "column", lg: "row" },
        }}
      >
        {cardData.map((card, index) => (
          <Box sx={{ position: "relative" }} key={index}>
            <Card
              sx={{ display: "flex", maxWidth: "800px", borderRadius: "18px" }}
              elevation={5}
            >
              <CardActionArea>
                <CardMedia
                  component="img"
                  height="600"
                  image={card.image}
                  title={`Image ${index + 1}`}
                />
              </CardActionArea>
            </Card>
            <Paper
              sx={{
                position: "absolute",
                top: "2rem",
                left: "2rem",
                zIndex: 10,
                maxWidth: { sm: "400px", xs: "200px" },
                padding: "1rem",
                backgroundColor: "#ffffffeb",
                borderRadius: "18px",
              }}
            >
              <Typography variant="h4" component="h2">
                {card.title}
              </Typography>
              <Typography>{card.description}</Typography>
            </Paper>
          </Box>
        ))}
      </Stack>
    </Box>
  );
}

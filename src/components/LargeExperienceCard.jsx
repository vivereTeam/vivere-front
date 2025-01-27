import React from "react";
import { Card, CardMedia, CardContent, Typography, Button, Box } from "@mui/material";

const LargeExperienceCard = ({ event }) => {
  return (
    <Card
      sx={{
        display: "flex",
        flexDirection: "row",
        maxWidth: "800px",
        margin: "20px auto",
        borderRadius: "16px",
        boxShadow: "0px 6px 12px rgba(0, 0, 0, 0.1)",
      }}
    >
      {/* Placeholder para imagem */}
      <CardMedia
        component="img"
        sx={{ width: "300px", objectFit: "cover" }}
        image={event.imageUrl}
        alt={event.title}
      />
      {/* Conteúdo textual */}
      <CardContent sx={{ flex: "1", padding: "16px" }}>
        <Typography variant="subtitle2" color="text.secondary" gutterBottom>
          {event.date}
        </Typography>
        <Typography variant="h5" component="div" gutterBottom>
          {event.title}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ marginBottom: "16px" }}>
          {event.location}
        </Typography>
        <Typography variant="body1" color="text.primary" sx={{ marginBottom: "16px" }}>
          {event.description}
        </Typography>
        <Box mt="auto" display="flex" justifyContent="space-between">
          <Button variant="outlined" size="small">
            Mais informações
          </Button>
          <Button variant="contained" color="primary" size="small">
            Reservar
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};

export default LargeExperienceCard;

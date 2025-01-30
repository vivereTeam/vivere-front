import PropTypes from "prop-types";
import { Card, CardMedia, CardContent, Typography, Button, Box } from "@mui/material";

const LargeExperienceCard = ({ event }) => {
  return (
    <Card
      sx={{
        display: "flex",
        flexDirection: "row",
        width: "100%",
        height: "450px",
        margin: "20px auto",
        borderRadius: "16px",
        boxShadow: "0px 6px 12px rgba(0, 0, 0, 0.1)",
      }}
    >
      {/* Imagem */}
      <CardMedia
        component="img"
        sx={{ 
          width: "70%", 
          objectFit: "cover" 
        }}
        image={event.imageUrl}
        alt={event.title}
      />
      
      {/* Conteúdo textual */}
      <CardContent 
        sx={{ 
          flex: "1", 
          padding: "20px", 
          display: "flex", 
          flexDirection: "column" 
        }}
      >
        <Typography variant="subtitle2" color="text.secondary" gutterBottom>
          {event.date}
        </Typography>
        <Typography variant="h5" component="div" gutterBottom>
          {event.title}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ marginBottom: "16px" }}>
          {event.location}
        </Typography>
        <Typography 
          variant="body1" 
          color="text.primary" 
          sx={{ flexGrow: 1 }}
        >
          {event.details}
        </Typography>

        {/* Botões sempre no final */}
        <Box display="flex" justifyContent="space-between">
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

LargeExperienceCard.propTypes = {
  event: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired, 
    imageUrl: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    location: PropTypes.string.isRequired,
    details: PropTypes.string.isRequired,
  }).isRequired,
};

export default LargeExperienceCard;

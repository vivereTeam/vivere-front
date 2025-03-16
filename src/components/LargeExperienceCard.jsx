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
        image={event.imagemUrl}
        alt={event.titulo}
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
          {event.dataInicio}
        </Typography>
        <Typography variant="h5" component="div" gutterBottom>
          {event.titulo}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ marginBottom: "16px" }}>
          {event.endereco}
        </Typography>
        <Typography 
          variant="body1" 
          color="text.primary" 
          sx={{ 
            flexGrow: 1,
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            display: '-webkit-box',
            WebkitLineClamp: 3,
            WebkitBoxOrient: 'vertical',
          }}
        >
          {event.descricao}
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
    imagemUrl: PropTypes.string.isRequired,
    dataInicio: PropTypes.string.isRequired,
    titulo: PropTypes.string.isRequired,
    endereco: PropTypes.string.isRequired,
    descricao: PropTypes.string.isRequired,
  }).isRequired,
};

export default LargeExperienceCard;
import PropTypes from "prop-types";
import { Card, CardMedia, CardContent, Typography, Button, Box, IconButton, Tooltip } from "@mui/material";
import { Close } from "@mui/icons-material";

const LargeExperienceCard = ({ event, removeExperience }) => {
  const handleRemove = async (e) => {
    e.stopPropagation();

    if (window.confirm(`Tem certeza que deseja remover "${event.titulo}"?`)) {
      try {
        await removeExperience(event.categoria, event.id);
      } catch (error) {
        console.error('Erro ao remover evento:', error);
        alert('Ocorreu um erro ao remover o evento. Tente novamente.');
      }
    }
  };

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
        position: 'relative',
      }}
    >
      <Tooltip title="Remover" arrow>
        <IconButton 
          onClick={handleRemove}
          sx={{ 
            position: 'absolute', 
            top: 8, 
            right: 8, 
            backgroundColor: 'rgba(255, 255, 255, 0.7)',
            '&:hover': {
              backgroundColor: 'rgba(255, 255, 255, 1)',
            },
          }}
          size="small"
        >
          <Close fontSize="small" color="action" />
        </IconButton>
      </Tooltip>

      <CardMedia
        component="img"
        sx={{ 
          width: "70%", 
          objectFit: "cover" 
        }}
        image={event.imagemUrl}
        alt={event.titulo}
      />
      
      <CardContent 
        sx={{ 
          flex: "1", 
          padding: "20px", 
          display: "flex", 
          flexDirection: "column" 
        }}
      >
        <Typography variant="subtitle2" color="text.secondary" gutterBottom>
          {event.dataInicio ? new Date(event.dataInicio).toLocaleDateString() : "Data não informada"}
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

        <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
          Preço: {event.preco === 0 ? "Gratuito" : event.preco ? `R$ ${event.preco.toFixed(2)}` : "Preço não informado"}
        </Typography>

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
    dataInicio: PropTypes.string,
    titulo: PropTypes.string.isRequired,
    endereco: PropTypes.string.isRequired,
    descricao: PropTypes.string.isRequired,
    categoria: PropTypes.string.isRequired,
    preco: PropTypes.oneOfType([PropTypes.number, PropTypes.oneOf([null])]),
  }).isRequired,
  removeExperience: PropTypes.func.isRequired,
};

export default LargeExperienceCard;
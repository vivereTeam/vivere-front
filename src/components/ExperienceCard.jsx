import { Card, CardContent, CardMedia, Typography, IconButton, Tooltip } from "@mui/material";
import { Close } from "@mui/icons-material";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

const ExperienceCard = ({ event, removeExperience }) => {
  const navigate = useNavigate();

  const handleRemove = async (e) => {
    e.stopPropagation();

    if (window.confirm(`Tem certeza que deseja remover "${event.titulo}"?`)) {
      try {
        await removeExperience(event.categoria, event.id);
      } catch (error) {
        console.error("Erro ao remover evento:", error);
        alert("Ocorreu um erro ao remover o evento. Tente novamente.");
      }
    }
  };

  if (!event) {
    return <div>Carregando...</div>;
  }

  return (
    <Card
      sx={{
        maxWidth: 345,
        height: 400,
        borderRadius: 5,
        boxShadow: 5,
        position: "relative",
        transition: "transform 0.2s",
        "&:hover": {
          transform: "scale(1.02)",
        },
        cursor: "pointer",
        display: "flex",
        flexDirection: "column",
      }}
      onClick={() => navigate(`/event/${event.id}`)}
    >
      <Tooltip title="Remover" arrow>
        <IconButton
          onClick={handleRemove}
          sx={{
            position: "absolute",
            top: 8,
            right: 8,
            backgroundColor: "rgba(255, 255, 255, 0.7)",
            "&:hover": {
              backgroundColor: "rgba(255, 255, 255, 1)",
            },
          }}
          size="small"
        >
          <Close fontSize="small" color="action" />
        </IconButton>
      </Tooltip>

      <CardMedia
        component="img"
        height="140"
        image={event.imagemUrl}
        alt={event.titulo}
        sx={{ objectFit: "cover" }}
      />

      <CardContent sx={{ flex: 1, display: "flex", flexDirection: "column" }}>
        <Typography
          variant="subtitle2"
          color="primary"
          sx={{ fontWeight: "bold", textTransform: "uppercase", mb: 1 }}
        >
          {event.dataInicio ? new Date(event.dataInicio).toLocaleDateString() : "Data não informada"}
        </Typography>
        <Typography variant="h6" component="div" sx={{ fontWeight: "bold", mb: 1 }}>
          {event.titulo}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {event.endereco}
        </Typography>
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{
            mt: 1,
            fontStyle: "italic",
            overflow: "hidden",
            textOverflow: "ellipsis",
            display: "-webkit-box",
            WebkitLineClamp: 3,
            WebkitBoxOrient: "vertical",
          }}
        >
          {event.descricao}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
          Preço: {event.preco === 0 ? "Gratuito" : event.preco ? `R$ ${event.preco.toFixed(2)}` : "Preço não informado"}
        </Typography>
      </CardContent>
    </Card>
  );
};

ExperienceCard.propTypes = {
  event: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    titulo: PropTypes.string.isRequired,
    endereco: PropTypes.string.isRequired,
    dataInicio: PropTypes.string,
    imagemUrl: PropTypes.string.isRequired,
    descricao: PropTypes.string.isRequired,
    categoria: PropTypes.string.isRequired,
    preco: PropTypes.oneOfType([PropTypes.number, PropTypes.oneOf([null])]),
  }).isRequired,
  removeExperience: PropTypes.func.isRequired,
};

export default ExperienceCard;
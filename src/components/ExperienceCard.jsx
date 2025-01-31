// src/components/ExperienceCard.jsx
import { Card, CardContent, CardMedia, Typography, IconButton, Tooltip } from "@mui/material";
import { Close } from "@mui/icons-material"; // Importando o ícone Close
import PropTypes from 'prop-types';
import { useNavigate } from "react-router-dom";

const ExperienceCard = ({ id, imageUrl, date, title, location, details, category, removeExperience }) => {
  const navigate = useNavigate();

  const handleRemove = (e) => {
    e.stopPropagation(); // Evita que o clique no botão remova o card também navegue
    if (window.confirm(`Tem certeza que deseja remover "${title}"?`)) {
      removeExperience(category, id);
    }
  };

  return (
    <Card 
      sx={{ 
        maxWidth: 345, 
        borderRadius: 5, 
        boxShadow: 5, 
        position: 'relative',
        transition: 'transform 0.2s',
        '&:hover': {
          transform: 'scale(1.02)',
        },
        cursor: 'pointer'
      }}
      onClick={() => navigate(`/event/${id}`)}
    >
      {/* Botão de Remoção com Tooltip */}
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
          <Close fontSize="small" color="action" /> {/* Usando o ícone Close com cor discreta */}
        </IconButton>
      </Tooltip>

      <CardMedia
        component="img"
        height="140"
        image={imageUrl}
        alt={title}
      />
      <CardContent>
        <Typography
          variant="subtitle2"
          color="primary"
          sx={{ fontWeight: "bold", textTransform: "uppercase", mb: 1 }}
        >
          {date}
        </Typography>
        <Typography
          variant="h6"
          component="div"
          sx={{ fontWeight: "bold", mb: 1 }}
        >
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {location}
        </Typography>
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ mt: 1, fontStyle: "italic" }}
        >
          {details}
        </Typography>
      </CardContent>
    </Card>
  );
};

ExperienceCard.propTypes = {
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    location: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired, // Alterado para string
    imageUrl: PropTypes.string,
    details: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired, // Nova prop
    removeExperience: PropTypes.func.isRequired, // Nova prop
}

export default ExperienceCard;
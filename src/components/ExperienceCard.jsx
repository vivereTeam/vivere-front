import { Card, CardContent, CardMedia, Typography } from "@mui/material";
import PropTypes from 'prop-types';

const ExperienceCard = ({ imageUrl, date, title, location, details }) => {
  return (
    <Card sx={{ maxWidth: 345, borderRadius: 2, boxShadow: 3 }}>
      {/* Imagem */}
      <CardMedia
        component="img"
        height="140"
        image={imageUrl}
        alt={title}
        sx={{ borderTopLeftRadius: 8, borderTopRightRadius: 8 }}
      />

      {/* Conteúdo */}
      <CardContent>
        {/* Data e hora */}
        <Typography
          variant="subtitle2"
          color="primary"
          sx={{ fontWeight: "bold", textTransform: "uppercase", mb: 1 }}
        >
          {date}
        </Typography>

        {/* Título */}
        <Typography
          variant="h6"
          component="div"
          sx={{ fontWeight: "bold", mb: 1 }}
        >
          {title}
        </Typography>

        {/* Localização */}
        <Typography variant="body2" color="text.secondary">
          {location}
        </Typography>

        {/* Detalhes */}
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
    title: PropTypes.string.isRequired,
    location: PropTypes.string.isRequired,
    date: PropTypes.instanceOf(Date),
    imageUrl: PropTypes.string,
    details: PropTypes.string.isRequired
}

export default ExperienceCard;
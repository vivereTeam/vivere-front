import { Card, CardContent, CardMedia, Typography } from "@mui/material";
import PropTypes from 'prop-types';
import { Navigate } from "react-router-dom";

const ExperienceCard = ({ id, imageUrl, date, title, location, details }) => {
  return (
    <Card 
    sx={{ maxWidth: 345, borderRadius: 5, boxShadow: 5 }}
    onclick={() => Navigate(`/event/${id}`)}
    >

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
    date: PropTypes.instanceOf(Date),
    imageUrl: PropTypes.string,
    details: PropTypes.string.isRequired
}

export default ExperienceCard;
import PropTypes from "prop-types";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import RestaurantIcon from "@mui/icons-material/Restaurant";
import TheaterComedyIcon from "@mui/icons-material/TheaterComedy";
import TravelExploreIcon from "@mui/icons-material/TravelExplore";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";
import SpaIcon from "@mui/icons-material/Spa";
import ChildCareIcon from "@mui/icons-material/ChildCare";
import StarIcon from "@mui/icons-material/Star";
import SchoolIcon from "@mui/icons-material/School";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import { Link } from "react-router-dom";

function ExperienceCategory({ category }) {
  const categoryIcons = {
    "Workshops e Aulas": <SchoolIcon />,
    "Shows e Entretenimento": <TheaterComedyIcon />,
    "Viagens e Turismo": <TravelExploreIcon />,
    "Aventura e Adrenalina": <FitnessCenterIcon />,
    "Relaxamento e Bem-Estar": <SpaIcon />,
    "Gastronomia e Degustações": <RestaurantIcon />,
    "Infantil e Familiar": <ChildCareIcon />,
    "Experiências Personalizadas": <StarIcon />,
    Default: <HelpOutlineIcon />,
  };

  const icon = categoryIcons[category] || categoryIcons.Default;
  const linkPath = `/PaginaInicial/${encodeURIComponent(category)}`;

  return (
    <Link to={linkPath} style={{ textDecoration: "none" }}>
      <Stack direction="column" alignItems="center" scale="4">
        <Avatar
          sx={{
            bgcolor: "rgb(154, 154, 154)",
            transition: "transform 0.3s ease",
            marginBottom: "7px",
            ":hover": {
              transform: "scale(1.2)",
              bgcolor: "#FF5722",
            },
          }}
        >
          {icon}
        </Avatar>
        <p
          style={{
            textAlign: "center",
            margin: 0,
            fontFamily: "'Poppins', sans-serif",
            color: "rgb(86, 86, 86)",
          }}
        >
          {category}
        </p>
      </Stack>
    </Link>
  );
}

ExperienceCategory.propTypes = {
  category: PropTypes.string.isRequired,
};

export default ExperienceCategory;
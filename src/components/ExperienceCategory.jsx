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
  const iconFontSize = 40;

  const categoryIcons = {
    "Workshops e Aulas": <SchoolIcon sx={{ fontSize: iconFontSize }} />,
    "Shows e Entretenimento": <TheaterComedyIcon sx={{ fontSize: iconFontSize }} />,
    "Viagens e Turismo": <TravelExploreIcon sx={{ fontSize: iconFontSize }} />,
    "Aventura e Adrenalina": <FitnessCenterIcon sx={{ fontSize: iconFontSize }} />,
    "Relaxamento e Bem-Estar": <SpaIcon sx={{ fontSize: iconFontSize }} />,
    "Gastronomia e Degustações": <RestaurantIcon sx={{ fontSize: iconFontSize }} />,
    "Infantil e Familiar": <ChildCareIcon sx={{ fontSize: iconFontSize }} />,
    "Experiências Personalizadas": <StarIcon sx={{ fontSize: iconFontSize }} />,
    Default: <HelpOutlineIcon sx={{ fontSize: iconFontSize }} />,
  };

  const icon = categoryIcons[category] || categoryIcons.Default;
  const linkPath = `/PaginaInicial/${encodeURIComponent(category)}`;

  return (
    <Link to={linkPath} style={{ textDecoration: "none" }}>
      <Stack
        direction="column"
        alignItems="center"
        sx={{
          ":hover .avatar-container": {
            bgcolor: "#FF5722",
          },
        }}
      >
        <Avatar
          className="avatar-container"
          sx={{
            bgcolor: "rgb(154, 154, 154)",
            transition: "transform 0.3s ease",
            marginBottom: "7px",
            width: 80,
            height: 80,
            ":hover": {
              transform: "scale(1.2)",
            },
          }}
        >
          {icon}
        </Avatar>
        <p
        style={{
          textAlign: "center",
          margin: 0,
          fontSize: "15px",
          fontFamily: "'Poppins', sans-serif",
          color: "rgb(86, 86, 86)",
          width: "100px",
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

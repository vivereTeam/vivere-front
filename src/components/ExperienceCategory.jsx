import PropTypes from "prop-types";
import { Avatar, Stack } from "@mui/material";
import {
  Restaurant as RestaurantIcon,
  TheaterComedy as TheaterComedyIcon,
  TravelExplore as TravelExploreIcon,
  FitnessCenter as FitnessCenterIcon,
  Spa as SpaIcon,
  ChildCare as ChildCareIcon,
  Star as StarIcon,
  School as SchoolIcon,
  HelpOutline as HelpOutlineIcon,
  ArrowForward as ArrowForwardIcon,
} from "@mui/icons-material";
import { Link } from "react-router-dom";

const ICONS = {
  "Workshops e Aulas": SchoolIcon,
  "Shows e Entretenimento": TheaterComedyIcon,
  "Viagens e Turismo": TravelExploreIcon,
  "Aventura e Adrenalina": FitnessCenterIcon,
  "Relaxamento e Bem-Estar": SpaIcon,
  "Gastronomia e Degustações": RestaurantIcon,
  "Infantil e Familiar": ChildCareIcon,
  "Experiências Personalizadas": StarIcon,
  "Lista de Categorias": ArrowForwardIcon,
  Default: HelpOutlineIcon,
};

function ExperienceCategory({ category }) {
  const isCategoryList = category === "Lista de Categorias";
  const IconComponent = ICONS[category] || ICONS.Default;

  return (
    <Link to={isCategoryList ? "/category-list" : `/category-list/${encodeURIComponent(category.replace(/\s+/g, "-"))}`} style={{ textDecoration: "none" }}>
      <Stack
        direction="column"
        alignItems="center"
        sx={{
          ":hover .avatar-container": { bgcolor: isCategoryList ? "#1976D2" : "#FF5722" },
        }}
      >
        <Avatar
          className="avatar-container"
          sx={{
            bgcolor: isCategoryList ? "#1976D2" : "rgb(154, 154, 154)",
            transition: "transform 0.3s ease",
            boxShadow: "0px 2px 10px rgba(0, 0, 0, 0.1), 0px 1px 3px rgba(0, 0, 0, 0.08)",
            marginBottom: "7px",
            width: 80,
            height: 80,
            ":hover": { transform: "scale(1.2)" },
          }}
        >
          <IconComponent sx={{ fontSize: 40 }} />
        </Avatar>
        <p
          style={{
            textAlign: "center",
            margin: 0,
            fontSize: "15px",
            fontFamily: "'Poppins', sans-serif",
            color: isCategoryList ? "#1976D2" : "rgb(86, 86, 86)",
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

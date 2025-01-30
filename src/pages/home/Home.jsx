import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ExperienceCard from "../../components/ExperienceCard.jsx";
import PropTypes from "prop-types";
import ExperienceCategory from "../../components/ExperienceCategory.jsx";
import LargeExperienceCard from "../../components/LargeExperienceCard.jsx";
import { Box, IconButton } from "@mui/material";
import { ArrowBackIos, ArrowForwardIos } from "@mui/icons-material";
import experienceData from "./ExperienceData.js";

// Adicionando mais experiências para testar o slider
experienceData["Shows e Entretenimento"] = [
  { id: 1, title: "Show do Coldplay", location: "São Paulo", date: "2025-06-10", imageUrl: "https://picsum.photos/id/500/450/450", details: "Um show inesquecível!" },
  { id: 2, title: "Festival Rock in Rio", location: "Rio de Janeiro", date: "2025-09-20", imageUrl: "https://picsum.photos/id/500/450/450", details: "Maior festival de música do Brasil." },
  { id: 3, title: "Stand-up Comedy", location: "Belo Horizonte", date: "2025-07-15", imageUrl: "https://picsum.photos/id/500/450/450", details: "Ria até chorar!" },
  { id: 4, title: "Orquestra Sinfônica", location: "Curitiba", date: "2025-08-05", imageUrl: "https://picsum.photos/id/500/450/450", details: "Música clássica emocionante." },
  { id: 5, title: "Espetáculo de Circo", location: "Porto Alegre", date: "2025-10-01", imageUrl: "https://picsum.photos/id/500/450/450", details: "Diversão garantida para toda a família." }
];

const NextArrow = ({ onClick }) => (
  <IconButton
    onClick={onClick}
    sx={{
      position: "absolute",
      top: "50%",
      right: "-25px",
      transform: "translateY(-50%)",
      backgroundColor: "rgba(0, 0, 0, 0.5)",
      color: "white",
      zIndex: 2,
      ":hover": { backgroundColor: "rgba(0, 0, 0, 0.7)" },
    }}
  >
    <ArrowForwardIos />
  </IconButton>
);

const PrevArrow = ({ onClick }) => (
  <IconButton
    onClick={onClick}
    sx={{
      position: "absolute",
      top: "50%",
      left: "-25px",
      transform: "translateY(-50%)",
      backgroundColor: "rgba(0, 0, 0, 0.5)",
      color: "white",
      zIndex: 2,
      ":hover": { backgroundColor: "rgba(0, 0, 0, 0.7)" },
    }}
  >
    <ArrowBackIos />
  </IconButton>
);

const ExperienceSlider = ({ experiences }) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <Box sx={{ position: "relative", width: "100%" }}>
      <Slider {...settings}>
        {experiences.map((exp) => (
          <div key={exp.id} style={{ padding: "10px" }}>
            <ExperienceCard {...exp} />
          </div>
        ))}
      </Slider>
    </Box>
  );
};

ExperienceSlider.propTypes = {
  experiences: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      location: PropTypes.string.isRequired,
      date: PropTypes.string.isRequired,
      imageUrl: PropTypes.string,
      details: PropTypes.string.isRequired,
    })
  ).isRequired,
};

const Home = () => {
  return (
    <Box
      sx={{
        fontFamily: "'Poppins', sans-serif",
        fontSize: "14px",
        display: "flex",
        flexDirection: "column",
        margin: "0 auto",
        maxWidth: "1400px",
        width: "100%",
        gap: "30px",
        marginBottom: "30px",
        "& h1": {
          marginBottom: "16px",
        },
      }}
    >
      <div>
        <h1>Categorias</h1>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            justifyContent: "space-around",
          }}
        >
          <ExperienceCategory category="Workshops e Aulas" />
          <ExperienceCategory category="Shows e Entretenimento" />
          <ExperienceCategory category="Viagens e Turismo" />
          <ExperienceCategory category="Aventura e Adrenalina" />
          <ExperienceCategory category="Relaxamento e Bem-Estar" />
          <ExperienceCategory category="Gastronomia e Degustações" />
          <ExperienceCategory category="Infantil e Familiar" />
          <ExperienceCategory category="Experiências Personalizadas" />
          <ExperienceCategory category="Lista de Categorias" />
        </div>
      </div>

      {Object.keys(experienceData).map((category) => (
        <div key={category}>
          <h1>{category}</h1>
          {category !== "Experiencia em Destaque" ? (
            experienceData[category].length > 3 ? (
              <ExperienceSlider experiences={experienceData[category]} />
            ) : (
              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: "20px",
                  justifyContent: "flex-start",
                }}
              >
                {experienceData[category].map((experience) => (
                  <ExperienceCard key={experience.id} {...experience} />
                ))}
              </div>
            )
          ) : (
            experienceData[category].map((experience) => (
              <LargeExperienceCard key={experience.id} event={experience} />
            ))
          )}
        </div>
      ))}
    </Box>
  );
};

export default Home;
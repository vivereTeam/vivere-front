import { Box, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import CardSlider from "../../components/CardSlider";
import ExperienceCard from "../../components/ExperienceCard";
import ExperienceCategory from "../../components/ExperienceCategory";
import { getAllEventos, deleteEvento } from "../../services/api";

const Home = () => {
  const navigate = useNavigate();
  const [allExperiences, setAllExperiences] = useState({});

  useEffect(() => {
    const fetchEventos = async () => {
      try {
        const eventos = await getAllEventos();
        const groupedByCategory = eventos.reduce((acc, evento) => {
          const { categoria } = evento;
          if (!acc[categoria]) acc[categoria] = [];
          acc[categoria].push(evento);
          return acc;
        }, {});
        setAllExperiences(groupedByCategory);
      } catch (error) {
        console.error("Erro ao buscar eventos:", error);
      }
    };
    fetchEventos();
  }, []);

  const removeExperience = async (category, id) => {
    try {
      await deleteEvento(id);
      setAllExperiences((prev) => ({
        ...prev,
        [category]: prev[category].filter((exp) => exp.id !== id),
      }));
    } catch (error) {
      console.error("Erro ao remover evento:", error);
    }
  };

  const categories = Object.keys(allExperiences);

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
      <Header />

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

      {categories.map((category) => {
        const experiences = allExperiences[category] || [];
        const largeCards = experiences.filter((exp) => exp.cardSize === "LARGE");
        const normalCards = experiences.filter((exp) => exp.cardSize === "NORMAL");

        return (
          <div key={category}>
            <h1>{category}</h1>

            {largeCards.length > 0 && (
              <div style={{ marginBottom: "20px" }}>
                {largeCards.map((experience) => (
                  <div key={experience.id} style={{ marginBottom: "20px" }}>
                    <ExperienceCard
                      event={experience}
                      removeExperience={removeExperience}
                    />
                  </div>
                ))}
              </div>
            )}

            {normalCards.length > 3 ? (
              <CardSlider experiences={normalCards} removeExperience={removeExperience} />
            ) : (
              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: "20px",
                  justifyContent: "flex-start",
                }}
              >
                {normalCards.map((experience) => (
                  <div
                    key={experience.id}
                    style={{ cursor: "pointer" }}
                    onClick={() => navigate(`/event/${experience.id}`)}
                  >
                    <ExperienceCard
                      event={experience}
                      removeExperience={removeExperience}
                    />
                  </div>
                ))}
              </div>
            )}
          </div>
        );
      })}

      <Footer />
    </Box>
  );
};

export default Home;
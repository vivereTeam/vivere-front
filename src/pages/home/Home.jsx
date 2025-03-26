import { Box, Typography, CircularProgress } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import CardSlider from "../../components/CardSlider";
import ExperienceCard from "../../components/ExperienceCard";
import LargeExperienceCard from "../../components/LargeExperienceCard";
import ExperienceCategory from "../../components/CategoryIcon";
import { getAllEventos, deleteEvento } from "../../services/api";

const formattedCategories = {
  SHOWS_ENTRETENIMENTO: "Shows e Entretenimento",
  WORKSHOPS_AULAS: "Workshops e Aulas",
  VIAGENS_TURISMO: "Viagens e Turismo",
  AVENTURA_ADRENALINA: "Aventura e Adrenalina",
  RELAXAMENTO_BEM_ESTAR: "Relaxamento e Bem-Estar",
  GASTRONOMIA_DEGUSTACOES: "Gastronomia e Degustações",
  INFANTIL_FAMILIAR: "Infantil e Familiar",
  EXPERIENCIAS_PERSONALIZADAS: "Experiências Personalizadas",
};

const Home = () => {
  const navigate = useNavigate();
  const [allExperiences, setAllExperiences] = useState(null);
  const [loading, setLoading] = useState(true);

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
        setAllExperiences({});
      } finally {
        setLoading(false);
      }
    };
    fetchEventos();
  }, []);

  const removeExperience = async (category, id) => {
    try {
      await deleteEvento(id);
      setAllExperiences(prev => {
        const updatedCategory = prev[category].filter(exp => exp.id !== id);
        if (updatedCategory.length === 0) {
          const { [category]: _, ...rest } = prev;
          return rest;
        }
        return { ...prev, [category]: updatedCategory };
      });
    } catch (error) {
      console.error("Erro ao remover evento:", error);
    }
  };

  const featuredExperiences = allExperiences
    ? Object.values(allExperiences)
        .flat()
        .filter(exp => exp.cardSize === "LARGE")
    : [];

  const categoriesWithNormalCards = allExperiences
    ? Object.keys(allExperiences).filter(category =>
        allExperiences[category].some(exp => exp.cardSize === "NORMAL")
      )
    : [];

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
        marginTop: "30px",
        marginBottom: "60px",
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
          {Object.entries(formattedCategories).map(([key, value]) => (
            <ExperienceCategory key={key} category={value} />
          ))}
          <ExperienceCategory category="Lista de Categorias" />
        </div>
      </div>

      {loading ? (
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            height: '200px',
            width: '100%'
          }}
        >
          <CircularProgress />
        </Box>
      ) : allExperiences && Object.keys(allExperiences).length === 0 ? (
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            height: '200px',
            width: '100%'
          }}
        >
          <Typography variant="h5">
            Nenhuma experiência disponível no momento
          </Typography>
        </Box>
      ) : (
        <>
          {featuredExperiences.length > 0 && (
            <div>
              <h1>Experiência em Destaque</h1>
              {featuredExperiences.length === 1 ? (
                <LargeExperienceCard
                  event={featuredExperiences[0]}
                  removeExperience={removeExperience}
                />
              ) : (
                <CardSlider
                  key={featuredExperiences.length}
                  experiences={featuredExperiences}
                  removeExperience={removeExperience}
                  isLargeCard
                />
              )}
            </div>
          )}

          {categoriesWithNormalCards.map(category => {
            const formattedCategory = formattedCategories[category] || category;
            const experiences = allExperiences[category] || [];
            const normalCards = experiences.filter(
              exp => exp.cardSize === "NORMAL"
            );

            return (
              <div key={category}>
                <h1>{formattedCategory}</h1>
                <CardSlider
                  key={normalCards.length}
                  experiences={normalCards}
                  removeExperience={removeExperience}
                />
              </div>
            );
          })}
        </>
      )}
    </Box>
  );
};

export default Home;
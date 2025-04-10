import { Box, Typography, CircularProgress, Grid } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import CardSlider from "../../components/CardSlider";
import ExperienceCard from "../../components/ExperienceCard";
import LargeExperienceCard from "../../components/LargeExperienceCard";
import ExperienceCategory from "../../components/CategoryIcon";
import { getAllEventos, deleteEvento } from "../../services/api";
import { CATEGORIES } from "../../services/constants";

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
    <Box sx={{
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
        "& h1": { marginBottom: "16px" }
      }}>
      <div>
        <h1>Categorias</h1>
        <div style={{
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            justifyContent: "space-around",
          }}>
          {Object.keys(CATEGORIES.frontendToBackend).map((category) => (
            <ExperienceCategory key={category} category={category} />
          ))}
          <ExperienceCategory category="Lista de Categorias" />
        </div>
      </div>

      {loading ? (
        <Box sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            height: '200px',
            width: '100%'
          }}>
          <CircularProgress />
        </Box>
      ) : allExperiences && Object.keys(allExperiences).length === 0 ? (
        <Box sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            height: '200px',
            width: '100%'
          }}>
          <Typography variant="h5">
            Nenhuma experiência disponível no momento
          </Typography>
        </Box>
      ) : (
        <>
          {featuredExperiences.length > 0 && (
            <div>
              <h1>Experiência em Destaque</h1>
              {featuredExperiences.length >= 2 ? (
                <CardSlider
                  key={featuredExperiences.length}
                  experiences={featuredExperiences}
                  removeExperience={removeExperience}
                  isLargeCard
                />
              ) : (
                <Grid container spacing={2}>
                  {featuredExperiences.map(exp => (
                    <Grid item xs={12} key={exp.id}>
                      <LargeExperienceCard
                        event={exp}
                        removeExperience={removeExperience}
                      />
                    </Grid>
                  ))}
                </Grid>
              )}
            </div>
          )}

          {categoriesWithNormalCards.map(category => {
            const formattedCategory = CATEGORIES.backendToFrontend[category] || category;
            const experiences = allExperiences[category] || [];
            const normalCards = experiences.filter(exp => exp.cardSize === "NORMAL");

            return (
              <div key={category}>
                <h1>{formattedCategory}</h1>
                {normalCards.length >= 4 ? (
                  <CardSlider
                    key={normalCards.length}
                    experiences={normalCards}
                    removeExperience={removeExperience}
                  />
                ) : (
                  <Grid container spacing={2}>
                    {normalCards.map(exp => (
                      <Grid item xs={4} key={exp.id}>
                        <ExperienceCard
                          event={exp}
                          removeExperience={removeExperience}
                        />
                      </Grid>
                    ))}
                  </Grid>
                )}
              </div>
            );
          })}
        </>
      )}
    </Box>
  );
};

export default Home;
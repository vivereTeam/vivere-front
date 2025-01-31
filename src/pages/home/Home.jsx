// src/pages/home/Home.jsx
import { Box, Button } from "@mui/material";
import { useNavigate } from "react-router-dom"; // Importante adicionar
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import CardSlider from "../../components/CardSlider";
import ExperienceCard from "../../components/ExperienceCard";
import ExperienceCategory from "../../components/ExperienceCategory";

const Home = ({ allExperiences, removeExperience }) => { // Recebe removeExperience como prop
  // Precisamos instanciar o navigate:
  const navigate = useNavigate();

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

      {/* Seções de Categorias em destaque */}
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

      {/* Lista de experiências (eventos) por categoria */}
      {categories.map((category) => {
        const experiences = allExperiences[category] || [];
        return (
          <div key={category}>
            <h1>{category}</h1>

            {experiences.length > 3 ? (
              <CardSlider experiences={experiences} />
            ) : (
              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: "20px",
                  justifyContent: "flex-start",
                }}
              >
                {experiences.map((experience) => (
                  <div
                    key={experience.id}
                    style={{ cursor: "pointer" }}
                    onClick={() => {
                      console.log("Clicou em", experience.title);
                      console.log("Antes do navigate");
                      navigate(`/event/${experience.id}`);
                      console.log("Depois do navigate");
                    }}
                  >
                    <ExperienceCard 
                      {...experience} 
                      category={category} // Passa a categoria
                      removeExperience={removeExperience} // Passa a função de remoção
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
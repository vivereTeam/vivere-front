import React, { useState, useEffect } from "react"; // Importações adicionadas
import { useParams, useNavigate } from "react-router-dom";
import { Box, Typography, Grid } from "@mui/material";
import ExperienceCard from "../../components/ExperienceCard";
import { getEventosByCategory } from "../../services/api";

const CATEGORIAS_FRONTEND = {
  SHOWS_ENTRETENIMENTO: "Shows e Entretenimento",
  WORKSHOPS_AULAS: "Workshops e Aulas",
  VIAGENS_TURISMO: "Viagens e Turismo",
  AVENTURA_ADRENALINA: "Aventura e Adrenalina",
  RELAXAMENTO_BEM_ESTAR: "Relaxamento e Bem-Estar",
  GASTRONOMIA_DEGUSTACOES: "Gastronomia e Degustações",
  INFANTIL_FAMILIAR: "Infantil e Familiar",
  EXPERIENCIAS_PERSONALIZADAS: "Experiências Personalizadas",
};

function CategoryPage() {
  const { category } = useParams();
  const navigate = useNavigate();
  const categoriaFrontend = CATEGORIAS_FRONTEND[category] || "Categoria Desconhecida";
  const [filteredExperiences, setFilteredExperiences] = useState([]);

  useEffect(() => {
    const fetchCategoryResults = async () => {
      try {
        const data = await getEventosByCategory(category);
        setFilteredExperiences(data || []);
      } catch (error) {
        console.error("Erro ao buscar eventos por categoria:", error);
        setFilteredExperiences([]);
      }
    };

    fetchCategoryResults();
  }, [category]);

  return (
    <Box sx={{ padding: "20px", maxWidth: "1400px", margin: "0 auto" }}>
      <Typography variant="h4" gutterBottom>
        Resultados para a categoria: &quot;{categoriaFrontend}&quot;
      </Typography>

      {filteredExperiences.length === 0 ? (
        <Typography variant="body1">
          Nenhuma experiência encontrada para esta categoria.
        </Typography>
      ) : (
        <Grid container spacing={3}>
          {filteredExperiences.map((experience) => (
            <Grid
              item
              xs={12}
              sm={6}
              md={4}
              key={experience.id}
              display="flex"
              justifyContent="center"
            >
              <Box sx={{ width: 345 }}>
                <ExperienceCard
                  event={experience}
                  removeExperience={() => {}}
                />
              </Box>
            </Grid>
          ))}
        </Grid>
      )}

      <Box sx={{ marginTop: "20px" }}>
        <Typography
          variant="button"
          onClick={() => navigate(-1)}
          sx={{
            cursor: "pointer",
            color: "#270c6b",
            textDecoration: "underline",
          }}
        >
          Voltar
        </Typography>
      </Box>
    </Box>
  );
}

export default CategoryPage;
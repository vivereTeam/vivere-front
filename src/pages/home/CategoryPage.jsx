import { Box, Typography, CircularProgress, Grid } from "@mui/material";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import ExperienceCard from "../../components/ExperienceCard";
import { getEventosByCategory } from "../../services/api";
import { getCategoryFrontendLabel } from "../../services/constants";

function CategoryPage() {
  const { category } = useParams();
  const navigate = useNavigate();
  const categoriaFrontend = getCategoryFrontendLabel(category) || "Categoria Desconhecida";
  const [filteredExperiences, setFilteredExperiences] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategoryResults = async () => {
      try {
        const data = await getEventosByCategory(category);
        setFilteredExperiences(data || []);
      } catch (error) {
        console.error("Erro ao buscar eventos por categoria:", error);
        setFilteredExperiences([]);
      } finally {
        setLoading(false);
      }
    };

    fetchCategoryResults();
  }, [category]);

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '200px', width: '100%' }}>
        <CircularProgress size={40} />
      </Box>
    );
  }

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
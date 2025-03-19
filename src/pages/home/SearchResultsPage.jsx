/* eslint-disable react/prop-types */
// src/pages/home/SearchResultsPage.jsx
import { useLocation, useNavigate } from "react-router-dom";
import { Box, Typography, Grid2 } from "@mui/material";
import ExperienceCard from "../../components/ExperienceCard";

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

const SearchResultsPage = ({ allExperiences }) => {
  const query = useQuery();
  const searchQuery = query.get("query") || "";
  const navigate = useNavigate();

  // Função para filtrar as experiências com base na consulta
  const getFilteredExperiences = () => {
    if (!searchQuery.trim()) return [];

    const lowerCaseQuery = searchQuery.toLowerCase();
    const filtered = [];

    Object.entries(allExperiences).forEach(([category, experiences]) => {
      experiences.forEach((experience) => {
        const { title, details, location } = experience;
        if (
          title.toLowerCase().includes(lowerCaseQuery) ||
          details.toLowerCase().includes(lowerCaseQuery) ||
          location.toLowerCase().includes(lowerCaseQuery)
        ) {
          filtered.push({ ...experience, category });
        }
      });
    });

    return filtered;
  };

  const filteredExperiences = getFilteredExperiences();

  return (
    <Box sx={{ padding: "20px", maxWidth: "1400px", margin: "0 auto" }}>
      <Typography variant="h4" gutterBottom>
        Resultados da Busca para: "{searchQuery}"
      </Typography>

      {filteredExperiences.length === 0 ? (
        <Typography variant="body1">
          Nenhuma experiência encontrada para a sua busca.
        </Typography>
      ) : (
        <Grid2 container spacing={3}>
          {filteredExperiences.map((experience) => (
            <Grid2 item xs={12} sm={6} md={4} key={`${experience.category}-${experience.id}`}>
              <ExperienceCard
                {...experience}
                category={experience.category}
                removeExperience={() => {}} // Passar uma função vazia ou implementar conforme necessário
              />
            </Grid2>
          ))}
        </Grid2>
      )}

      {/* Botão para voltar */}
      <Box sx={{ marginTop: "20px" }}>
        <Typography
          variant="button"
          onClick={() => navigate(-1)}
          sx={{ cursor: "pointer", color: "#270c6b", textDecoration: "underline" }}
        >
          Voltar
        </Typography>
      </Box>
    </Box>
  );
};

export default SearchResultsPage;
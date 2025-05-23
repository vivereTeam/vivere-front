import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from "react-router-dom";
import { Box, Typography, Grid, CircularProgress } from "@mui/material";
import ExperienceCard from "../../components/ExperienceCard";
import { searchEventos } from "../../services/api";

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

const SearchResultsPage = () => {
  const [filteredExperiences, setFilteredExperiences] = useState([]);
  const [loading, setLoading] = useState(true);
  const query = useQuery();
  const searchQuery = query.get("query") || "";
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSearchResults = async () => {
      if (!searchQuery.trim()) {
        setFilteredExperiences([]);
        setLoading(false);
        return;
      }

      try {
        const data = await searchEventos(searchQuery);
        setFilteredExperiences(data || []);
      } catch (error) {
        console.error("Erro ao buscar eventos:", error);
        setFilteredExperiences([]);
      } finally {
        setLoading(false);
      }
    };

    fetchSearchResults();
  }, [searchQuery]);

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
        Resultados da Busca para: &quot;{searchQuery}&quot;
      </Typography>

      {filteredExperiences.length === 0 ? (
        <Typography variant="body1">
          Nenhuma experiência encontrada para a sua busca.
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
};

export default SearchResultsPage;
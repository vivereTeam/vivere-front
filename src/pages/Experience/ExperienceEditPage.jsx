// src/pages/Experience/ExperienceEditPage.jsx
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Container,
  TextField,
  Button,
  Typography,
  Grid2
} from '@mui/material';
import { Save, Cancel } from '@mui/icons-material';
import PropTypes from 'prop-types';

const EditEventPage = ({ allExperiences, updateExperience }) => {
  const { eventId } = useParams();
  const navigate = useNavigate();

  // Encontrar a categoria e o evento correspondente
  let currentCategory = null;
  let currentEvent = null;

  for (const [category, events] of Object.entries(allExperiences)) {
    const found = events.find((e) => e.id.toString() === eventId.toString());
    if (found) {
      currentCategory = category;
      currentEvent = found;
      break;
    }
  }

  useEffect(() => {
    if (!currentEvent) {
      console.warn("Evento não encontrado para ID:", eventId);
      navigate("/"); // Redireciona para a home se não encontrado
    }
  }, [currentEvent, eventId, navigate]);

  const [formData, setFormData] = useState(currentEvent || {});

  const handleSubmit = (e) => {
    e.preventDefault();
    updateExperience(currentCategory, formData);
    navigate(`/event/${eventId}`);
  };

  const handleChange = (field) => (e) => {
    setFormData(prev => ({
      ...prev,
      [field]: e.target.value
    }));
  };

  const handleDetailsChange = (e) => {
    setFormData(prev => ({
      ...prev,
      details: e.target.value
    }));
  };

  if (!currentEvent) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Typography variant="h5" align="center">
          Evento não encontrado.
        </Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h3" gutterBottom>
        Editar Evento
      </Typography>

      <form onSubmit={handleSubmit}>
        <Grid2 container spacing={3}>
          <Grid2 item xs={12}>
            <TextField
              fullWidth
              label="Título do Evento"
              value={formData.title || ''}
              onChange={handleChange('title')}
              variant="outlined"
              required
            />
          </Grid2>

          <Grid2 item xs={12} md={6}>
            <TextField
              fullWidth
              type="date"
              label="Data"
              value={formData.date || ''}
              onChange={handleChange('date')}
              InputLabelProps={{
                shrink: true,
              }}
              required
            />
          </Grid2>

          <Grid2 item xs={12} md={6}>
            <TextField
              fullWidth
              label="Horário"
              value={formData.time || ''}
              onChange={handleChange('time')}
              required
            />
          </Grid2>

          <Grid2 item xs={12}>
            <TextField
              fullWidth
              label="Localização"
              value={formData.location || ''}
              onChange={handleChange('location')}
              multiline
              rows={2}
              required
            />
          </Grid2>

          <Grid2 item xs={12}>
            <TextField
              fullWidth
              label="Detalhes (um por linha)"
              value={formData.details || ''}
              onChange={handleDetailsChange}
              multiline
              rows={4}
            />
          </Grid2>

          <Grid2 item xs={12} sx={{ display: 'flex', gap: 2 }}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              startIcon={<Save />}
              size="large"
            >
              Salvar
            </Button>
            
            <Button
              variant="outlined"
              color="error"
              startIcon={<Cancel />}
              size="large"
              onClick={() => navigate(-1)}
            >
              Cancelar
            </Button>
          </Grid2>
        </Grid2>
      </form>
    </Container>
  );
}

EditEventPage.propTypes = {
  allExperiences: PropTypes.object.isRequired,
  updateExperience: PropTypes.func.isRequired,
};

export default EditEventPage;
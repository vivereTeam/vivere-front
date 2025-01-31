import { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import {
  Container,
  TextField,
  Button,
  Typography,
  Grid2,
  FormControlLabel,
  Switch
} from '@mui/material';
import { Save, Cancel } from '@mui/icons-material';
import { ExperienceContext } from '../../context/ExperienceContex';

const EditEventPage = () => {
  const { eventId } = useParams();
  const navigate = useNavigate();
  const { state } = useLocation();
  const { updateExperience } = useContext(ExperienceContext);
  const [formData, setFormData] = useState(state.event);
  
  const handleSubmit = (e) => {
    e.preventDefault();
    updateExperience(formData.category, formData);
    navigate(`/event/${eventId}`);
  };

  const handleChange = (field) => (e) => {
    setFormData(prev => ({
      ...prev,
      [field]: e.target.value
    }));
  };

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
              value={formData.title}
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
              value={formData.date}
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
              value={formData.time}
              onChange={handleChange('time')}
              required
            />
          </Grid2>

          <Grid2 item xs={12}>
            <TextField
              fullWidth
              label="Localização"
              value={formData.location}
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
              value={formData.details.join('\n')}
              onChange={(e) => setFormData(prev => ({
                ...prev,
                details: e.target.value.split('\n')
              }))}
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

export default EditEventPage;
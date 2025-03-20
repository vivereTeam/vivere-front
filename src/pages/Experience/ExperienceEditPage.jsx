import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, TextField, Button, Typography, Grid2 } from '@mui/material';
import { Save, Cancel } from '@mui/icons-material';
import { getEventoById, updateEvento } from '../../services/api';

const EditEventPage = () => {
    const { eventId } = useParams();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        titulo: '',
        descricao: '',
        data: '',
    });

    useEffect(() => {
        getEventoById(eventId)
            .then(response => {
                setFormData(response);
            })
            .catch(error => {
                console.error("Erro ao buscar evento:", error);
                navigate("/"); 
            });
    }, [eventId, navigate]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await updateEvento(eventId, formData);
            alert("Evento atualizado com sucesso!");
            navigate("/");
        } catch (error) {
            console.error("Erro ao atualizar evento:", error);
        }
    };

    return (
        <Container>
            <Typography variant="h4" gutterBottom>Editar Evento</Typography>
            <form onSubmit={handleSubmit}>
                <Grid2 container spacing={2}>
                    <Grid2 item xs={12}>
                        <TextField
                            label="Título"
                            name="titulo"
                            value={formData.titulo}
                            onChange={handleChange}
                            fullWidth
                            required
                        />
                    </Grid2>
                    <Grid2 item xs={12}>
                        <TextField
                            label="Descrição"
                            name="descricao"
                            value={formData.descricao}
                            onChange={handleChange}
                            fullWidth
                            required
                            multiline
                            rows={4}
                        />
                    </Grid2>
                    <Grid2 item xs={12}>
                        <TextField
                            label="Data"
                            name="data"
                            type="date"
                            value={formData.data}
                            onChange={handleChange}
                            fullWidth
                            required
                            InputLabelProps={{ shrink: true }}
                        />
                    </Grid2>
                    <Grid2 item xs={12}>
                        <Button type="submit" variant="contained" color="primary" startIcon={<Save />}>
                            Salvar
                        </Button>
                        <Button onClick={() => navigate("/")} variant="outlined" color="secondary" startIcon={<Cancel />} style={{ marginLeft: 10 }}>
                            Cancelar
                        </Button>
                    </Grid2>
                </Grid2>
            </form>
        </Container>
    );
};

export default EditEventPage;
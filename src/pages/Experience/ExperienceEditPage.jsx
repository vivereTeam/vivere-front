import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, TextField, Button, Typography, Grid } from '@mui/material';
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

    // Buscar os dados do evento ao carregar a página
    useEffect(() => {
        getEventoById(eventId)
            .then(response => {
                setFormData(response); // Preenche os campos com os dados do evento
            })
            .catch(error => {
                console.error("Erro ao buscar evento:", error);
                navigate("/"); // Redireciona para a home se o evento não for encontrado
            });
    }, [eventId, navigate]);

    // Atualizar os campos conforme o usuário digita
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // Enviar os dados atualizados para o backend
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await updateEvento(eventId, formData);
            alert("Evento atualizado com sucesso!");
            navigate("/"); // Volta para a página inicial após a edição
        } catch (error) {
            console.error("Erro ao atualizar evento:", error);
        }
    };

    return (
        <Container>
            <Typography variant="h4" gutterBottom>Editar Evento</Typography>
            <form onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <TextField
                            label="Título"
                            name="titulo"
                            value={formData.titulo}
                            onChange={handleChange}
                            fullWidth
                            required
                        />
                    </Grid>
                    <Grid item xs={12}>
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
                    </Grid>
                    <Grid item xs={12}>
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
                    </Grid>
                    <Grid item xs={12}>
                        <Button type="submit" variant="contained" color="primary" startIcon={<Save />}>
                            Salvar
                        </Button>
                        <Button onClick={() => navigate("/")} variant="outlined" color="secondary" startIcon={<Cancel />} style={{ marginLeft: 10 }}>
                            Cancelar
                        </Button>
                    </Grid>
                </Grid>
            </form>
        </Container>
    );
};

export default EditEventPage;
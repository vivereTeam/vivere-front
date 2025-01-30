import { useState } from "react";
import { TextField, Button, MenuItem, Typography, Checkbox, FormControlLabel, Select, Box, Modal, Card, CardMedia, CardContent } from "@mui/material";

const ExperienceCreationPage = () => {
  const [eventData, setEventData] = useState({
    category: "",
    title: "",
    address: "",
    description: "",
    startDate: "",
    endDate: "",
    ticketType: "Ingresso",
    agreementChecked: false,
    image: null,
    imagePreview: null,
  });

  const [previewOpen, setPreviewOpen] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEventData((prevData) => ({ ...prevData, [name]: value }));
  };


  // Envio de Imagem
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setEventData((prevData) => ({
        ...prevData,
        image: file,
        imagePreview: URL.createObjectURL(file),
      }));
    }
  };

  const handleSubmit = () => {
    console.log("Evento Criado:", eventData);
  };

  const isFormValid = () => {
    return (
      eventData.category &&
      eventData.title &&
      eventData.address &&
      eventData.startDate &&
      eventData.endDate &&
      eventData.agreementChecked
    );
  };
  

  return (
    <Box sx={{ maxWidth: "800px", margin: "20px auto", padding: "20px", boxShadow: 2, borderRadius: "8px" }}>
      <Typography variant="h4" gutterBottom>
        Criar Evento Presencial
      </Typography>

      <Typography variant="h6" color="primary" sx={{ mt: 3 }}>
        1. Categoria
      </Typography>
      <Select fullWidth name="category" value={eventData.category} onChange={handleChange} margin="normal" >
        <MenuItem value="Workshops e Aulas">Workshops e Aulas</MenuItem>
        <MenuItem value="Shows e Entretenimento">Shows e Entretenimento</MenuItem>
        <MenuItem value="Viagens e Turismo">Viagens e Turismo</MenuItem>
        <MenuItem value="Aventura e Adrenalina">Aventura e Adrenalina</MenuItem>
        <MenuItem value="Relaxamento e Bem-Estar">Relaxamento e Bem-Estar</MenuItem>
        <MenuItem value="Gastronomia e Degustações">Gastronomia e Degustações</MenuItem>
        <MenuItem value="Infantil e Familiar">Infantil e Familiar</MenuItem>
        <MenuItem value="Experiências Personalizadas">Experiências Personalizadas</MenuItem>
      </Select>

      {/* Local */}
      <Typography variant="h6" color="primary" sx={{ mt: 3 }}>
        2. Onde o seu evento vai acontecer?
      </Typography>
      <TextField fullWidth label="Endereço" name="address" value={eventData.address} onChange={handleChange} margin="normal" required />

      {/* Informações básicas */}
      <Typography variant="h6" color="primary" sx={{ mt: 3 }}>
        3. Informações básicas
      </Typography>
      <TextField fullWidth label="Nome do Evento" name="title" value={eventData.title} onChange={handleChange} margin="normal" required />

      {/* Envio de Imagem */}
      <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", mt: 2 }}>
        <input type="file" accept="image/*" onChange={handleImageUpload} style={{ display: "none" }} id="image-upload" />
        <label htmlFor="image-upload">
          <Button variant="contained" component="span">
            Adicionar Imagem
          </Button>
        </label>
        {eventData.imagePreview && (
          <img src={eventData.imagePreview} alt="Prévia" style={{ marginTop: "10px", width: "100%", maxHeight: "300px", objectFit: "cover" }} />
        )}
      </Box>

      {/* Descrição */}
      <Typography variant="h6" color="primary" sx={{ mt: 3 }}>
        4. Descrição do evento
      </Typography>
      <TextField fullWidth label="Descrição" name="description" value={eventData.description} onChange={handleChange} margin="normal" multiline rows={4} />

      {/* Data e Horário */}
      <Typography variant="h6" color="primary" sx={{ mt: 3 }}>
        5. Data e horário
      </Typography>
      <TextField fullWidth type="date" label="Data de Início" name="startDate" value={eventData.startDate} onChange={handleChange} margin="normal" required />
      <TextField fullWidth type="date" label="Data de Término" name="endDate" value={eventData.endDate} onChange={handleChange} margin="normal" required />


      {/* Ingressos */}
      <Typography variant="h6" color="primary" sx={{ mt: 3 }}>
        6. Ingressos
      </Typography>
      <Select fullWidth name="ticketType" value={eventData.ticketType} onChange={handleChange} margin="normal">
        <MenuItem value="Ingresso">Ingresso</MenuItem>
        <MenuItem value="VIP">VIP</MenuItem>
        <MenuItem value="Gratuito">Gratuito</MenuItem>
      </Select>

      {/* Responsabilidades */}
      <Typography variant="h6" color="primary" sx={{ mt: 3 }}>
        7. Responsabilidades
      </Typography>
      <FormControlLabel
        control={<Checkbox checked={eventData.agreementChecked} onChange={(e) => setEventData({ ...eventData, agreementChecked: e.target.checked })} />}
        label="Estou de acordo com os Termos de uso e as Diretrizes da Comunidade."
      />

      {/* Botões */}
      <Box sx={{ display: "flex", justifyContent: "space-between", mt: 4 }}>
        <Button variant="outlined" onClick={() => setPreviewOpen(true)}>
          Pré-visualizar
        </Button>
        <Button variant="contained" color="primary" onClick={handleSubmit} disabled={!isFormValid()}>
          Publicar Evento
        </Button>
      </Box>

      {/* MODAL DE PRÉ-VISUALIZAÇÃO */}
      <Modal open={previewOpen} onClose={() => setPreviewOpen(false)}>
        <Box sx={{ maxWidth: "500px", margin: "auto", mt: "10%", backgroundColor: "white", borderRadius: "8px", boxShadow: 24, p: 3 }}>
          <Card>
            {eventData.imagePreview && <CardMedia component="img" height="200" image={eventData.imagePreview} alt="Imagem do Evento" />}
            <CardContent>
              <Typography variant="h5">{eventData.title || "Nome do Evento"}</Typography>
              <Typography variant="subtitle1" color="textSecondary">
                {eventData.startDate ? `Data: ${eventData.startDate}` : "Data não informada"}
              </Typography>
              <Typography variant="subtitle2" color="textSecondary">
                Local: {eventData.address || "Local não informado"}
              </Typography>
              <Typography variant="body2" sx={{ mt: 1 }}>
                {eventData.description || "Descrição do evento..."}
              </Typography>
              <Typography variant="caption" color="primary" sx={{ mt: 2 }} display="block">
                Categoria: {eventData.category}
              </Typography>
              <Typography variant="caption" color="primary" sx={{ mt: 1 }} display="block">
                Ingresso: {eventData.ticketType}
              </Typography>
            </CardContent>
          </Card>
          <Button fullWidth variant="contained" sx={{ mt: 2 }} onClick={() => setPreviewOpen(false)}>
            Fechar
          </Button>
        </Box>
      </Modal>
    </Box>
  );
};

export default ExperienceCreationPage;

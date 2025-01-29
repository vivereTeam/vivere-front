import React, { useState } from "react";
import { TextField, Button, MenuItem, Typography, Checkbox, FormControlLabel, Select, Box, Modal, Card, CardMedia, CardContent } from "@mui/material";

const ExperienceCreationPage = () => {
  const [eventData, setEventData] = useState({
    title: "",
    address: "",
    venueName: "",
    zipCode: "",
    street: "",
    number: "",
    complement: "",
    neighborhood: "",
    city: "",
    state: "",
    description: "",
    startDate: "",
    startTime: "",
    endDate: "",
    endTime: "",
    ticketType: "Ingresso",
    producerName: "",
    producerDescription: "",
    agreementChecked: false,
    image: null,
    imagePreview: null,
  });

  const [previewOpen, setPreviewOpen] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEventData((prevData) => ({ ...prevData, [name]: value }));
  };

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

  return (
    <Box sx={{ maxWidth: "800px", margin: "20px auto", padding: "20px", boxShadow: 2, borderRadius: "8px" }}>
      <Typography variant="h4" gutterBottom>
        Criar Evento Presencial
      </Typography>

      {/* Local */}
      <Typography variant="h6" color="primary">
        1. Onde o seu evento vai acontecer?
      </Typography>
      <TextField fullWidth label="Endereço" name="address" value={eventData.address} onChange={handleChange} margin="normal" required />
      <TextField fullWidth label="Nome do Local" name="venueName" value={eventData.venueName} onChange={handleChange} margin="normal" required />

      {/* Informações básicas */}
      <Typography variant="h6" color="primary" sx={{ mt: 3 }}>
        2. Informações básicas
      </Typography>
      <TextField fullWidth label="Nome do Evento" name="title" value={eventData.title} onChange={handleChange} margin="normal" required />
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
        3. Descrição do evento
      </Typography>
      <TextField fullWidth label="Descrição" name="description" value={eventData.description} onChange={handleChange} margin="normal" multiline rows={4} />

      {/* Data e Horário */}
      <Typography variant="h6" color="primary" sx={{ mt: 3 }}>
        4. Data e horário
      </Typography>
      <TextField fullWidth type="date" label="Data de Início" name="startDate" value={eventData.startDate} onChange={handleChange} margin="normal" required />
      <TextField fullWidth type="time" label="Hora de Início" name="startTime" value={eventData.startTime} onChange={handleChange} margin="normal" required />

      {/* Ingressos */}
      <Typography variant="h6" color="primary" sx={{ mt: 3 }}>
        5. Ingressos
      </Typography>
      <Select fullWidth name="ticketType" value={eventData.ticketType} onChange={handleChange} margin="normal">
        <MenuItem value="Ingresso">Ingresso</MenuItem>
        <MenuItem value="VIP">VIP</MenuItem>
        <MenuItem value="Gratuito">Gratuito</MenuItem>
      </Select>

      {/* Sobre o produtor */}
      <Typography variant="h6" color="primary" sx={{ mt: 3 }}>
        6. Sobre o produtor
      </Typography>
      <TextField fullWidth label="Nome do Produtor" name="producerName" value={eventData.producerName} onChange={handleChange} margin="normal" />
      <TextField fullWidth label="Descrição do Produtor" name="producerDescription" value={eventData.producerDescription} onChange={handleChange} margin="normal" multiline rows={3} />

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
        <Button variant="contained" color="primary" onClick={handleSubmit} disabled={!eventData.agreementChecked}>
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
                Local: {eventData.venueName || "Local não informado"}
              </Typography>
              <Typography variant="body2" sx={{ mt: 1 }}>
                {eventData.description || "Descrição do evento..."}
              </Typography>
              <Typography variant="caption" color="primary" sx={{ mt: 2 }}>
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

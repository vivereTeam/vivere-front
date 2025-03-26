import { useState, useEffect } from "react";
import {
  TextField,
  Button,
  MenuItem,
  Typography,
  Checkbox,
  FormControlLabel,
  Select,
  Box,
  Modal,
  Card,
  CardMedia,
  CardContent,
  CircularProgress
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { createEvento } from "../../services/api";
import { useAuth } from "../../context/AuthContext";

function mapCategoria(frontCategory) {
  switch (frontCategory) {
    case "Shows e Entretenimento":
      return "SHOWS_ENTRETENIMENTO";
    case "Workshops e Aulas":
      return "WORKSHOPS_AULAS";
    case "Viagens e Turismo":
      return "VIAGENS_TURISMO";
    case "Aventura e Adrenalina":
      return "AVENTURA_ADRENALINA";
    case "Relaxamento e Bem-Estar":
      return "RELAXAMENTO_BEM_ESTAR";
    case "Gastronomia e Degustações":
      return "GASTRONOMIA_DEGUSTACOES";
    case "Infantil e Familiar":
      return "INFANTIL_FAMILIAR";
    case "Experiências Personalizadas":
      return "EXPERIENCIAS_PERSONALIZADAS";
    default:
      return "SHOWS_ENTRETENIMENTO";
  }
}

function mapCardSize(frontSize) {
  switch (frontSize) {
    case "LARGE":
      return "LARGE";
    default:
      return "NORMAL";
  }
}

const ExperienceCreationPage = () => {
  const navigate = useNavigate();
  const { userRole, loggedIn } = useAuth();
  const [loading, setLoading] = useState(true);
  const [isCreating, setIsCreating] = useState(false);
  const [creationSuccess, setCreationSuccess] = useState(false);

  const [eventData, setEventData] = useState({
    category: "",
    title: "",
    address: "",
    description: "",
    startDate: "",
    endDate: "",
    agreementChecked: false,
    image: null,
    imagePreview: null,
    ticketPrice: "",
    ticketTax: "",
    cardSize: "",
  });

  const [previewOpen, setPreviewOpen] = useState(false);

  useEffect(() => {
    setLoading(false);
  }, []);

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '200px' }}>
        <CircularProgress color="secondary" size={40} />
      </Box>
    );
  }

  if (!loggedIn || userRole !== "ADMIN") {
    return (
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          height: '60vh',
          textAlign: 'center',
          p: 3
        }}
      >
        <Typography variant="h4" color="error" sx={{ mb: 2 }}>
          Acesso Negado
        </Typography>
        <Typography variant="h6" sx={{ mb: 3 }}>
          Você precisa ser um administrador para acessar esta página
        </Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={() => navigate('/')}
          sx={{
            px: 4,
            py: 1.5,
            fontSize: '1rem',
            fontWeight: 600
          }}
        >
          Voltar para a página inicial
        </Button>
      </Box>
    );
  }

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

  const isFormValid = () => {
    return (
      eventData.category &&
      eventData.title &&
      eventData.address &&
      eventData.startDate &&
      eventData.endDate &&
      eventData.agreementChecked &&
      eventData.ticketPrice &&
      eventData.ticketTax
    );
  };

  const handleSubmit = async () => {
    if (!isFormValid()) return;

    setIsCreating(true);

    let finalImageUrl = "";
    if (eventData.image) {
      try {
        const formData = new FormData();
        formData.append("file", eventData.image);
        const uploadResp = await axios.post("http://localhost:3000/eventos/upload", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        finalImageUrl = uploadResp.data.imageUrl;
      } catch (uploadError) {
        console.error("Erro ao fazer upload da imagem:", uploadError);
        alert("Falha no upload da imagem.");
        setIsCreating(false);
        return;
      }
    }

    const newEventData = {
      titulo: eventData.title,
      descricao: eventData.description || "Sem descrição",
      endereco: eventData.address,
      dataInicio: eventData.startDate,
      dataTermino: eventData.endDate,
      ticketType: "INGRESSO",
      imagemUrl: finalImageUrl || "",
      preco: eventData.ticketPrice,
      categoria: mapCategoria(eventData.category),
      cardSize: mapCardSize(eventData.cardSize),
    };

    try {
      await createEvento(newEventData);
      setIsCreating(false);
      setCreationSuccess(true);
      setPreviewOpen(true);
    } catch (error) {
      console.error("Erro ao criar evento:", error);
      setIsCreating(false);
      alert("Ocorreu um erro ao criar o evento.");
    }
  };

  return (
    <Box
      sx={{
        maxWidth: "800px",
        margin: "20px auto",
        padding: "20px",
        boxShadow: 2,
        borderRadius: "8px",
        bgcolor: "background.paper",
      }}
    >
      <Typography variant="h4" gutterBottom>
        Criar Evento Presencial
      </Typography>

      <Typography variant="h6" color="primary">
        1. Informações Básicas
      </Typography>
      <TextField
        fullWidth
        label="Nome do Evento"
        name="title"
        value={eventData.title}
        onChange={handleChange}
        margin="normal"
        required
        sx={{ mt: 2 }}
      />

      <Select
        fullWidth
        name="category"
        value={eventData.category}
        onChange={handleChange}
        margin="normal"
        displayEmpty
        sx={{ mt: 2 }}
      >
        <MenuItem value="" disabled>
          <em>Selecione uma categoria</em>
        </MenuItem>
        <MenuItem value="Workshops e Aulas">Workshops e Aulas</MenuItem>
        <MenuItem value="Shows e Entretenimento">Shows e Entretenimento</MenuItem>
        <MenuItem value="Viagens e Turismo">Viagens e Turismo</MenuItem>
        <MenuItem value="Aventura e Adrenalina">Aventura e Adrenalina</MenuItem>
        <MenuItem value="Relaxamento e Bem-Estar">Relaxamento e Bem-Estar</MenuItem>
        <MenuItem value="Gastronomia e Degustações">Gastronomia e Degustações</MenuItem>
        <MenuItem value="Infantil e Familiar">Infantil e Familiar</MenuItem>
        <MenuItem value="Experiências Personalizadas">Experiências Personalizadas</MenuItem>
      </Select>

      <TextField
        fullWidth
        label="Descrição"
        name="description"
        value={eventData.description}
        onChange={handleChange}
        margin="normal"
        multiline
        rows={4}
        sx={{ mt: 2 }}
      />

      <Typography variant="h6" color="primary" sx={{ mt: 3 }}>
        2. Local e Data
      </Typography>
      <TextField
        fullWidth
        label="Endereço"
        name="address"
        value={eventData.address}
        onChange={handleChange}
        margin="normal"
        required
        sx={{ mt: 2 }}
      />

      <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap", mt: 2 }}>
        <TextField
          fullWidth
          type="datetime-local"
          label="Data e Hora de Início"
          name="startDate"
          value={eventData.startDate}
          onChange={handleChange}
          margin="normal"
          required
          InputLabelProps={{ shrink: true }}
        />
        <TextField
          fullWidth
          type="datetime-local"
          label="Data e Hora de Término"
          name="endDate"
          value={eventData.endDate}
          onChange={handleChange}
          margin="normal"
          required
          InputLabelProps={{ shrink: true }}
        />
      </Box>

      <Typography variant="h6" color="primary" sx={{ mt: 3 }}>
        3. Imagem do Evento
      </Typography>
      <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", mt: 2 }}>
        <input
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          style={{ display: "none" }}
          id="image-upload"
        />
        <label htmlFor="image-upload">
          <Button variant="contained" component="span">
            Adicionar Imagem
          </Button>
        </label>
        {eventData.imagePreview && (
          <img
            src={eventData.imagePreview}
            alt="Prévia"
            style={{
              marginTop: "10px",
              width: "100%",
              maxHeight: "300px",
              objectFit: "cover",
            }}
          />
        )}
      </Box>

      <Typography variant="h6" color="primary" sx={{ mt: 3 }}>
        4. Configuração de Ingressos
      </Typography>
      <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap", mt: 2 }}>
        <TextField
          fullWidth
          label="Preço do Ingresso (R$)"
          name="ticketPrice"
          type="number"
          value={eventData.ticketPrice}
          onChange={handleChange}
          margin="normal"
          required
          inputProps={{ min: 0, step: "0.01" }}
        />
        <TextField
          fullWidth
          label="Taxa do Ingresso (R$)"
          name="ticketTax"
          type="number"
          value={eventData.ticketTax}
          onChange={handleChange}
          margin="normal"
          required
          inputProps={{ min: 0, step: "0.01" }}
        />
      </Box>

      <Typography variant="h6" color="primary" sx={{ mt: 3 }}>
        5. Configurações Adicionais
      </Typography>
      <Select
        fullWidth
        name="cardSize"
        value={eventData.cardSize}
        onChange={handleChange}
        margin="normal"
        required
        displayEmpty
        sx={{ mt: 2 }}
      >
        <MenuItem value="" disabled>
          <em>Selecione o tamanho do Card</em>
        </MenuItem>
        <MenuItem value="NORMAL">Padrão</MenuItem>
        <MenuItem value="LARGE">Grande</MenuItem>
      </Select>

      <Box sx={{ display: 'flex', alignItems: 'center', mt: 3 }}>
        <FormControlLabel
          control={
            <Checkbox
              checked={eventData.agreementChecked}
              onChange={(e) => setEventData({...eventData, agreementChecked: e.target.checked})}
              sx={{ 
                padding: '3px',
                '& .MuiSvgIcon-root': { fontSize: 24 }
              }}
            />
          }
          label="Estou de acordo com os Termos de uso e as Diretrizes da Comunidade."
          sx={{ 
            m: 0,
            '& .MuiTypography-root': { 
              fontSize: '1rem',
              lineHeight: '1.5'
            }
          }}
        />
      </Box>

      <Box sx={{ display: "flex", justifyContent: "space-between", mt: 4 }}>
        <Button variant="outlined" onClick={() => setPreviewOpen(true)}>
          Pré-visualizar
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={handleSubmit}
          disabled={!isFormValid()}
        >
          Publicar Evento
        </Button>
      </Box>

      <Modal 
        open={previewOpen} 
        disableEscapeKeyDown
        BackdropProps={{
          onClick: (e) => {
            if (!creationSuccess) {
              setPreviewOpen(false);
            }
          },
          style: { cursor: creationSuccess ? 'default' : 'pointer' }
        }}
      >
        <Box
          sx={{
            maxWidth: "500px",
            margin: "auto",
            mt: "5%",
            backgroundColor: "white",
            borderRadius: "8px",
            boxShadow: 24,
            p: 3,
            maxHeight: "90vh",
            overflowY: "auto",
          }}
        >
          {creationSuccess ? (
            <>
              <Typography variant="h5" gutterBottom align="center">
                Evento criado com sucesso!
              </Typography>
              <Typography variant="body1" align="center" sx={{ mb: 3 }}>
                "{eventData.title}" foi criado e está disponível na plataforma.
              </Typography>
              <Button
                fullWidth
                variant="contained"
                color="primary"
                onClick={() => navigate("/")}
              >
                Voltar para a página inicial
              </Button>
            </>
          ) : (
            <Card>
              {eventData.imagePreview && (
                <CardMedia
                  component="img"
                  height="200"
                  image={eventData.imagePreview}
                  alt="Imagem do Evento"
                />
              )}
              <CardContent>
                <Typography variant="h5">
                  {eventData.title || "Nome do Evento"}
                </Typography>
                <Typography variant="subtitle1" color="textSecondary">
                  {eventData.startDate
                    ? `Data de Início: ${new Date(eventData.startDate).toLocaleString()}`
                    : "Data de Início não informada"}
                </Typography>
                <Typography variant="subtitle1" color="textSecondary">
                  {eventData.endDate
                    ? `Data de Término: ${new Date(eventData.endDate).toLocaleString()}`
                    : "Data de Término não informada"}
                </Typography>
                <Typography variant="subtitle2" color="textSecondary">
                  Local: {eventData.address || "Local não informado"}
                </Typography>
                <Typography variant="body2" sx={{ mt: 1 }}>
                  {eventData.description || "Descrição do evento..."}
                </Typography>
                <Typography
                  variant="caption"
                  color="primary"
                  sx={{ mt: 2 }}
                  display="block"
                >
                  Categoria: {eventData.category}
                </Typography>
                <Box sx={{ mt: 2 }}>
                  <Typography variant="h6" color="secondary" sx={{ mb: 1 }}>
                    Ingresso Disponível
                  </Typography>
                  <Typography variant="body1">Tipo: Ingresso</Typography>
                  <Typography variant="body1">
                    Preço: R$ {parseFloat(eventData.ticketPrice).toFixed(2)}
                  </Typography>
                  <Typography variant="body1">
                    Taxa: R$ {parseFloat(eventData.ticketTax).toFixed(2)}
                  </Typography>
                  <Typography variant="body1">
                    Total:{" "}
                    {(
                      parseFloat(eventData.ticketPrice) +
                      parseFloat(eventData.ticketTax)
                    ).toFixed(2)}
                  </Typography>
                </Box>
                <Typography
                  variant="caption"
                  color="primary"
                  sx={{ mt: 2 }}
                  display="block"
                >
                  Tamanho do Card: {eventData.cardSize || "N/A"}
                </Typography>
              </CardContent>
              <Button
                fullWidth
                variant="contained"
                sx={{ mt: 2 }}
                onClick={() => setPreviewOpen(false)}
              >
                Fechar
              </Button>
            </Card>
          )}
        </Box>
      </Modal>

      {isCreating && (
        <Box
          sx={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 9999,
          }}
        >
          <Box
            sx={{
              backgroundColor: 'white',
              padding: '20px',
              borderRadius: '8px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '16px',
            }}
          >
            <CircularProgress color="primary" size={40} />
            <Typography variant="h6" color="textPrimary">
              Criando evento...
            </Typography>
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default ExperienceCreationPage;
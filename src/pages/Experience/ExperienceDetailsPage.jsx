import {
  Button,
  Card,
  CardMedia,
  Container,
  Typography,
  Box,
  IconButton,
  Chip,
  Stack,
  Snackbar,
  Alert,
  Grid,
  CircularProgress,
} from "@mui/material";

import {
  Share,
  LocationOn,
  CalendarToday,
  Schedule,
  Info,
  Star,
  Edit,
  ArrowBack,
  ConfirmationNumber,
  LocalActivity,
  Favorite,
} from "@mui/icons-material";

import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { getEventoById,addCartItem } from "../../services/api";
import { useAuth } from "../../context/AuthContext";
import { jwtDecode } from 'jwt-decode';  

const formattedCategories = {
  SHOWS_ENTRETENIMENTO: "Shows e Entretenimento",
  WORKSHOPS_AULAS: "Workshops e Aulas",
  VIAGENS_TURISMO: "Viagens e Turismo",
  AVENTURA_ADRENALINA: "Aventura e Adrenalina",
  RELAXAMENTO_BEM_ESTAR: "Relaxamento e Bem-Estar",
  GASTRONOMIA_DEGUSTACOES: "Gastronomia e Degustações",
  INFANTIL_FAMILIAR: "Infantil e Familiar",
  EXPERIENCIAS_PERSONALIZADAS: "Experiências Personalizadas",
};

function ExperienceDetailsPage() {
  const { eventId } = useParams();
  const navigate = useNavigate();
  const { loggedIn, userRole } = useAuth();

  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);

  const [showNotification, setShowNotification] = useState(false);

  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const [addToCartSuccess, setAddToCartSuccess] = useState(false);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const data = await getEventoById(eventId);
        const mappedEvent = {
          id: data.id,
          categoria: formattedCategories[data.categoria] || data.categoria,
          titulo: data.titulo,
          imagemUrl: data.imagemUrl,
          dataInicio: data.dataInicio,
          dataTermino: data.dataTermino,
          endereco: data.endereco,
          descricao: data.descricao,
          isExclusive: false,
          ticketType: data.ticketType,
          preco: data.preco,
        };

        setEvent(mappedEvent);
      } catch (error) {
        console.error("Erro ao buscar evento por ID:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchEvent();
  }, [eventId]);

  const handleShare = () => {
    const url = window.location.href;
    navigator.clipboard
      .writeText(url)
      .then(() => setShowNotification(true))
      .catch((err) => console.error("Falha ao copiar:", err));
  };

  const handleEdit = () => {
    navigate(`/edit/${eventId}`);
  };

  if (loading) {
    return (
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          height: '200px',
          width: '100%'
        }}
      >
        <CircularProgress size={40} />
      </Box>
    );
  }

  const handleAddToCart = async () => {
    if (!loggedIn || userRole !== 'USER') return;
  
    setIsAddingToCart(true);
    setAddToCartSuccess(false);
  
    try {
      const token = localStorage.getItem('token');
      if (!token) throw new Error('Token não encontrado');
  
      const decoded = jwtDecode(token);
      if (!decoded.userId) throw new Error('ID do usuário não encontrado no token');
  
      const response = await addCartItem(decoded.userId, event.id, 1);
      setAddToCartSuccess(true);
      setTimeout(() => setAddToCartSuccess(false), 3000);
  
    } catch (error) {
      console.error("Erro ao adicionar item no carrinho:", error);
    } finally {
      setIsAddingToCart(false);
    }
  };

  if (!event) {
    return (
      <Box
        sx={{
          minHeight: '50vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <Typography variant="h5">
          O evento solicitado não foi encontrado.
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ bgcolor: "#f8f9fa", minHeight: "100vh", py: 4 }}>
      <Container maxWidth="lg">
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            mb: 4,
            flexWrap: "wrap",
            gap: 2,
          }}
        >
          <Button
            variant="text"
            startIcon={<ArrowBack />}
            onClick={() => navigate("/")}
            sx={{
              textTransform: "none",
              fontSize: "1rem",
            }}
          >
            Voltar
          </Button>

          <Chip
            label={event.categoria}
            color="secondary"
            sx={{
              fontWeight: 700,
              fontSize: "0.9rem",
              px: 2,
              py: 1,
            }}
          />

          <Box sx={{ display: "flex", gap: 2, marginLeft: "auto" }}>
            {loggedIn && userRole === "ADMIN" && (
              <IconButton
                onClick={handleEdit}
                aria-label="Editar evento"
                color="secondary"
                sx={{
                  border: "2px solid",
                  borderColor: "secondary.main",
                  "&:hover": {
                    bgcolor: "secondary.main",
                    color: "white",
                    transform: "scale(1.1)",
                  },
                  transition: "all 0.3s",
                }}
              >
                <Edit />
              </IconButton>
            )}
            <IconButton
              onClick={handleShare}
              aria-label="Compartilhar"
              color="primary"
              sx={{
                border: "2px solid",
                borderColor: "primary.main",
                "&:hover": {
                  bgcolor: "primary.main",
                  color: "white",
                  transform: "scale(1.1)",
                },
                transition: "all 0.3s",
              }}
            >
              <Share />
            </IconButton>
          </Box>
        </Box>

        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <Card
              sx={{
                width: "100%",
                borderRadius: 3,
                overflow: "hidden",
                boxShadow: 5,
                position: "relative",
              }}
            >
              <CardMedia
                component="img"
                height="600"
                image={event.imagemUrl}
                alt={event.titulo}
                sx={{ objectFit: "cover" }}
              />

              {event.isExclusive && (
                <Box
                  sx={{
                    position: "absolute",
                    bottom: 16,
                    left: 16,
                    zIndex: 1,
                  }}
                >
                  <Chip
                    label="⭐ Evento Exclusivo"
                    sx={{
                      bgcolor: "rgba(255,255,255,0.9)",
                      fontWeight: 700,
                      fontSize: "1rem",
                    }}
                  />
                </Box>
              )}
            </Card>
          </Grid>

          <Grid item xs={12} md={6}>
            <Box sx={{ display: "flex", flexDirection: "column", height: "100%" }}>
              <Typography
                variant="h4"
                sx={{
                  fontWeight: 900,
                  mb: 3,
                  textAlign: "center",
                  fontSize: { xs: "2rem", md: "3rem" },
                  color: "text.primary",
                  lineHeight: 1.1,
                  letterSpacing: "-0.5px",
                }}
              >
                {event.titulo}
              </Typography>

              <Stack spacing={3} sx={{ mb: 4 }}>
                {[
                  {
                    icon: <CalendarToday color="primary" sx={{ fontSize: 30 }} />,
                    label: "Data de Início",
                    value: event.dataInicio
                      ? new Date(event.dataInicio).toLocaleString()
                      : "Data de Início não informada",
                  },
                  {
                    icon: <Schedule color="primary" sx={{ fontSize: 30 }} />,
                    label: "Data de Término",
                    value: event.dataTermino
                      ? new Date(event.dataTermino).toLocaleString()
                      : "Data de Término não informada",
                  },
                  {
                    icon: <LocationOn color="primary" sx={{ fontSize: 30 }} />,
                    label: "Localização",
                    value: event.endereco || "Local não informado",
                  },
                ].map((item, index) => (
                  <Box
                    key={index}
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 2,
                      bgcolor: "rgba(25, 118, 210, 0.05)",
                      p: 2,
                      borderRadius: 2,
                    }}
                  >
                    {item.icon}
                    <Box>
                      <Typography variant="subtitle1" color="text.secondary">
                        {item.label}
                      </Typography>
                      <Typography variant="h6" sx={{ fontWeight: 600 }}>
                        {item.value}
                      </Typography>
                    </Box>
                  </Box>
                ))}
              </Stack>

              <Box
                sx={{
                  mb: 4,
                  p: 3,
                  bgcolor: "white",
                  borderRadius: 2,
                  boxShadow: 1,
                  border: "2px solid",
                  borderColor: "primary.light",
                }}
              >
                <Typography
                  variant="h5"
                  sx={{
                    mb: 2,
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                    color: "primary.main",
                  }}
                >
                  <Info fontSize="large" />
                  Detalhes do Evento
                </Typography>
                <Typography
                  variant="body1"
                  sx={{ color: "text.secondary", lineHeight: 1.6 }}
                >
                  {event.descricao}
                </Typography>
              </Box>
              <Box sx={{ 
                mb: 4,
                p: 3,
                bgcolor: 'background.paper',
                borderRadius: 2,
                boxShadow: 1,
                border: '1px solid',
                borderColor: 'divider'
              }}>
                <Typography variant="h5" sx={{ 
                  mb: 3,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1,
                  color: 'text.primary'
                }}>
                  <ConfirmationNumber fontSize="large" color="primary" />
                  {event.ticketType === 'GRATUITO' ? 'Participação Gratuita' : 'Ingresso Disponível'}
                </Typography>

                <Box sx={{
                  p: 2,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  bgcolor: 'background.default',
                  borderRadius: 2,
                  border: '1px solid',
                  borderColor: event.ticketType === 'VIP' ? 'secondary.main' : 'divider',
                  boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
                }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    {event.ticketType === 'VIP' ? (
                      <Star color="secondary" fontSize="large" />
                    ) : event.ticketType === 'GRATUITO' ? (
                      <Favorite color="error" fontSize="large" />
                    ) : (
                      <LocalActivity color="primary" fontSize="large" />
                    )}
                    <Box>
                      <Typography variant="subtitle1" fontWeight={600}>
                        {event.ticketType === 'VIP' ? 'Ingresso VIP' : 
                        event.ticketType === 'GRATUITO' ? 'Ingresso Gratuito' : 'Ingresso Padrão'}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {event.ticketType === 'GRATUITO' ? 'Grátis' : `R$ ${event.preco?.toFixed(2) || '0,00'}`}
                      </Typography>
                    </Box>
                  </Box>

                  <Button
                    variant="contained"
                    color={
                      addToCartSuccess 
                        ? 'success' 
                        : (event.ticketType === 'VIP' ? 'secondary' : 'primary')
                    }
                    size="small"
                    disabled={!loggedIn || userRole !== 'USER' || isAddingToCart}
                    onClick={handleAddToCart}
                    sx={{ 
                      minWidth: 120,
                      fontWeight: 600,
                      borderRadius: 2,
                      '&.Mui-disabled': {
                        backgroundColor: 'grey.300',
                        color: 'text.disabled'
                      },
                      '&:hover': {
                        transform: addToCartSuccess ? 'none' : 'scale(1.03)',
                        transition: 'transform 0.2s'
                      }
                    }}
                  >
                    {isAddingToCart ? (
                      <CircularProgress size={24} color="inherit" />
                    ) : addToCartSuccess ? (
                      '✓ Adicionado!'
                    ) : event.ticketType === 'GRATUITO' ? (
                      'Reservar'
                    ) : (
                      'Comprar'
                    )}
                  </Button>
                </Box>

                {(!loggedIn || userRole !== 'USER') && (
                  <Typography 
                    variant="body2"
                    sx={{
                      color: 'error.main',
                      textAlign: 'center',
                      mt: 2,
                      px: 2,
                      py: 1,
                      borderRadius: 1,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: 1
                    }}
                  >
                    {!loggedIn ? (
                        'Faça login para realizar a compra'
                    ) : (
                      'Apenas usuários comuns podem realizar compras'
                    )}
                  </Typography>
                )}
              </Box>

                <Box
                  sx={{
                    p: 3,
                    bgcolor: "success.light",
                    borderRadius: 2,
                    textAlign: "center",
                    boxShadow: 1,
                    mb: 4
                  }}
                >
                  <Stack
                    direction={{ xs: "column", sm: "row" }}
                    spacing={2}
                    alignItems="center"
                    justifyContent="center"
                  >
                    <Box
                      sx={{
                        bgcolor: "white",
                        p: 2,
                        borderRadius: "50%",
                        boxShadow: 1,
                        fontSize: "1.5rem",
                      }}
                    >
                      🔒
                    </Box>
                    <Typography
                      variant="body1"
                      sx={{
                        fontWeight: 600,
                        color: "success.dark",
                      }}
                    >
                      Compra 100% segura • Reembolso garantido
                    </Typography>
                  </Stack>
                </Box>
            </Box>
          </Grid>
        </Grid>

        <Snackbar
          open={showNotification}
          autoHideDuration={6000}
          onClose={() => setShowNotification(false)}
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        >
          <Alert
            severity="success"
            onClose={() => setShowNotification(false)}
            sx={{ width: "100%" }}
          >
            Link da página copiado com sucesso!
          </Alert>
        </Snackbar>
      </Container>
    </Box>
  );
}

export default ExperienceDetailsPage;
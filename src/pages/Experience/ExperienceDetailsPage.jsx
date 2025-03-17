import {
  Button,
  Card,
  CardMedia,
  Container,
  Typography,
  Box,
  List,
  ListItem,
  IconButton,
  Chip,
  Stack,
  Snackbar,
  Alert,
  Drawer,
  Divider,
  Grid,
} from "@mui/material";

import {
  Share,
  LocationOn,
  CalendarToday,
  Schedule,
  Info,
  Star,
  Close,
  Remove,
  Add,
  Edit,
  ShoppingCart,
  ArrowBack,
} from "@mui/icons-material";

import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import PropTypes from 'prop-types';

function ExperienceDetailsPage({ allExperiences }) {
  const { eventId } = useParams();
  const navigate = useNavigate();
  const [cartOpen, setCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [showNotification, setShowNotification] = useState(false);
  const event = findEventById(allExperiences, eventId);

  useEffect(() => {
    if (!event) {
      console.warn("Evento não encontrado para ID:", eventId);
    }
  }, [event, eventId]);

  function findEventById(all, id) {
    for (const category of Object.keys(all)) {
      const found = all[category].find((e) => e.id.toString() === id.toString());
      if (found) {
        return { ...found, category };
      }
    }
    return null;
  }

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

  const handleAddToCart = (ticket) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.type === ticket.type);
      if (existing) {
        return prev.map((item) =>
          item.type === ticket.type
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { ...ticket, quantity: 1 }];
    });
    setCartOpen(true);
  };

  const handleQuantityChange = (ticketType, operation) => {
    setCartItems((prev) => {
      const newItems = [...prev];
      const index = newItems.findIndex((item) => item.type === ticketType);
      if (index === -1) return newItems;

      if (operation === "decrement") {
        if (newItems[index].quantity === 1) {
          newItems.splice(index, 1);
        } else {
          newItems[index] = {
            ...newItems[index],
            quantity: newItems[index].quantity - 1,
          };
        }
      } else if (operation === "increment") {
        newItems[index] = {
          ...newItems[index],
          quantity: newItems[index].quantity + 1,
        };
      }
      return newItems;
    });
  };

  const calculateTotal = () =>
    cartItems.reduce(
      (total, item) => total + (item.price + item.tax) * item.quantity,
      0
    );

  if (!event) {
    return (
      <Box
        sx={{
          minHeight: "80vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          bgcolor: "#f8f9fa",
          px: 2,
        }}
      >
        <Typography variant="h5" align="center">
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
            label={event.category}
            color="secondary"
            sx={{
              fontWeight: 700,
              fontSize: "0.9rem",
              px: 2,
              py: 1,
            }}
          />

          <Box sx={{ display: "flex", gap: 2, marginLeft: "auto" }}>
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
            <IconButton
              onClick={() => setCartOpen(true)}
              aria-label="Abrir carrinho"
              color="success"
              sx={{
                border: "2px solid",
                borderColor: "success.main",
                "&:hover": {
                  bgcolor: "success.main",
                  color: "white",
                  transform: "scale(1.1)",
                },
                transition: "all 0.3s",
              }}
            >
              <ShoppingCart />
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
                image={event.imageUrl}
                alt={event.title}
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
                {event.title}
              </Typography>

              <Stack spacing={3} sx={{ mb: 4 }}>
                {[
                  {
                    icon: <CalendarToday color="primary" sx={{ fontSize: 30 }} />,
                    label: "Data de Início",
                    value: event.startDate
                      ? new Date(event.startDate).toLocaleString()
                      : "Data de Início não informada",
                  },
                  {
                    icon: <Schedule color="primary" sx={{ fontSize: 30 }} />,
                    label: "Data de Término",
                    value: event.endDate
                      ? new Date(event.endDate).toLocaleString()
                      : "Data de Término não informada",
                  },
                  {
                    icon: <LocationOn color="primary" sx={{ fontSize: 30 }} />,
                    label: "Localização",
                    value: event.location || "Local não informado",
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
                  {event.details}
                </Typography>
              </Box>

              <Box
                sx={{
                  mb: 4,
                  p: 3,
                  bgcolor: "white",
                  borderRadius: 2,
                  boxShadow: 1,
                  border: "2px solid",
                  borderColor: "secondary.light",
                }}
              >
                <Typography
                  variant="h5"
                  sx={{
                    mb: 3,
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                    color: "secondary.main",
                  }}
                >
                  <Star fontSize="large" />
                  Ingresso Disponível
                </Typography>

                <List>
                  {event.tickets?.map((ticket) => (
                    <ListItem
                      key={`ticket-${ticket.id}`}
                      sx={{
                        p: 0,
                        mb: 2,
                        bgcolor: "background.paper",
                        borderRadius: 2,
                        overflow: "hidden",
                        boxShadow: 1,
                        transition: "box-shadow 0.2s",
                        "&:hover": {
                          boxShadow: 3,
                        },
                      }}
                    >
                      <Box
                        sx={{
                          width: "100%",
                          p: 2,
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          bgcolor: ticket.soldOut ? "action.hover" : "transparent",
                        }}
                      >
                        <Box>
                          <Typography
                            variant="body1"
                            sx={{
                              fontWeight: 600,
                              color: ticket.soldOut
                                ? "text.disabled"
                                : "text.primary",
                            }}
                          >
                            {ticket.type}
                          </Typography>
                          <Typography
                            variant="h6"
                            sx={{
                              color: ticket.soldOut
                                ? "text.disabled"
                                : "primary.main",
                              fontWeight: 700,
                            }}
                          >
                            R$ {(ticket.price + ticket.tax).toFixed(2)}
                          </Typography>
                        </Box>
                        {ticket.soldOut ? (
                          <Chip
                            label="ESGOTADO"
                            color="error"
                            sx={{
                              fontWeight: 700,
                              px: 2,
                              borderRadius: 1,
                            }}
                          />
                        ) : (
                          <Button
                            variant="contained"
                            color="secondary"
                            onClick={() => handleAddToCart(ticket)}
                            sx={{
                              px: 4,
                              fontWeight: 700,
                              borderRadius: 2,
                              textTransform: "uppercase",
                              letterSpacing: "0.5px",
                            }}
                          >
                            Comprar
                          </Button>
                        )}
                      </Box>
                    </ListItem>
                  ))}
                </List>

                <Typography
                  variant="body2"
                  sx={{
                    textAlign: "center",
                    color: "text.secondary",
                    fontStyle: "italic",
                  }}
                >
                  * Preços incluem taxas administrativas
                </Typography>
              </Box>

              <Box
                sx={{
                  p: 3,
                  bgcolor: "success.light",
                  borderRadius: 2,
                  textAlign: "center",
                  boxShadow: 1,
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

        <Drawer
          anchor="right"
          open={cartOpen}
          onClose={() => setCartOpen(false)}
          sx={{
            "& .MuiDrawer-paper": {
              width: { xs: "100%", sm: 400 },
              padding: 3,
            },
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mb: 3,
            }}
          >
            <Typography variant="h6" sx={{ fontWeight: 700 }}>
              Meu Carrinho ({cartItems.length})
            </Typography>
            <IconButton onClick={() => setCartOpen(false)} aria-label="Fechar carrinho">
              <Close />
            </IconButton>
          </Box>

          <Divider />

          <List sx={{ flexGrow: 1, mt: 2 }}>
            {cartItems.map((item) => (
              <ListItem
                key={`cart-item-${item.id}`}
                sx={{
                  py: 2,
                  borderBottom: "1px solid",
                  borderColor: "divider",
                }}
              >
                <Box sx={{ width: "100%" }}>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      mb: 1,
                    }}
                  >
                    <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                      {item.type}
                    </Typography>
                    <IconButton
                      onClick={() => handleQuantityChange(item.type, "decrement")}
                      size="small"
                      aria-label="Remover item"
                    >
                      <Close fontSize="small" />
                    </IconButton>
                  </Box>

                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                      <IconButton
                        onClick={() => handleQuantityChange(item.type, "decrement")}
                        size="small"
                        disabled={item.quantity === 1}
                        aria-label="Diminuir quantidade"
                      >
                        <Remove fontSize="small" />
                      </IconButton>
                      <Typography variant="body1">{item.quantity}</Typography>
                      <IconButton
                        onClick={() => handleQuantityChange(item.type, "increment")}
                        size="small"
                        aria-label="Aumentar quantidade"
                      >
                        <Add fontSize="small" />
                      </IconButton>
                    </Box>

                    <Typography variant="body1" sx={{ fontWeight: 600 }}>
                      R$ {((item.price + item.tax) * item.quantity).toFixed(2)}
                    </Typography>
                  </Box>
                </Box>
              </ListItem>
            ))}
          </List>

          <Divider sx={{ mt: 2 }} />

          <Box sx={{ mt: 3 }}>
            <Box sx={{ display: "flex", justifyContent: "space-between", mb: 3 }}>
              <Typography variant="h6" sx={{ fontWeight: 700 }}>
                Total:
              </Typography>
              <Typography variant="h6" sx={{ fontWeight: 700 }}>
                R$ {calculateTotal().toFixed(2)}
              </Typography>
            </Box>

            <Button
              fullWidth
              variant="contained"
              color="primary"
              size="large"
              disabled={cartItems.length === 0}
              sx={{
                borderRadius: 2,
                py: 1.5,
                textTransform: "uppercase",
                fontWeight: 700,
                letterSpacing: "0.5px",
                fontSize: "1rem",
              }}
            >
              Finalizar Compra
            </Button>
          </Box>
        </Drawer>

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

ExperienceDetailsPage.propTypes = {
  allExperiences: PropTypes.object.isRequired,
};

export default ExperienceDetailsPage;
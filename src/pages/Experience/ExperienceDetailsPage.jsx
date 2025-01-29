import { 
    Button, Card, CardMedia, Container, Typography, Box, List, 
    ListItem, IconButton, Grid, Chip, Stack
  } from "@mui/material";
  import { 
    Share, LocationOn, CalendarToday, Schedule, Info, Star, Close, 
    Remove, Add 
  } from "@mui/icons-material";
  import { useParams } from "react-router-dom";
  import { useState } from "react";
  
  const ExperienceDetailsPage = () => {
    const { eventId } = useParams();
    const [cartOpen, setCartOpen] = useState(false);
    const [cartItems, setCartItems] = useState([]);
  
    const eventData = {
      id: eventId,
      title: "SUMMER ELETROHITS no Edifício Martinelli | 22.02",
      date: "2025-02-22T14:00:00",
      endDate: "2025-02-22T22:00:00",
      location: "Condomínio do Edifício Martinelli, São Paulo - SP",
      imageUrl: "https://picsum.photos/id/500/1920/720",
      details: [
        "Lineup exclusivo com DJs internacionais",
        "Open bar até as 20h (bebidas premium)",
        "Área VIP com vista panorâmica",
        "Traje: Esporte fino"
      ],
      tickets: [
        { type: "PROMOCIONAL (Entrada até 15h)", price: 70, tax: 7, soldOut: true },
        { type: "LOTE 2", price: 80, tax: 8, soldOut: true },
        { type: "LOTE 3", price: 100, tax: 10, soldOut: false }
      ]
    };
  
    const handleAddToCart = (ticket) => {
      setCartItems(prev => {
        const existing = prev.find(item => item.type === ticket.type);
        if(existing) {
          return prev.map(item => 
            item.type === ticket.type 
              ? {...item, quantity: item.quantity + 1} 
              : item
          );
        }
        return [...prev, {...ticket, quantity: 1}];
      });
      setCartOpen(true);
    };
  
    const handleQuantityChange = (ticketType, operation) => {
      setCartItems(prev => {
        const existing = prev.find(item => item.type === ticketType);
        if(!existing) return prev;
  
        if(operation === 'decrement') {
          if(existing.quantity === 1) {
            return prev.filter(item => item.type !== ticketType);
          }
          return prev.map(item => 
            item.type === ticketType 
              ? {...item, quantity: item.quantity - 1} 
              : item
          );
        }
        
        return prev.map(item => 
          item.type === ticketType 
            ? {...item, quantity: item.quantity + 1} 
            : item
        );
      });
    };
  
    const calculateTotal = () => {
      return cartItems.reduce((total, item) => 
        total + (item.price + item.tax) * item.quantity, 0
      );
    };
  
    return (
      <Box sx={{ bgcolor: '#f8f9fa', minHeight: '100vh' }}>
        <Container maxWidth="lg" sx={{ py: 4 }}>
          {/* Cabeçalho */}
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 4 }}>
            <Chip 
              label="Evento Premium" 
              color="secondary" 
              sx={{ 
                fontWeight: 700,
                fontSize: '0.9rem',
                px: 2,
                py: 1
              }}
            />
            <IconButton color="primary" sx={{ 
              border: '2px solid', 
              borderColor: 'primary.main',
              '&:hover': { 
                bgcolor: 'primary.main', 
                color: 'white',
                transform: 'rotate(-15deg)'
              },
              transition: 'all 0.3s'
            }}>
              <Share />
            </IconButton>
          </Box>
  
          <Grid container spacing={4}>
            {/* Imagem Principal */}
            <Grid item xs={12} md={6}>
              <Card sx={{ 
                borderRadius: 3, 
                overflow: 'hidden',
                boxShadow: 5,
                position: 'relative',
                '&:after': {
                  content: '""',
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  right: 0,
                  height: '40%',
                  background: 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 100%)'
                }
              }}>
                <CardMedia
                  component="img"
                  height="500"
                  image={eventData.imageUrl}
                  alt={eventData.title}
                  sx={{ objectFit: 'cover' }}
                />
                <Box sx={{
                  position: 'absolute',
                  bottom: 16,
                  left: 16,
                  zIndex: 1
                }}>
                  <Chip 
                    label="⭐ Evento Exclusivo"
                    sx={{
                      bgcolor: 'rgba(255,255,255,0.9)',
                      fontWeight: 700,
                      fontSize: '1rem'
                    }}
                  />
                </Box>
              </Card>
            </Grid>
  
            {/* Detalhes do Evento */}
            <Grid item xs={12} md={6}>
              <Typography variant="h3" sx={{ 
                fontWeight: 900, 
                mb: 3,
                fontSize: '2.75rem',
                color: 'text.primary',
                lineHeight: 1.1,
                letterSpacing: '-0.5px'
              }}>
                {eventData.title}
              </Typography>
  
              {/* Informações Chave */}
              <Stack spacing={2} sx={{ mb: 4 }}>
                <Box sx={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: 2,
                  bgcolor: 'rgba(25, 118, 210, 0.1)',
                  p: 2,
                  borderRadius: 2
                }}>
                  <CalendarToday color="primary" sx={{ fontSize: 28 }} />
                  <Box>
                    <Typography variant="body2" color="text.secondary">
                      DATA DO EVENTO
                    </Typography>
                    <Typography variant="h6" sx={{ fontWeight: 600 }}>
                      {new Date(eventData.date).toLocaleDateString('pt-BR', { 
                        day: 'numeric', 
                        month: 'long', 
                        year: 'numeric' 
                      })}
                    </Typography>
                  </Box>
                </Box>
  
                <Box sx={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: 2,
                  bgcolor: 'rgba(25, 118, 210, 0.1)',
                  p: 2,
                  borderRadius: 2
                }}>
                  <Schedule color="primary" sx={{ fontSize: 28 }} />
                  <Box>
                    <Typography variant="body2" color="text.secondary">
                      HORÁRIO
                    </Typography>
                    <Typography variant="h6" sx={{ fontWeight: 600 }}>
                      {new Date(eventData.date).toLocaleTimeString('pt-BR', { 
                        hour: '2-digit', 
                        minute: '2-digit' 
                      })} - {new Date(eventData.endDate).toLocaleTimeString('pt-BR', { 
                        hour: '2-digit', 
                        minute: '2-digit' 
                      })}
                    </Typography>
                  </Box>
                </Box>
  
                <Box sx={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: 2,
                  bgcolor: 'rgba(25, 118, 210, 0.1)',
                  p: 2,
                  borderRadius: 2
                }}>
                  <LocationOn color="primary" sx={{ fontSize: 28 }} />
                  <Box>
                    <Typography variant="body2" color="text.secondary">
                      LOCALIZAÇÃO
                    </Typography>
                    <Typography variant="h6" sx={{ fontWeight: 600 }}>
                      {eventData.location}
                    </Typography>
                  </Box>
                </Box>
              </Stack>
  
              {/* Descrição Detalhada */}
              <Box sx={{ 
                mb: 4,
                p: 3,
                bgcolor: 'white',
                borderRadius: 2,
                boxShadow: 1,
                border: '2px solid',
                borderColor: 'primary.light'
              }}>
                <Typography variant="h5" sx={{ 
                  mb: 2,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1,
                  color: 'primary.main'
                }}>
                  <Info fontSize="large" />
                  Detalhes do Evento
                </Typography>
                
                <List dense sx={{ listStyleType: 'disc', pl: 4 }}>
                  {eventData.details.map((detail, index) => (
                    <ListItem key={index} sx={{ 
                      display: 'list-item',
                      p: 0,
                      color: 'text.secondary',
                      lineHeight: 1.6
                    }}>
                      <Typography variant="body1">
                        <Box component="span" sx={{ fontWeight: 600 }}>
                          {detail.split(':')[0]}:
                        </Box>
                        {detail.split(':')[1]}
                      </Typography>
                    </ListItem>
                  ))}
                </List>
              </Box>
  
              {/* Seção de Ingressos */}
              <Box sx={{ 
                mb: 4,
                p: 3,
                bgcolor: 'white',
                borderRadius: 2,
                boxShadow: 1,
                border: '2px solid',
                borderColor: 'secondary.light'
              }}>
                <Typography variant="h5" sx={{ 
                  mb: 3,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1,
                  color: 'secondary.main'
                }}>
                  <Star fontSize="large" />
                  Escolha Seu Ingresso
                </Typography>
  
                <List sx={{ mb: 2 }}>
                  {eventData.tickets.map((ticket, index) => (
                    <ListItem key={index} sx={{ 
                      p: 0, 
                      mb: 2,
                      bgcolor: 'background.paper',
                      borderRadius: 2,
                      overflow: 'hidden',
                      boxShadow: 1,
                      transition: 'all 0.2s',
                      '&:hover': {
                        boxShadow: 3
                      }
                    }}>
                      <Box sx={{ 
                        width: '100%', 
                        p: 2,
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        bgcolor: ticket.soldOut ? 'action.hover' : 'transparent'
                      }}>
                        <Box>
                          <Typography variant="body1" sx={{ 
                            fontWeight: 600,
                            color: ticket.soldOut ? 'text.disabled' : 'text.primary'
                          }}>
                            {ticket.type}
                          </Typography>
                          <Typography variant="h6" sx={{ 
                            color: ticket.soldOut ? 'text.disabled' : 'primary.main',
                            fontWeight: 700
                          }}>
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
                              borderRadius: 1
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
                              textTransform: 'uppercase',
                              letterSpacing: '0.5px'
                            }}
                          >
                            Comprar
                          </Button>
                        )}
                      </Box>
                    </ListItem>
                  ))}
                </List>
  
                <Typography variant="body2" sx={{ 
                  textAlign: 'center',
                  color: 'text.secondary',
                  fontStyle: 'italic'
                }}>
                  * Preços incluem taxas administrativas
                </Typography>
              </Box>
  
              {/* Garantia de Segurança */}
              <Box sx={{ 
                p: 3,
                bgcolor: 'success.light',
                borderRadius: 2,
                textAlign: 'center',
                boxShadow: 1
              }}>
                <Stack direction="row" spacing={2} alignItems="center" justifyContent="center">
                  <Box sx={{ 
                    bgcolor: 'white', 
                    p: 1,
                    borderRadius: '50%',
                    boxShadow: 1
                  }}>
                    🔒
                  </Box>
                  <Typography variant="body1" sx={{ 
                    fontWeight: 600,
                    color: 'success.dark'
                  }}>
                    Compra 100% segura • Reembolso garantido
                  </Typography>
                </Stack>
              </Box>
            </Grid>
          </Grid>
  
          {/* Carrinho de Compras */}
          <Box
            sx={{
              position: 'fixed',
              right: cartOpen ? 0 : '-400px',
              top: 0,
              height: '100vh',
              width: { xs: '100%', sm: 400 },
              bgcolor: 'white',
              boxShadow: 5,
              transition: 'right 0.3s ease-in-out',
              zIndex: 9999,
              p: 3,
              display: 'flex',
              flexDirection: 'column',
              overflowY: 'auto'
            }}
          >
            <Box sx={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: 'center',
              mb: 3
            }}>
              <Typography variant="h6" sx={{ fontWeight: 700 }}>
                Meu Carrinho ({cartItems.length})
              </Typography>
              <IconButton onClick={() => setCartOpen(false)}>
                <Close />
              </IconButton>
            </Box>
  
            <List sx={{ flexGrow: 1 }}>
              {cartItems.map((item, index) => (
                <ListItem key={index} sx={{ 
                  py: 2, 
                  borderBottom: '1px solid', 
                  borderColor: 'divider' 
                }}>
                  <Box sx={{ width: '100%' }}>
                    <Box sx={{ 
                      display: 'flex', 
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      mb: 1
                    }}>
                      <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                        {item.type}
                      </Typography>
                      <IconButton 
                        onClick={() => handleQuantityChange(item.type, 'decrement')}
                        size="small"
                      >
                        <Close fontSize="small" />
                      </IconButton>
                    </Box>
                    
                    <Box sx={{ 
                      display: 'flex', 
                      justifyContent: 'space-between',
                      alignItems: 'center'
                    }}>
                      <Box sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 1
                      }}>
                        <IconButton 
                          onClick={() => handleQuantityChange(item.type, 'decrement')}
                          size="small"
                          disabled={item.quantity === 1}
                        >
                          <Remove fontSize="small" />
                        </IconButton>
                        <Typography variant="body1">
                          {item.quantity}
                        </Typography>
                        <IconButton 
                          onClick={() => handleQuantityChange(item.type, 'increment')}
                          size="small"
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
  
            <Box sx={{ mt: 2, pt: 2 }}>
              <Box sx={{ 
                display: 'flex', 
                justifyContent: 'space-between',
                mb: 3
              }}>
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
                  textTransform: 'uppercase',
                  fontWeight: 700
                }}
              >
                Finalizar Compra
              </Button>
            </Box>
          </Box>
        </Container>
      </Box>
    );
  };
  
  export default ExperienceDetailsPage;
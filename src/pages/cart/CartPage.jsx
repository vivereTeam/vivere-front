import { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Box,
  Button,
  Paper,
  Stack,
  CircularProgress,
  Alert,
  Divider,
  useTheme,
  Snackbar
} from '@mui/material';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { getCart, clearCart } from '../../services/api';
import CartTicketItem from '../../components/CartTicketItem';
import ShoppingCartCheckoutIcon from '@mui/icons-material/ShoppingCartCheckout';

const CartPage = () => {
  const { userId, loggedIn, userRole } = useAuth();
  const navigate = useNavigate();
  const theme = useTheme();
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [checkoutLoading, setCheckoutLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState(null);

  const fetchCart = async () => {
    try {
      const cartData = await getCart(userId);
      setCartItems(cartData.itens || []);
    } catch (err) {
      setError('Erro ao carregar carrinho');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (loggedIn && userRole === 'USER' && userId) {
      fetchCart();
    }
  }, [loggedIn, userRole, userId]);

  const handleCartUpdate = (updatedItem, shouldRemove = false) => {
    setCartItems(prevItems => {
      if (shouldRemove) {
        return prevItems.filter(item => item.id !== updatedItem.id);
      }
      return prevItems.map(item => 
        item.id === updatedItem.id ? updatedItem : item
      );
    });
  };

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => {
      return item.evento.ticketType === 'GRATUITO' 
        ? total 
        : total + (item.evento.preco * item.quantidade);
    }, 0);
  };

  const handleCheckout = async () => {
    try {
      setCheckoutLoading(true);
      // Limpa o carrinho no backend
      await clearCart(userId);
      // Atualiza o estado local
      setCartItems([]);
      // Mostra mensagem de sucesso
      setSuccessMessage('Compra realizada com sucesso!');
    } catch (err) {
      setError('Erro ao finalizar compra');
    } finally {
      setCheckoutLoading(false);
    }
  };

  const handleCloseSnackbar = () => {
    setSuccessMessage(null);
  };

  if (!loggedIn || userRole !== 'USER') {
    return (
      <Container maxWidth="md" sx={{ 
        py: 8, 
        textAlign: 'center',
        minHeight: '60vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center'
      }}>
        <Typography variant="h4" sx={{ 
          color: theme.palette.primary.main,
          fontWeight: 700,
          mb: 2
        }}>
          Acesso restrito
        </Typography>
        <Typography variant="h6" sx={{ color: 'text.secondary' }}>
          {!loggedIn ? 'Faça login para acessar seu carrinho' : 'Apenas usuários comuns podem realizar compras'}
        </Typography>
        <Button
          variant="contained"
          onClick={() => navigate(!loggedIn ? '/login' : '/')}
          sx={{
            mt: 3,
            backgroundColor: theme.palette.secondary.main,
            color: 'black',
            '&:hover': {
              backgroundColor: '#e6e600'
            }
          }}
        >
          {!loggedIn ? 'Ir para Login' : 'Voltar para Home'}
        </Button>
      </Container>
    );
  }

  return (
    <Container maxWidth="md" sx={{ 
      py: 4,
      fontFamily: "'Poppins', sans-serif"
    }}>
      <Typography variant="h3" sx={{ 
        fontWeight: 700,
        color: theme.palette.primary.main,
        mb: 4,
        display: 'flex',
        alignItems: 'center',
        gap: 2
      }}>
        <ShoppingCartCheckoutIcon fontSize="large" />
        Meu Carrinho
      </Typography>

      {loading ? (
        <Box display="flex" justifyContent="center" py={8}>
          <CircularProgress size={60} sx={{ color: theme.palette.secondary.main }} />
        </Box>
      ) : error ? (
        <Alert 
          severity="error"
          sx={{ 
            mb: 4,
            fontFamily: "'Poppins', sans-serif",
            fontSize: '1rem'
          }}
          action={
            <Button 
              color="inherit" 
              size="small" 
              onClick={fetchCart}
              sx={{
                color: theme.palette.primary.main,
                fontWeight: 600
              }}
            >
              Tentar novamente
            </Button>
          }
        >
          {error}
        </Alert>
      ) : cartItems.length === 0 ? (
        <Paper sx={{ 
          p: 6, 
          textAlign: 'center',
          borderRadius: 2,
          boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)'
        }}>
          <Typography variant="h5" sx={{ 
            fontWeight: 600,
            mb: 3,
            color: theme.palette.primary.main
          }}>
            {successMessage ? 'Compra realizada com sucesso!' : 'Seu carrinho está vazio'}
          </Typography>
          <Typography variant="body1" sx={{ mb: 3, color: 'text.secondary' }}>
            {successMessage 
              ? 'Obrigado por sua compra! Volte sempre para novas experiências.' 
              : 'Adicione experiências incríveis ao seu carrinho e comece sua aventura!'}
          </Typography>
          <Button 
            variant="contained"
            onClick={() => navigate('/')}
            sx={{
              px: 4,
              py: 1.5,
              backgroundColor: '#fffa00',
              color: 'black',
              fontWeight: 600,
              '&:hover': {
                backgroundColor: '#e6e600'
              }
            }}
          >
            Explorar Eventos
          </Button>
        </Paper>
      ) : (
        <>
          <Stack spacing={3} mb={6}>
            {cartItems.map(item => (
              <CartTicketItem
                key={`${item.id}-${item.evento.id}-${item.quantidade}`}
                item={item}
                onCartUpdate={fetchCart}
              />
            ))}
          </Stack>

          <Paper sx={{ 
            p: 4,
            borderRadius: 2,
            boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)',
            backgroundColor: theme.palette.background.paper
          }}>
            <Stack spacing={3}>
              <Box display="flex" justifyContent="space-between">
                <Typography variant="h5" sx={{ fontWeight: 600 }}>
                  Total:
                </Typography>
                <Typography variant="h4" sx={{ 
                  fontWeight: 700,
                  color: theme.palette.primary.main
                }}>
                  R$ {calculateTotal().toFixed(2)}
                </Typography>
              </Box>
              
              <Divider sx={{ my: 1 }} />
              
              <Button
                variant="contained"
                size="large"
                fullWidth
                onClick={handleCheckout}
                disabled={checkoutLoading}
                sx={{
                  py: 2,
                  backgroundColor: '#fffa00',
                  color: 'black',
                  fontWeight: 700,
                  fontSize: '1.1rem',
                  '&:hover': {
                    backgroundColor: '#e6e600',
                    transform: 'translateY(-2px)',
                    boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.2)'
                  },
                  '&:disabled': {
                    backgroundColor: '#f5f5f5'
                  },
                  transition: 'all 0.3s ease'
                }}
                startIcon={checkoutLoading ? null : <ShoppingCartCheckoutIcon />}
              >
                {checkoutLoading ? (
                  <CircularProgress size={24} sx={{ color: theme.palette.primary.main }} />
                ) : (
                  'Finalizar Compra'
                )}
              </Button>
            </Stack>
          </Paper>
        </>
      )}

      <Snackbar
        open={!!successMessage}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert 
          onClose={handleCloseSnackbar} 
          severity="success"
          sx={{ width: '100%' }}
        >
          {successMessage}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default CartPage;
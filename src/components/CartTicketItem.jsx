import React, { useState } from 'react';
import {
  Box,
  Typography,
  IconButton,
  Avatar,
  Paper,
  Grid,
  ButtonGroup,
  CircularProgress,
  Alert
} from "@mui/material";
import { Add, Remove, DeleteOutline } from "@mui/icons-material";
import { styled } from "@mui/material/styles";
import { updateCartItem, removeCartItem } from '../services/api';
import { getCategoryFrontendLabel } from '../services/constants';

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  marginBottom: theme.spacing(2),
  transition: 'all 0.2s ease-out',
  '&:hover': { boxShadow: theme.shadows[4] }
}));

const CartTicketItem = ({ item, onCartUpdate }) => {
  const [localQuantity, setLocalQuantity] = useState(item.quantidade);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleQuantityChange = async (newQuantity) => {
    if (newQuantity === localQuantity || newQuantity < 1) return;
    
    setLocalQuantity(newQuantity);
    setLoading(true);
    
    try {
      await updateCartItem(item.id, newQuantity);
      onCartUpdate({ ...item, quantidade: newQuantity }, false);
    } catch (err) {
      setError('Erro ao atualizar quantidade');
      setLocalQuantity(item.quantidade);
    } finally {
      setLoading(false);
    }
  };

  const handleRemove = async () => {
    setLoading(true);
    try {
      await removeCartItem(item.id);
      onCartUpdate(item, true);
    } catch (err) {
      setError('Erro ao remover item');
    } finally {
      setLoading(false);
    }
  };

  return (
    <StyledPaper elevation={2}>
      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
      
      <Grid container spacing={2} alignItems="center">
        <Grid item xs={3} md={2}>
          <Avatar
            src={item.evento.imagemUrl}
            variant="rounded"
            sx={{ width: 56, height: 56 }}
          />
        </Grid>

        <Grid item xs={6} md={7}>
          <Typography variant="subtitle1" fontWeight={600}>
            {item.evento.titulo}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {getCategoryFrontendLabel(item.evento.categoria) || item.evento.categoria}
          </Typography>
        </Grid>

        <Grid item xs={3} md={3}>
          <Box display="flex" alignItems="center" justifyContent="flex-end" gap={1}>
            {loading ? (
              <CircularProgress size={24} />
            ) : (
              <>
                <ButtonGroup variant="outlined" size="small">
                  <IconButton 
                    onClick={() => handleQuantityChange(localQuantity - 1)}
                    disabled={localQuantity <= 1}
                    size="small"
                  >
                    <Remove fontSize="small" />
                  </IconButton>
                  
                  <Box display="flex" alignItems="center" justifyContent="center" minWidth={30}>
                    <Typography>{localQuantity}</Typography>
                  </Box>
                  
                  <IconButton 
                    onClick={() => handleQuantityChange(localQuantity + 1)}
                    size="small"
                  >
                    <Add fontSize="small" />
                  </IconButton>
                </ButtonGroup>
                
                <IconButton onClick={handleRemove} size="small" color="error">
                  <DeleteOutline />
                </IconButton>
              </>
            )}
          </Box>
          
          <Typography variant="subtitle2" textAlign="right" mt={1}>
            Total: R$ {(item.evento.preco * localQuantity).toFixed(2)}
          </Typography>
        </Grid>
      </Grid>
    </StyledPaper>
  );
};

export default React.memo(CartTicketItem);
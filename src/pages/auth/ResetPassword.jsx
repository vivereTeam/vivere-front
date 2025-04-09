import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  TextField, 
  Button, 
  Typography, 
  Box, 
  IconButton, 
  InputAdornment,
  Alert,
  Link,
  CircularProgress
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { resetPassword } from '../../services/api';

function ResetPassword() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);
    
    if (!email.includes('@')) {
      setError('Por favor, insira um email válido');
      setIsSubmitting(false);
      return;
    }

    if (password.length < 8) {
      setError('A senha deve ter pelo menos 8 caracteres');
      setIsSubmitting(false);
      return;
    }

    if (password !== confirmPassword) {
      setError('As senhas não coincidem');
      setIsSubmitting(false);
      return;
    }

    try {
      await resetPassword(email, password);
      setSuccess(`Senha atualizada com sucesso para ${email}`);
      setTimeout(() => navigate('/login'), 2000);
    } catch (err) {
      setError(err.response?.data?.error || 'Erro ao atualizar senha. Verifique o email informado.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Box
      sx={{
        fontFamily: "'Poppins', sans-serif",
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        bgcolor: 'background.paper',
        p: 2,
        backgroundImage: 'linear-gradient(to bottom right, #f5f7fa, #e4e8f0)'
      }}
    >
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          width: '100%',
          maxWidth: 450,
          bgcolor: 'background.paper',
          p: 4,
          borderRadius: 2,
          boxShadow: 3,
          border: '1px solid rgba(0, 0, 0, 0.12)'
        }}
      >
        <Typography 
          variant="h5" 
          component="h1" 
          gutterBottom 
          align="center" 
          sx={{ 
            fontWeight: 600,
            mb: 3,
          }}
        >
          Redefinir Senha
        </Typography>

        <TextField
          label="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          fullWidth
          margin="normal"
          required
          autoComplete="email"
          sx={{ mb: 2 }}
        />

        <TextField
          label="Nova Senha"
          type={showPassword ? 'text' : 'password'}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          fullWidth
          margin="normal"
          required
          autoComplete="new-password"
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={() => setShowPassword(!showPassword)}
                  edge="end"
                  aria-label="toggle password visibility"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
          sx={{ mb: 2 }}
        />

        <TextField
          label="Confirmar Nova Senha"
          type={showPassword ? 'text' : 'password'}
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          fullWidth
          margin="normal"
          required
          autoComplete="new-password"
          sx={{ mb: 2 }}
        />

        {error && (
          <Alert severity="error" sx={{ my: 2 }}>
            {error}
          </Alert>
        )}

        {success && (
          <Alert severity="success" sx={{ my: 2 }}>
            {success}
          </Alert>
        )}

        <Button
          type="submit"
          fullWidth
          variant="contained"
          size="large"
          disabled={isSubmitting}
          sx={{ 
            mt: 3, 
            mb: 2,
            height: 48,
            '&:hover': {
              transform: 'translateY(-1px)',
              boxShadow: 2
            },
            transition: 'all 0.2s'
          }}
        >
          {isSubmitting ? <CircularProgress size={24} color="inherit" /> : 'Atualizar Senha'}
        </Button>

        <Link 
          href="/login" 
          underline="hover"
          sx={{ 
            display: 'block',
            textAlign: 'center',
            color: 'primary.main',
            '&:hover': {
              fontWeight: 500
            }
          }}
        >
          Voltar para o login
        </Link>
      </Box>
    </Box>
  );
}

export default ResetPassword;
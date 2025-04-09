import { useState, useCallback } from 'react';
import { userLogin } from '../../services/api';
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
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [emailError, setEmailError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const validateEmail = useCallback(() => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setEmailError('Formato de email inválido. Use: exemplo@dominio.com');
      return false;
    }
    setEmailError('');
    return true;
  }, [email]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSubmitting) return;
    
    setError('');
    setSuccess('');
    setIsSubmitting(true);

    const isEmailValid = validateEmail();

    if (!isEmailValid) {
      setIsSubmitting(false);
      return;
    }

    try {
      const response = await userLogin(email, password);
      if (response.token) {
        login(response.token, response.user.nome, response.user.role, response.user.id);
        navigate('/')
      }
    } catch (err) {
      if (err.response?.status === 401) {
        setError('Credenciais inválidas. Verifique seu email e senha.');
      } else if (err.response?.status === 429) {
        setError('Muitas tentativas. Tente novamente mais tarde.');
      } else {
        setError('Erro ao fazer login. Tente novamente.');
      }
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
          Acesse sua conta
        </Typography>

        <TextField
          label="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          onBlur={validateEmail}
          error={!!emailError}
          helperText={emailError}
          fullWidth
          margin="normal"
          required
          autoComplete="username"
          sx={{ mb: 2 }}
        />

        <TextField
          label="Senha"
          type={showPassword ? 'text' : 'password'}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          fullWidth
          margin="normal"
          required
          autoComplete="current-password"
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={handleClickShowPassword}
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
          {isSubmitting ? (
            <CircularProgress size={24} color="inherit" />
          ) : (
            'Entrar'
          )}
        </Button>

        <Box sx={{ 
          display: 'flex', 
          justifyContent: 'space-between',
          mt: 2,
          flexDirection: { xs: 'column', sm: 'row' },
          gap: 1
        }}>
          <Link 
            href="/register" 
            underline="hover"
            sx={{ 
              textAlign: 'center',
              color: 'primary.main',
              '&:hover': {
                fontWeight: 500
              }
            }}
          >
            Criar nova conta
          </Link>
          <Link 
            href="/reset-password" 
            underline="hover"
            sx={{ 
              textAlign: 'center',
              color: 'primary.main',
              '&:hover': {
                fontWeight: 500
              }
            }}
          >
            Recuperar senha
          </Link>
        </Box>
      </Box>
    </Box>
  );
}

export default Login;
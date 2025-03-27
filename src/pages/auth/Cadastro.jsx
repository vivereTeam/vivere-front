import { useState, useCallback } from 'react';
import { userRegister } from '../../services/api';
import { 
  TextField, 
  Button, 
  Typography, 
  Box, 
  IconButton, 
  InputAdornment,
  Alert,
  Link,
  FormControlLabel,
  Checkbox
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

function Cadastro() {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

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

  const validatePassword = useCallback(() => {
    if (password !== confirmPassword) {
      setPasswordError('As senhas não coincidem');
      return false;
    }
    if (password.length < 8) {
      setPasswordError('A senha deve ter pelo menos 8 caracteres');
      return false;
    }
    setPasswordError('');
    return true;
  }, [password, confirmPassword]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSubmitting) return;
    
    setError('');
    setSuccess('');
    setIsSubmitting(true);

    const isEmailValid = validateEmail();
    const isPasswordValid = validatePassword();

    if (!isEmailValid || !isPasswordValid) {
      setIsSubmitting(false);
      return;
    }

    if (!acceptedTerms) {
      setError('Você deve aceitar os termos de uso');
      setIsSubmitting(false);
      return;
    }

    try {
      const response = await userRegister(email, password, nome);
      setSuccess('Cadastro realizado com sucesso!');
      setTimeout(() => navigate('/login'), 2000);
    } catch (err) {
      if (err.response?.data?.error) {
        setError(err.response.data.error);
      } else {
        setError('Erro ao cadastrar. Tente novamente.');
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
        backgroundImage: 'linear-gradient(to bottom right, #f5f7fa, #e4e8f0)',
        p: 2
      }}
    >
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          width: '100%',
          maxWidth: 450,
          bgcolor: 'background.default',
          p: 4,
          borderRadius: 2,
          boxShadow: 3
        }}
      >
        <Typography variant="h5" component="h1" gutterBottom align="center" sx={{ fontWeight: 600 }}>
          Cadastro
        </Typography>

        <TextField
          label="Nome completo"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          fullWidth
          margin="normal"
          required
        />

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
        />

        <TextField
          label="Senha"
          type={showPassword ? 'text' : 'password'}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          fullWidth
          margin="normal"
          required
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={handleClickShowPassword}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />

        <TextField
          label="Confirmar senha"
          type={showPassword ? 'text' : 'password'}
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          onBlur={validatePassword}
          error={!!passwordError}
          helperText={passwordError}
          fullWidth
          margin="normal"
          required
        />

        <FormControlLabel
          control={
            <Checkbox
              checked={acceptedTerms}
              onChange={(e) => setAcceptedTerms(e.target.checked)}
              color="primary"
            />
          }
          label={
            <Typography variant="body2">
              Eu concordo com os <Link href="/termos" underline="hover">Termos de Uso</Link> e <Link href="/privacidade" underline="hover">Política de Privacidade</Link>
            </Typography>
          }
          sx={{ mt: 2 }}
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
            bgcolor: 'primary.main',
            '&:hover': {
              bgcolor: 'primary.dark'
            }
          }}
        >
          {isSubmitting ? 'Cadastrando...' : 'Cadastrar'}
        </Button>

        <Typography variant="body2" align="center" sx={{ mt: 2 }}>
          Já possui uma conta?{' '}
          <Link 
            href="/login" 
            underline="hover"
            sx={{ color: 'primary.main' }}
          >
            Faça login
          </Link>
        </Typography>
      </Box>
    </Box>
  );
}

export default Cadastro;
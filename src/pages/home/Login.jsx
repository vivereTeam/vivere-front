import { useState } from 'react';
import { userLogin } from '../../services/api';
import { IconButton, InputAdornment, TextField } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        try {
            const response = await userLogin(email, password);
            if (response.token) {
                localStorage.setItem('token', response.token);
                localStorage.setItem('userName', response.user.nome);
                navigate('/');
            }
        } catch (err) {
            setError('Email ou senha incorretos. Tente novamente.');
        }
    };

    return (
        <div>
            <div style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                minHeight: '100vh',
                backgroundColor: '#f4f4f4',
                fontFamily: "'Poppins', sans-serif",
            }}>
                <div style={{
                    maxWidth: '400px',
                    width: '100%',
                    backgroundColor: 'white',
                    padding: '30px',
                    borderRadius: '8px',
                    boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
                    textAlign: 'center',
                }}>
                    <h2 style={{ marginBottom: '20px' }}>Login</h2>

                    <form onSubmit={handleSubmit}>
                        <div style={{ marginBottom: '20px' }}>
                            <label htmlFor="email" style={{ display: 'block', marginBottom: '8px' }}>Email</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                placeholder="Digite seu email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                style={{
                                    width: '100%',
                                    padding: '12px',
                                    fontSize: '16px',
                                    borderRadius: '4px',
                                    border: '1px solid #ccc',
                                    boxSizing: 'border-box',
                                }}
                                required
                            />
                        </div>

                        <div style={{ marginBottom: '20px' }}>
                            <label htmlFor="senha" style={{ display: 'block', marginBottom: '8px' }}>Senha</label>
                            <TextField
                                type={showPassword ? 'text' : 'password'}
                                id="senha"
                                name="senha"
                                placeholder="Digite sua senha"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                fullWidth
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
                                style={{
                                    fontSize: '16px',
                                    borderRadius: '4px',
                                }}
                                required
                            />
                        </div>

                        {error && (
                            <p style={{ color: 'red', marginBottom: '20px', textAlign: 'center' }}>
                                {error}
                            </p>
                        )}

                        <div>
                            <button
                                type="submit"
                                style={{
                                    padding: '12px 20px',
                                    fontSize: '16px',
                                    width: '100%',
                                    backgroundColor: 'hsl(258, 79.80%, 23.30%)',
                                    color: 'white',
                                    border: 'none',
                                    borderRadius: '4px',
                                    cursor: 'pointer',
                                }}
                            >
                                Entrar
                            </button>
                        </div>
                    </form>

                    <div style={{ marginTop: '20px' }}>
                        <a href="/register" style={{ color: '#007BFF', textDecoration: 'none' }}>Não tem uma conta? Cadastre-se</a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
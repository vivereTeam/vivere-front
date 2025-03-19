import React, { useState } from 'react';
import { userRegister } from '../../services/api';
import { IconButton, InputAdornment, TextField } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';

function Cadastro() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [nome, setNome] = useState('');
  const [mensagem, setMensagem] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await userRegister(email, password, nome);
      setMensagem('Cadastro realizado com sucesso!');
      setNome('');
      setEmail('');
      setPassword('');
    } catch (error) {
      setMensagem('Erro ao cadastrar. Tente novamente.');
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
          <h2 style={{ marginBottom: '20px' }}>Cadastro</h2>

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
              <label htmlFor="password" style={{ display: 'block', marginBottom: '8px' }}>Senha</label>
              <TextField
                type={showPassword ? 'text' : 'password'}
                id="password"
                name="password"
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

            <div style={{ marginBottom: '20px' }}>
              <label htmlFor="nome" style={{ display: 'block', marginBottom: '8px' }}>Nome</label>
              <input
                type="text"
                id="nome"
                name="nome"
                placeholder="Digite seu nome"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
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
                Cadastrar
              </button>
            </div>
          </form>

          {mensagem && <p style={{ marginTop: '20px', color: mensagem.includes('Erro') ? 'red' : 'green' }}>{mensagem}</p>}

          <div style={{ marginTop: '20px' }}>
            <a href="/login" style={{ color: '#007BFF', textDecoration: 'none' }}>Já possui uma conta? Faça login</a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cadastro;
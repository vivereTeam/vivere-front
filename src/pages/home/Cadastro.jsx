
function Cadastro() {
  return (
    <div>

      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh', // Usando minHeight para melhor comportamento em telas pequenas
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
          <h2 style={{ marginBottom: '20px' }}>Cadastro</h2> {/* Corrigido o título para Cadastro */}

          <form>
            <div style={{ marginBottom: '20px' }}>
              <label htmlFor="usuario" style={{ display: 'block', marginBottom: '8px' }}>Usuário</label>
              <input
                type="text"
                id="usuario"
                name="usuario"
                placeholder="Digite seu nome de usuário"
                style={{
                  width: '100%',
                  padding: '12px',
                  fontSize: '16px',
                  borderRadius: '4px',
                  border: '1px solid #ccc',
                  boxSizing: 'border-box', // Garantir que o padding não altere o tamanho total
                }}
                required
              />
            </div>

            <div style={{ marginBottom: '20px' }}>
              <label htmlFor="email" style={{ display: 'block', marginBottom: '8px' }}>Email</label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Digite seu email"
                style={{
                  width: '100%',
                  padding: '12px',
                  fontSize: '16px',
                  borderRadius: '4px',
                  border: '1px solid #ccc',
                  boxSizing: 'border-box', // Garantir que o padding não altere o tamanho total
                }}
                required
              />
            </div>

            <div style={{ marginBottom: '20px' }}>
              <label htmlFor="senha" style={{ display: 'block', marginBottom: '8px' }}>Senha</label>
              <input
                type="password"
                id="senha"
                name="senha"
                placeholder="Digite sua senha"
                style={{
                  width: '100%',
                  padding: '12px',
                  fontSize: '16px',
                  borderRadius: '4px',
                  border: '1px solid #ccc',
                  boxSizing: 'border-box', // Garantir que o padding não altere o tamanho total
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

          <div style={{ marginTop: '20px' }}>
            <a href="/login" style={{ color: '#007BFF', textDecoration: 'none' }}>Já possui uma conta? Faça login</a> {/* Corrigido o link para login */}
          </div>
        </div>
      </div>

    </div>
  );
}

export default Cadastro;

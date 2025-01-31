// src/components/Footer.jsx
import { 
  Box, 
  Container, 
  Grid2, 
  Typography, 
  Link, 
  IconButton, 
  TextField, 
  Button 
} from "@mui/material";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import CloseIcon from "@mui/icons-material/Close";

const Footer = () => {
  return (
    <Box sx={{ backgroundColor: "#270c6b", color: "#FFFFFF", padding: "40px 0" }}>
      <Container maxWidth="lg">
        <Grid2 container spacing={4}>
          {/* Logo */}
          <Grid2 item xs={12} sm={6} md={3}>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
              <path d="M20 0L24.4903 15.5097L40 20L24.4903 24.4903L20 40L15.5097 24.4903L0 20L15.5097 15.5097L20 0Z" fill="#FFFA00"/>
              <circle cx="20" cy="20" r="6" fill="#270C6B"/>
            </svg>

            {/* Texto estilizado */}
            <span style={{ 
              fontFamily: "'Montserrat', sans-serif",
              fontWeight: 700,
              fontSize: '1.5rem',
              color: '#fffa00',
              letterSpacing: '-0.5px'
            }}>
              VIVERE
              <span style={{ color: '#270c6b', marginLeft: '4px' }}>+</span>
            </span>
            </Box>
          </Grid2>
          
          {/* Links Rápidos */}
          <Grid2 item xs={12} sm={6} md={3}>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: "bold" }}>
              Links Rápidos
            </Typography>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
              <Link href="/sobre" color="#fffa00" underline="hover">Sobre</Link>
              <Link href="/trabalhe-conosco" color="#fffa00" underline="hover">Trabalhe Conosco</Link>
              <Link href="/ajuda" color="#fffa00" underline="hover">Ajuda</Link>
              <Link href="/termos-de-uso" color="#fffa00" underline="hover">Termos de Uso</Link>
            </Box>
          </Grid2>
          
          {/* Redes Sociais */}
          <Grid2 item xs={12} sm={6} md={3}>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: "bold" }}>
              Redes Sociais
            </Typography>
            <Box sx={{ display: "flex", gap: 1 }}>
              <IconButton 
                color="inherit" 
                href="https://facebook.com" 
                aria-label="Facebook"
                target="_blank"
                rel="noopener noreferrer"
                sx={{ color: "#fffa00" }}
              >
                <FacebookIcon />
              </IconButton>
              <IconButton 
                color="inherit" 
                href="https://instagram.com" 
                aria-label="Instagram"
                target="_blank"
                rel="noopener noreferrer"
                sx={{ color: "#fffa00" }}
              >
                <InstagramIcon />
              </IconButton>
              <IconButton 
                color="inherit" 
                href="https://x.com/" 
                aria-label="X (antigo Twitter)"
                target="_blank"
                rel="noopener noreferrer"
                sx={{ color: "#fffa00" }}
              >
                <CloseIcon /> {/* Você mencionou o uso do CloseIcon anteriormente */}
              </IconButton>
            </Box>
          </Grid2>

          {/* Newsletter */}
          <Grid2 item xs={12} sm={6} md={3}>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: "bold", color: "#fffa00" }}>
              Newsletter
            </Typography>
            <Typography variant="body2" sx={{ mb: 2, color: "#CCCCCC" }}>
              Inscreva-se para receber as últimas novidades e atualizações.
            </Typography>
            <Box component="form" noValidate autoComplete="off">
              <TextField 
                variant="filled"
                size="small"
                placeholder="Seu email"
                sx={{ 
                  backgroundColor: "#FFFFFF", 
                  borderRadius: 1, 
                  width: "100%", 
                  mb: 1 
                }}
              />
              <Button 
                variant="contained" 
                sx={{ 
                  backgroundColor: "#fffa00", 
                  color: "#270c6b", 
                  width: "100%", 
                  borderRadius: "4px",
                  textTransform: "none",
                  "&:hover": { 
                    backgroundColor: "#e6e600" 
                  } 
                }}
              >
                Inscrever-se
              </Button>
            </Box>
          </Grid2>
        </Grid2>

        {/* Linha de Separação */}
        <Box sx={{ borderTop: "1px solid rgba(255, 255, 255, 0.3)", mt: 4, pt: 2 }}>
          <Typography variant="body2" align="center" sx={{ color: "#CCCCCC" }}>
            © 2025 Vivere. Curso FullStack Atlântico. Capacita Brasil.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
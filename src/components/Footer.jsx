// src/components/Footer.jsx
import { 
  Box, 
  Container, 
  Grid, 
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
        <Grid container spacing={4}>
          {/* Logo */}
          <Grid item xs={12} sm={6} md={3}>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <img 
                src="path-to-your-logo.png" // Substitua pela URL real do seu logo
                alt="Logo" 
                style={{ width: "120px" }} 
              />
            </Box>
          </Grid>
          
          {/* Links Rápidos */}
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: "bold" }}>
              Links Rápidos
            </Typography>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
              <Link href="/sobre" color="#fffa00" underline="hover">Sobre</Link>
              <Link href="/trabalhe-conosco" color="#fffa00" underline="hover">Trabalhe Conosco</Link>
              <Link href="/ajuda" color="#fffa00" underline="hover">Ajuda</Link>
              <Link href="/termos-de-uso" color="#fffa00" underline="hover">Termos de Uso</Link>
            </Box>
          </Grid>
          
          {/* Redes Sociais */}
          <Grid item xs={12} sm={6} md={3}>
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
          </Grid>

          {/* Newsletter */}
          <Grid item xs={12} sm={6} md={3}>
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
          </Grid>
        </Grid>

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
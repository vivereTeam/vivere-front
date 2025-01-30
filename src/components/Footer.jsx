import { Box, Container, Grid, Typography, Link, IconButton } from "@mui/material";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import XIcon from "@mui/icons-material/Close";

const Footer = () => {
  return (
    <Box sx={{ backgroundColor: "#4c576c", color: "white", padding: "40px 0" }}>
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" component="div">
              <img src="path-to-your-logo.png" alt="Logo" style={{ width: "120px" }} />
            </Typography>
          </Grid>
          
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" gutterBottom>Links Rápidos</Typography>
            <Link href="#" color="inherit" display="block">Sobre</Link>
            <Link href="#" color="inherit" display="block">Trabalhe Conosco</Link>
            <Link href="#" color="inherit" display="block">Ajuda</Link>
            <Link href="#" color="inherit" display="block">Termos de Uso</Link>
          </Grid>
          
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" gutterBottom>Redes Sociais</Typography>
            <IconButton color="inherit" aria-label="Facebook" href="https://facebook.com">
              <FacebookIcon />
            </IconButton>
            <IconButton color="inherit" aria-label="Instagram" href="https://instagram.com">
              <InstagramIcon />
            </IconButton>
            <IconButton color="inherit" aria-label="Twitter" href="https://x.com/">
              <XIcon /> 
            </IconButton>
          </Grid>
        </Grid>

        <Box sx={{ textAlign: "center", marginTop: "20px" }}>
          <Typography variant="body2">© 2025 Vivere. Curso FullStack Atlântico. Capacita Brasil.</Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;

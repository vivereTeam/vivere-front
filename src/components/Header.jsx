import { AppBar, Toolbar, TextField, Box, Button, Link, IconButton } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useState } from "react";
// Importamos Link do React Router, mas damos outro nome para evitar conflito com MUI
import { Link as RouterLink } from "react-router-dom";

const Header = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = () => {
    if (searchQuery.trim() !== "") {
      console.log("Buscando por:", searchQuery);
      // Aqui você pode redirecionar para uma página de resultados ou chamar uma função de busca
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <AppBar position="sticky" sx={{ backgroundColor: "#270c6b", padding: "0 20px" }}>
      <Toolbar sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", height: "64px" }}>
        
        {/* LOGO */}
        <Box sx={{ display: "flex", alignItems: "center", marginRight: "20px" }}>
          <img 
            src=""  // coloque aqui a URL do seu logo
            alt="Logo" 
            style={{ height: "50px", width: "auto", borderRadius: "8px" }} 
          />
        </Box>

        {/* CAMPO DE BUSCA */}
        <Box sx={{ display: "flex", alignItems: "center", width: "35%", backgroundColor: "white", borderRadius: "4px" }}>
          <TextField
            label="Pesquisar experiências"
            variant="outlined"
            fullWidth
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            sx={{
              "& .MuiInputBase-root": {
                height: "42px",
                display: "flex",
                alignItems: "center",
                backgroundColor: "transparent",
              },
              "& .MuiInputLabel-root": {
                color: "rgba(0, 0, 0, 0.54)", 
              },
              "& .MuiInputLabel-shrink": {
                display: "none", 
              },
              "& .MuiOutlinedInput-root": {
                paddingTop: "0px",  
                paddingBottom: "0px",  
                border: "none",  
                backgroundColor: "transparent",
              },
              "& .MuiOutlinedInput-input": {
                paddingTop: "11px", 
              },
              "& .MuiOutlinedInput-notchedOutline": {
                border: "none",
              },
              "& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline": {
                border: "none",
              },
              "& .MuiOutlinedInput-root.Mui-focused": {
                backgroundColor: "transparent",
                boxShadow: "none",
              },
            }}
            InputProps={{
              disableUnderline: true,
            }}
          />
          <IconButton onClick={handleSearch} sx={{ color: "#270c6b", padding: "8px" }}>
            <SearchIcon />
          </IconButton>
        </Box>

        {/* LINKS/BOTOES À DIREITA */}
        <Box sx={{ display: "flex", gap: "20px", alignItems: "center" }}>
          {/* CRIE SUA EXPERIÊNCIA -> /create-event */}
          <Link
            component={RouterLink}
            to="/create-event"
            sx={{ 
              color: "white", 
              textDecoration: "none", 
              padding: "5px 10px", 
              borderRadius: "4px",
              transition: "background-color 0.3s ease, color 0.3s ease",
              "&:hover": {
                backgroundColor: "#fffa00", 
                color: "black",
              },
            }}
          >
            CRIE SUA EXPERIÊNCIA
          </Link>
          
          {/* ACESSE SUA CONTA - você decide para onde leva */}
          <Link
            href="#"
            sx={{ 
              color: "white", 
              textDecoration: "none", 
              padding: "5px 10px",
              borderRadius: "4px",
              transition: "background-color 0.3s ease, color 0.3s ease",
              "&:hover": {
                backgroundColor: "#fffa00",
                color: "black",
              },
            }}
          >
            ACESSE SUA CONTA
          </Link>

          {/* BOTÃO DE CADASTRO - apenas exemplo visual */}
          <Button variant="contained" sx={{ backgroundColor: "#fffa00", color: "black", borderRadius: "4px" }}>
            CADASTRE-SE
          </Button>
        </Box>

      </Toolbar>
    </AppBar>
  );
};

export default Header;

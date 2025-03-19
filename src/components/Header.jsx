import { AppBar, Toolbar, TextField, Box, Button, Link, IconButton } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useState } from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";

const Header = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = () => {
    if (searchQuery.trim() !== "") {
      console.log("Buscando por:", searchQuery);
      navigate(`/search?query=${encodeURIComponent(searchQuery.trim())}`);
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
        <Box 
          component={RouterLink} 
          to="/" 
          sx={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '8px', 
            textDecoration: 'none',
            transition: "transform 0.3s ease",
            ":hover": { transform: "scale(1.1)" },
          }}
        >
          {/* Ícone estilizado */}
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
              position: "absolute",
              top: "50%",
              left: "22px", // Alinha com o padding do input
              transform: "translateY(-50%)", // Centraliza verticalmente
              pointerEvents: "none", // Impede que o label interfira com cliques
            },
            "& .MuiInputLabel-shrink": {
              display: "none",
            },
            "& .MuiOutlinedInput-root": {
              paddingTop: "0px",  
              paddingBottom: "0px",  
              paddingLeft: "14px",
              border: "none",  
              backgroundColor: "transparent",
            },
            "& .MuiOutlinedInput-input": {
              paddingTop: "11px", 
              paddingBottom: "11px",
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
            notched: false,
          }}
        />
          <IconButton onClick={handleSearch} sx={{ color: "#270c6b", padding: "8px" }}>
            <SearchIcon />
          </IconButton>
        </Box>

        {/* LINKS/BOTÕES À DIREITA */}
        <Box sx={{ display: "flex", gap: "20px", alignItems: "center" }}>
          {/* CRIE SUA EXPERIÊNCIA */}
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
          
          {/* ACESSE SUA CONTA */}
          <Button
            component={RouterLink}
            to="/login"
            variant="contained"
            sx={{ 
              backgroundColor: "#fffa00", 
              color: "black", 
              borderRadius: "4px",
              "&:hover": {
                backgroundColor: "#e6e600",
              },
            }}
          >
            ACESSE SUA CONTA
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
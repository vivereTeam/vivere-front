import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import { ThemeProvider } from "@mui/material";
import theme from "./styles/theme.js";
import App from "./App.jsx";
import './styles/index.css';

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <Router> 
        <App />
      </Router>
    </ThemeProvider>
  </React.StrictMode>
);
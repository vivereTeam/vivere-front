import React from "react";
import { createRoot } from "react-dom/client";
import { ThemeProvider } from "@mui/material";
import theme from "./styles/theme.js";
import App from "./App.jsx";
import './styles/index.css'

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}> 
      <App />
    </ThemeProvider>
  </React.StrictMode>,
);
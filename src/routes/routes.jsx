// src/pages/home/AppRoutes.jsx
import React from "react";
import { Routes, Route } from "react-router-dom";

// IMPORTS DOS SEUS COMPONENTES/PÁGINAS
import Home from "../pages/home/Home"; // src/pages/home/Home.jsx
import CategoryPage from "../pages/home/CategoryPage"; // src/pages/home/CategoryPage.jsx
import CategoryListPage from "../pages/home/CategoryListPage"; // src/pages/home/CategoryListPage.jsx
import ExperienceCreationPage from "../pages/Experience/ExperienceCreationPage"; 
import ExperienceDetailsPage from "../pages/Experience/ExperienceDetailsPage";
import EditEventPage from "../pages/Experience/ExperienceEditPage";
import SearchResultsPage from "../pages/home/SearchResultsPage"; // Importando a página de busca

function AppRoutes({ allExperiences, addNewExperience, updateExperience, removeExperience }) {
  return (
    <Routes>
      {/* HOME */}
      <Route 
        path="/" 
        element={<Home allExperiences={allExperiences} removeExperience={removeExperience} />} 
      />

      {/* PÁGINA DE BUSCA */}
      <Route 
        path="/search" 
        element={<SearchResultsPage allExperiences={allExperiences} />} 
      />

      {/* CRIAÇÃO DE NOVO EVENTO */}
      <Route
        path="/create-event"
        element={<ExperienceCreationPage addNewExperience={addNewExperience} />}
      />

      {/* DETALHES DO EVENTO  */}
      <Route
        path="/event/:eventId"
        element={<ExperienceDetailsPage allExperiences={allExperiences} removeExperience={removeExperience} />}
      />

      {/* EDIÇÃO DE EVENTO */}
      <Route 
        path="/edit/:eventId" 
        element={<EditEventPage allExperiences={allExperiences} updateExperience={updateExperience} />} 
      />

      {/* ROTAS DE CATEGORIAS */}
      <Route path="/category-list">
        {/* index => /category-list */}
        <Route index element={<CategoryListPage />} />
        {/* rota aninhada => /category-list/:category */}
        <Route path=":category" element={<CategoryPage />} />
      </Route>
    </Routes>
  );
}

export default AppRoutes;
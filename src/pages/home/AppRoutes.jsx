// src/pages/home/AppRoutes.jsx
import React from "react";
import { Routes, Route } from "react-router-dom";

// IMPORTS DOS SEUS COMPONENTES/PÁGINAS
import Home from "./Home";                            // src/pages/home/Home.jsx
import CategoryPage from "./CategoryPage";            // src/pages/home/CategoryPage.jsx
import CategoryListPage from "./CategoryListPage";    // src/pages/home/CategoryListPage.jsx
import ExperienceCreationPage from "../Experience/ExperienceCreationPage"; 
import ExperienceDetailsPage from "../Experience/ExperienceDetailsPage";
import EditEventPage from "../Experience/ExperienceEditPage";

function AppRoutes({ allExperiences, addNewExperience, updateExperience }) {
  return (
    <Routes>
      {/* HOME */}
      <Route 
        path="/" 
        element={<Home allExperiences={allExperiences} />} 
      />

      {/* CRIAÇÃO DE NOVO EVENTO */}
      <Route
        path="/create-event"
        element={<ExperienceCreationPage addNewExperience={addNewExperience} />}
      />

      {/* DETALHES DO EVENTO  */}
      <Route
        path="/event/:eventId"
        element={<ExperienceDetailsPage allExperiences={allExperiences} />}
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

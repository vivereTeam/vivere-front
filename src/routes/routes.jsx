import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "../pages/home/Home";
import CategoryPage from "../pages/home/CategoryPage";
import CategoryListPage from "../pages/home/CategoryListPage";
import ExperienceCreationPage from "../pages/Experience/ExperienceCreationPage";
import ExperienceDetailsPage from "../pages/Experience/ExperienceDetailsPage";
import EditEventPage from "../pages/Experience/ExperienceEditPage";
import SearchResultsPage from "../pages/home/SearchResultsPage";
import Login from "../pages/home/Login";
import Cadastro from "../pages/home/Cadastro";

function AppRoutes({ allExperiences, addNewExperience, updateExperience, removeExperience }) {
  return (
    <Routes>
      <Route 
        path="/" 
        element={<Home allExperiences={allExperiences} removeExperience={removeExperience} />} 
      />

      <Route 
        path="/search" 
        element={<SearchResultsPage allExperiences={allExperiences} />} 
      />

      <Route
        path="/create-event"
        element={<ExperienceCreationPage addNewExperience={addNewExperience} />}
      />

      <Route
        path="/event/:eventId"
        element={<ExperienceDetailsPage allExperiences={allExperiences} />}
      />

      <Route 
        path="/edit/:eventId" 
        element={<EditEventPage allExperiences={allExperiences} updateExperience={updateExperience} />} 
      />

      <Route path="/category-list">
        <Route index element={<CategoryListPage />} />
        <Route path=":category" element={<CategoryPage />} />
      </Route>

      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Cadastro />} />
    </Routes>
  );
}

export default AppRoutes;
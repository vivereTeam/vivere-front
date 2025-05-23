import { Routes, Route } from "react-router-dom";
import Home from "../pages/home/Home";
import CategoryPage from "../pages/home/CategoryPage";
import CategoryListPage from "../pages/home/CategoryListPage";
import ExperienceCreationPage from "../pages/experience/ExperienceCreationPage";
import ExperienceDetailsPage from "../pages/experience/ExperienceDetailsPage";
import EditEventPage from "../pages/experience/ExperienceEditPage";
import SearchResultsPage from "../pages/home/SearchResultsPage";
import Login from "../pages/auth/Login";
import SignUp from "../pages/auth/SignUp";
import ResetPassword from "../pages/auth/ResetPassword";
import CartPage from "../pages/cart/CartPage"

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

      <Route path="/category-list" element={<CategoryListPage />} />
      <Route path="/category/:category" element={<CategoryPage allExperiences={allExperiences} />} />

      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<SignUp />} />
      <Route path="/reset-password" element={<ResetPassword />} />

      <Route path="/cart" element={<CartPage />} />
    </Routes>
  );
}

export default AppRoutes;
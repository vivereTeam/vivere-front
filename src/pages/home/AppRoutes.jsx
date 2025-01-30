import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Home";
import CategoryPage from "./CategoryPage";
import CategoryListPage from "./CategoryListPage";
import ExperienceCreationPage from "./../Experience/ExperienceCreationPage";

function AppRoutes() {
    return (
        <Router>
            <Routes>
                {/* Página inicial */}
                <Route path="/" element={<Home />} />
                <Route path="/create-event" element={<ExperienceCreationPage />} />

                <Route path="/category-list">
                    {/* Categorias */}
                    <Route index element={<CategoryListPage />} />
                    <Route path=":category" element={<CategoryPage />} />
                </Route>

            </Routes>
        </Router>
    );
}

export default AppRoutes;

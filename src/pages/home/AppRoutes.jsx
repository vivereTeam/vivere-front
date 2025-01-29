import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./index";
import CategoryPage from "./CategoryPage";
import CategoryListPage from "./CategoryListPage";

function AppRoutes() {
    return (
        <Router>
            <Routes>
                {/* Página inicial */}
                <Route path="/" element={<Home />} />

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

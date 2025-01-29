import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CategoriaPage from "./CategoriaPage";
import Home from "./index";

function AppRoutes() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/PaginaInicial/:category" element={<CategoriaPage />} />
            </Routes>
        </Router>
    );
}

export default AppRoutes;
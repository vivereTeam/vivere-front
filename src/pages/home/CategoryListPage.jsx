import { BrowserRouter as Router, Routes, Route, useParams } from "react-router-dom";
import ExperienceCategory from "../../components/ExperienceCategory.jsx";
import { Typography } from "@mui/material";

function CategoryListPage() {
    // Rota temporária, remover depois
    const TemporaryRouter = () => {
        function CategoriaPage() {
            const { category } = useParams();
            return (
                <div style={{ padding: "20px" }}>
                    <h1>Detalhes da Categoria</h1>
                    <p>Você está visualizando: {category}</p>
                </div>
            );
        }

        return (
            <Router>
                <Routes>
                    <Route
                        path="/"
                        element={
                            // Começo do componente original
                            <> 
                                <Typography>
                                    <h1 style={{ marginBottom: "20px" }}>Categorias</h1>
                                </Typography>
                                <div
                                    style={{
                                        backgroundColor: "hsl(0, 0.00%, 91.40%)",
                                        display: "grid",
                                        gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
                                        gap: "20px",
                                        padding: "20px",
                                    }}
                                >
                                    <ExperienceCategory category="Workshops e Aulas" />
                                    <ExperienceCategory category="Shows e Entretenimento" />
                                    <ExperienceCategory category="Viagens e Turismo" />
                                    <ExperienceCategory category="Aventura e Adrenalina" />
                                    <ExperienceCategory category="Relaxamento e Bem-Estar" />
                                    <ExperienceCategory category="Gastronomia e Degustações" />
                                    <ExperienceCategory category="Infantil e Familiar" />
                                    <ExperienceCategory category="Experiências Personalizadas" />
                                </div>
                            </>
                            // Fim do componente original
                        }
                    />
                    <Route path="/PaginaInicial/:category" element={<CategoriaPage />} />
                </Routes>
            </Router>
        );
    };

    return <TemporaryRouter />;
}

export default CategoryListPage;

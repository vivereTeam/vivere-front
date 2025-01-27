import { BrowserRouter as Router, Routes, Route, useParams } from "react-router-dom";
import ExperienceCategory from "../../components/ExperienceCategory.jsx";

function CategoryListPage() {
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
            // Começo da Rota
            <Router>
                <Routes>
                    <Route
                        path="/"
                        element={
                            // Começo do componente original
                            <> 
                                <h1 style={{padding:"20px", fontFamily:"'Poppins', sans-serif" }}>Categorias</h1>

                                <div
                                    style={{
                                        backgroundColor: "hsl(0, 0.00%, 91.40%)",
                                        display: "grid",
                                        gridTemplateColumns: "repeat(3, 1fr)",
                                        justifyItems: "center",
                                        gap: "60px",
                                        padding: "20px",
                                        margin: 0,
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
            // Fim da Rota
        );
    };

    return <TemporaryRouter />;
}

export default CategoryListPage;
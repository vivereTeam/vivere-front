import ExperienceCategory from "../../components/ExperienceCategory.jsx";
import { Typography } from "@mui/material";

function CategoryListPage() {
    return (
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
    );
}

export default CategoryListPage;
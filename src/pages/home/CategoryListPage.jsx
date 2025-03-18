import ExperienceCategory from "../../components/CategoryIcon.jsx";

function CategoryListPage() {
    return (
        <>  
            <div style={{boxShadow: "0 8px 20px rgba(0, 0, 0, 0.2)",}}>
                <h1 style={{ padding: "20px", fontFamily: "'Poppins', sans-serif" }}>Lista de categorias</h1>
            </div>
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
    );
}

export default CategoryListPage;

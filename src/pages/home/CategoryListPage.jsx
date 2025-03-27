import ExperienceCategory from "../../components/CategoryIcon.jsx";

function CategoryListPage() {
    return (
        <div style={{ fontFamily: "'Poppins', sans-serif", overflow: "hidden" }}>
            <div style={{
                boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                background: "hsl(258, 79%, 23%)",
                color: "white",
                padding: "24px 20px",
            }}>
                <h1 style={{ 
                    margin: 0,
                    fontSize: "1.8rem",
                    fontWeight: 600,
                    textAlign: "center"
                }}>Lista de Categorias</h1>
            </div>
            
            <div style={{
                backgroundColor: "hsl(0, 0%, 96%)",
                display: "grid",
                gridTemplateColumns: "repeat(3, 1fr)",
                justifyItems: "center",
                gap: "48px",
                padding: "60px 20px",
                margin: 0,
                minHeight: "calc(90vh - 180px)"
            }}>
                <div style={{ transform: 'scale(1.4)' }}>
                    <ExperienceCategory category="Workshops e Aulas" />
                </div>
                <div style={{ transform: 'scale(1.4)' }}>
                    <ExperienceCategory category="Shows e Entretenimento" />
                </div>
                <div style={{ transform: 'scale(1.4)' }}>
                    <ExperienceCategory category="Viagens e Turismo" />
                </div>
                <div style={{ transform: 'scale(1.4)' }}>
                    <ExperienceCategory category="Aventura e Adrenalina" />
                </div>
                <div style={{ transform: 'scale(1.4)' }}>
                    <ExperienceCategory category="Relaxamento e Bem-Estar" />
                </div>
                <div style={{ transform: 'scale(1.4)' }}>
                    <ExperienceCategory category="Gastronomia e Degustações" />
                </div>
                <div style={{ transform: 'scale(1.4)' }}>
                    <ExperienceCategory category="Infantil e Familiar" />
                </div>
                <div style={{ transform: 'scale(1.4)' }}>
                    <ExperienceCategory category="Experiências Personalizadas" />
                </div>
            </div>
        </div>
    );
}

export default CategoryListPage;
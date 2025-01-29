import ExperienceCategory from "../../components/ExperienceCategory.jsx";

function Home() {
    return (
        <div
            style={{
                fontFamily: "'Poppins', sans-serif",
                display: "flex",
                flexDirection: "column",
                margin: "0 auto",
                maxWidth: "1200px",
                width: "100%",
                gap: "16px",
            }}
        >
            <div>
                <h1>Categorias</h1>
                <div
                    style={{
                        display: "flex",
                        flexWrap: "wrap",
                        gap: "16px",
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
            </div>
            <div><h1>Workshops e Aulas</h1></div>
            <div><h1>Shows e Entretenimento</h1></div>
            <div><h1>Viagens e Turismo</h1></div>
            <div><h1>Aventura e Adrenalina</h1></div>
            <div><h1>Relaxamento e Bem-Estar</h1></div>
            <div><h1>Gastronomia e Degustações</h1></div>
            <div><h1>Infantil e Familiar</h1></div>
            <div><h1>Experiências Personalizadas</h1></div>
        </div>
    );
}

export default Home;

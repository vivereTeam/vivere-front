import ExperienceCard from "./../../components/ExperienceCard.jsx"
import ExperienceCategory from "./../../components/ExperienceCategory.jsx"
import Header from "../../components/Header"
import Footer from "../../components/Footer"


function Home() {
    return (
        <div style={{fontFamily: "'Poppins', sans-serif"}}>
            <Header />
            <div>
                <h1>Categorias</h1>
            </div>


            <div>
                <h1>Workshops e Aulas</h1>
            </div>
            <div>
                <h1>Shows e Entretenimento</h1>
            </div>
            <div>
                <h1>Viagens e Turismo</h1>
            </div>
            <div>
                <h1>Aventura e Adrenalina</h1>
            </div>

            <div>
                <h1>Evento em Destaque</h1>
            </div>

            <div>
                <h1>Relaxamento e Bem-Estar</h1>
            </div>
            <div>
                <h1>Gastronomia e Degustações</h1>
            </div>
            <div>
                <h1>Infantil e Familiar</h1>
            </div>
            <div>
                <h1>Experiências Personalizadas</h1>
            </div>
            <Footer />
        </div>
    );
};

export default Home;
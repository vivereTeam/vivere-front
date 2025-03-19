import { useEffect, useState } from "react";
import AppRoutes from "./routes/routes";
import { getAllEventos } from "./services/api";
import Header from "./components/Header";
import Footer from "./components/Footer";

function App() {
  const [allExperiences, setAllExperiences] = useState({});

  useEffect(() => {
    const fetchExperiences = async () => {
      try {
        const eventos = await getAllEventos();
        const groupedByCategory = eventos.reduce((acc, evento) => {
          const { categoria } = evento;
          if (!acc[categoria]) acc[categoria] = [];
          acc[categoria].push(evento);
          return acc;
        }, {});
        setAllExperiences(groupedByCategory);
      } catch (error) {
        console.error("Erro ao buscar eventos:", error);
      }
    };
    fetchExperiences();
  }, []);

  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <Header />
      <div style={{ flex: 1 }}>
        <AppRoutes allExperiences={allExperiences} />
      </div>
      <Footer />
    </div>
  );
}

export default App;

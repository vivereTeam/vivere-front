import { useEffect, useState } from "react";
import AppRoutes from "./routes/routes";
import { getAllEventos } from "./services/api";

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

  return <AppRoutes allExperiences={allExperiences} />;
}

export default App;
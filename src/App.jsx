// App.jsx
import { useState, useEffect } from "react";
import AppRoutes from "./pages/home/AppRoutes";

function App() {
  // Guarda todas as experiências no estado local (por categoria).
  // Você pode iniciar com dados fixos ou vazio.
  const [allExperiences, setAllExperiences] = useState(() => {
    const saved = localStorage.getItem("allExperiences");
    if (saved) return JSON.parse(saved);

    // Exemplo: estado inicial com algumas categorias:
    return {
      "Shows e Entretenimento": [
        {
          id: 1,
          title: "Show do Coldplay",
          location: "São Paulo",
          date: "2025-06-10",
          imageUrl: "https://picsum.photos/id/500/450/450",
          details: "Um show inesquecível!",
        },
      ],
      "Viagens e Turismo": [
        {
          id: 2,
          title: "Pacote para Florianópolis",
          location: "Santa Catarina",
          date: "2025-01-10",
          imageUrl: "https://picsum.photos/id/501/450/450",
          details: "Praias incríveis!",
        },
      ],
    };
  });

  // Salva no localStorage sempre que o estado mudar
  useEffect(() => {
    localStorage.setItem("allExperiences", JSON.stringify(allExperiences));
  }, [allExperiences]);

  // Função que cria/insere nova experiência em uma categoria
  const addNewExperience = (category, newEvent) => {
    setAllExperiences((prev) => {
      const existingEvents = prev[category] || [];
      return {
        ...prev,
        [category]: [...existingEvents, newEvent],
      };
    });
  };

  return (
    <AppRoutes
      allExperiences={allExperiences}
      addNewExperience={addNewExperience}
    />
  );
}

export default App;

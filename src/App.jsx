// src/App.jsx
import React, { useState, useEffect } from "react";
import AppRoutes from "./routes/routes";
import Header from "./components/Header";

function App() {
  const [allExperiences, setAllExperiences] = useState(() => {
    const saved = localStorage.getItem("allExperiences");
    if (saved) return JSON.parse(saved);

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
      // Adicione outras categorias conforme necessário
    };
  });

  useEffect(() => {
    localStorage.setItem("allExperiences", JSON.stringify(allExperiences));
  }, [allExperiences]);

  // Função para adicionar uma nova experiência
  const addNewExperience = (category, newEvent) => {
    setAllExperiences((prev) => {
      const existingEvents = prev[category] || [];
      return {
        ...prev,
        [category]: [...existingEvents, newEvent],
      };
    });
  };

  // Função para atualizar uma experiência existente
  const updateExperience = (category, updatedExperience) => {
    setAllExperiences((prev) => ({
      ...prev,
      [category]: prev[category].map((exp) =>
        exp.id === updatedExperience.id ? updatedExperience : exp
      ),
    }));
  };

  // **Nova Função para Remover uma Experiência**
  const removeExperience = (category, id) => {
    setAllExperiences((prev) => ({
      ...prev,
      [category]: prev[category].filter((exp) => exp.id !== id),
    }));
  };

  return (
    <AppRoutes
      allExperiences={allExperiences}
      addNewExperience={addNewExperience}
      updateExperience={updateExperience}
      removeExperience={removeExperience} // Passa a função como prop
    />
  );
}

export default App;

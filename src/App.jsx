// src/App.jsx
import {useEffect, useState} from "react";
import AppRoutes from "./pages/home/AppRoutes";

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
    };
  });

  useEffect(() => {
    localStorage.setItem("allExperiences", JSON.stringify(allExperiences));
  }, [allExperiences]);

  const addNewExperience = (category, newEvent) => {
    setAllExperiences((prev) => {
      const existingEvents = prev[category] || [];
      return {
        ...prev,
        [category]: [...existingEvents, newEvent],
      };
    });
  };

  const updateExperience = (category, updatedExperience) => {
    setAllExperiences((prev) => ({
      ...prev,
      [category]: prev[category].map((exp) =>
        exp.id === updatedExperience.id ? updatedExperience : exp
      ),
    }));
  };

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
      removeExperience={removeExperience}
    />
  );
}

export default App;

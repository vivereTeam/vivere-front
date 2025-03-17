// src/App.jsx
import { useEffect, useState } from "react";
import axios from "axios";
import AppRoutes from "./pages/home/AppRoutes";

function App() {
  const [allExperiences, setAllExperiences] = useState({});

  useEffect(() => {
    axios.get("http://localhost:5000/experiences") // Aqui eu substituo pelo endpoint correto
      .then((response) => {
        setAllExperiences(response.data);
      })
      .catch((error) => console.error("Erro ao buscar experiências:", error));
  }, []);

  const addNewExperience = async (category, newEvent) => {
    try {
      const response = await axios.post("http://localhost:5000/experiences", newEvent);
      setAllExperiences((prev) => ({
        ...prev,
        [category]: [...(prev[category] || []), response.data],
      }));
    } catch (error) {
      console.error("Erro ao adicionar experiência:", error);
    }
  };

  const updateExperience = async (category, updatedExperience) => {
    try {
      await axios.put(`http://localhost:5000/experiences/${updatedExperience.id}`, updatedExperience);
      setAllExperiences((prev) => ({
        ...prev,
        [category]: prev[category].map((exp) =>
          exp.id === updatedExperience.id ? updatedExperience : exp
        ),
      }));
    } catch (error) {
      console.error("Erro ao atualizar experiência:", error);
    }
  };

  const removeExperience = async (category, id) => {
    try {
      await axios.delete(`http://localhost:5000/experiences/${id}`);
      setAllExperiences((prev) => ({
        ...prev,
        [category]: prev[category].filter((exp) => exp.id !== id),
      }));
    } catch (error) {
      console.error("Erro ao remover experiência:", error);
    }
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

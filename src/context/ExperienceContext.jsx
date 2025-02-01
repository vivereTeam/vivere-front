import  { createContext, useState } from "react";

export const ExperienceContext = createContext();

export const ExperienceProvider = ({ children }) => {
  const [experienceData, setExperienceData] = useState({
    "Workshops e Aulas": [],
    "Shows e Entretenimento": [],
    "Viagens e Turismo": [],
    "Aventura e Adrenalina": [],
    "Relaxamento e Bem-Estar": [],
    "Gastronomia e Degustações": [],
    "Infantil e Familiar": [],
    "Experiências Personalizadas": [],
    "Lista de Categorias": [],
    "Experiencia em Destaque": [],
  });

  const addExperience = (category, experience) => {
    setExperienceData((prevData) => ({
      ...prevData,
      [category]: [...prevData[category], experience],
    }));
  };

  const updateExperience = (category, updatedExperience) => {
    setExperienceData((prevData) => ({
      ...prevData,
      [category]: prevData[category].map((exp) =>
        exp.id === updatedExperience.id ? updatedExperience : exp
      ),
    }));
  };

  return (
    <ExperienceContext.Provider value={{ experienceData, addExperience, updateExperience }}>
      {children}
    </ExperienceContext.Provider>
  );
};
import {
    School,
    TheaterComedy,
    TravelExplore,
    FitnessCenter,
    Spa,
    Restaurant,
    ChildCare,
    Star,
    HelpOutline,
    ArrowForward
  } from '@mui/icons-material';

export const CATEGORIES = {
    frontendToBackend: {
      "Shows e Entretenimento": "SHOWS_ENTRETENIMENTO",
      "Workshops e Aulas": "WORKSHOPS_AULAS",
      "Viagens e Turismo": "VIAGENS_TURISMO",
      "Aventura e Adrenalina": "AVENTURA_ADRENALINA",
      "Relaxamento e Bem-Estar": "RELAXAMENTO_BEM_ESTAR",
      "Gastronomia e Degustações": "GASTRONOMIA_DEGUSTACOES",
      "Infantil e Familiar": "INFANTIL_FAMILIAR",
      "Experiências Personalizadas": "EXPERIENCIAS_PERSONALIZADAS"
    },
  
    backendToFrontend: {
      "SHOWS_ENTRETENIMENTO": "Shows e Entretenimento",
      "WORKSHOPS_AULAS": "Workshops e Aulas",
      "VIAGENS_TURISMO": "Viagens e Turismo",
      "AVENTURA_ADRENALINA": "Aventura e Adrenalina",
      "RELAXAMENTO_BEM_ESTAR": "Relaxamento e Bem-Estar",
      "GASTRONOMIA_DEGUSTACOES": "Gastronomia e Degustações",
      "INFANTIL_FAMILIAR": "Infantil e Familiar",
      "EXPERIENCIAS_PERSONALIZADAS": "Experiências Personalizadas"
    },
  
    icons: {
        "Shows e Entretenimento": TheaterComedy,
        "Workshops e Aulas": School,
        "Viagens e Turismo": TravelExplore,
        "Aventura e Adrenalina": FitnessCenter,
        "Relaxamento e Bem-Estar": Spa,
        "Gastronomia e Degustações": Restaurant,
        "Infantil e Familiar": ChildCare,
        "Experiências Personalizadas": Star,
        "Lista de Categorias": ArrowForward,
        "Default": HelpOutline
      }
    };
  
  export const getCategoryBackendValue = (frontendLabel) => {
    return CATEGORIES.frontendToBackend[frontendLabel] || '';
  };
  
  export const getCategoryFrontendLabel = (backendValue) => {
    return CATEGORIES.backendToFrontend[backendValue] || '';
  };
  
  export const getCategoryIcon = (categoryName) => {
    return CATEGORIES.icons[categoryName] || CATEGORIES.icons.Default;
  };
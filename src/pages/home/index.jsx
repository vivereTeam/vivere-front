import ExperienceCategory from "../../components/ExperienceCategory.jsx";
import ExperienceCard from "../../components/ExperienceCard.jsx";
import LargeExperienceCard from "../../components/LargeExperienceCard.jsx";
import { Box } from "@mui/material";
import experienceData from "./ExperienceData.js";

function Home() {
  return (
    <Box
      sx={{
        fontFamily: "'Poppins', sans-serif",
        fontSize: "14px",
        display: "flex",
        flexDirection: "column",
        margin: "0 auto",
        maxWidth: "1400px",
        width: "100%",
        gap: "30px",
        "& h1": {
          marginBottom: "16px",
        },
      }}
    >
      <div>
        <h1>Categorias</h1>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            justifyContent: "space-around",
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

      {Object.keys(experienceData).map((category) => (
        <div key={category}>
          <h1>{category}</h1>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "20px",
              justifyContent: "flex-start",
            }}
          >
            {experienceData[category].map((experience) => (
              category !== "Experiencia em Destaque" ? (
                <ExperienceCard
                key={experience.id}
                id={experience.id}
                imageUrl={experience.imageUrl}
                date={experience.date}
                title={experience.title}
                location={experience.location}
                details={experience.details}
              />
              ) : (
                <LargeExperienceCard
                key={experience.id}
                event={experience}
                />
              )
            ))}
          </div>
        </div>
      ))}
    </Box>
  );
}

export default Home;

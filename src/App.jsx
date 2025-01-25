import ExperienceCard from "./components/ExperienceCard";

function App() {
  const eventDetails = {
    imageUrl:
      "https://picsum.photos/id/427/1200/720",
    date: "SAB, 25 JAN · 12:00",
    title: "Encontro de Vinhos São Paulo - Janeiro",
    location: "Casa das Caldeiras - São Paulo, SP",
    details: "Ambiente vibrante · Bate-papo com especialistas",
  };

  return (
    <div style={{ display: "flex", justifyContent: "center", padding: "20px" }}>
      <ExperienceCard {...eventDetails} />
    </div>
  );
}

export default App;
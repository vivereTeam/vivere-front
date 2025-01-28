import ExperienceDetailsPage from "./pages/Experience/ExperienceDetailsPage";
import LargeExperienceCard from "./components/LargeExperienceCard";

const mockEvent = {
  imageUrl: "https://picsum.photos/id/500/1920/720",
  date: "25 de janeiro de 2025",
  title: "Workshop de Fotografia",
  location: "São Paulo, SP",
  description: "Aprenda técnicas incríveis de fotografia com profissionais renomados.",
};

function App() {
  return (
    <div>
      <LargeExperienceCard event={mockEvent} />
    </div>
  );
}

export default App;

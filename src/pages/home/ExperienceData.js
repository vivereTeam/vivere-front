import aventuraAdrenalina from "./assets/Aventura e Adrenalina.png";
import experienciasPersonalizadas from "./assets/Experiências Personalizadas.png";
import gastronomiaDegustacoes from "./assets/Gastronomia e Degustações.png";
import infantilFamiliar from "./assets/Infantil e Familiar.png";
import relaxamentoBemEstar from "./assets/Relaxamento e Bem-Estar.png";
import showsEntretenimento from "./assets/Shows e Entretenimento.png";
import viagensTurismo from "./assets/Viagens e Turismo.png";
import workshopsAulas from "./assets/Workshops e Aulas.png";

const experienceData = {
  "Workshops e Aulas": [
    {
      id: 1,
      imageUrl: workshopsAulas,
      date: "12 Mar 2025",
      title: "Workshop de Culinária",
      location: "São Paulo, SP",
      details: "Aprenda a cozinhar pratos incríveis com chefs renomados.",
    },
  ],
  "Shows e Entretenimento": [
    {
      id: 2,
      imageUrl: showsEntretenimento,
      date: "20 Abr 2025",
      title: "Show de Comédia Stand-up",
      location: "Rio de Janeiro, RJ",
      details: "Uma noite de risadas com os melhores comediantes.",
    },
  ],
  "Viagens e Turismo": [
    {
      id: 3,
      imageUrl: viagensTurismo,
      date: "15 Mai 2025",
      title: "Tour Gastronômico",
      location: "Florianópolis, SC",
      details: "Explore os melhores restaurantes da cidade.",
    },
  ],
  "Aventura e Adrenalina": [
    {
      id: 4,
      imageUrl: aventuraAdrenalina,
      date: "10 Jun 2025",
      title: "Aventura de Rafting",
      location: "Foz do Iguaçu, PR",
      details: "Uma experiência única em rafting nas cataratas.",
    },
  ],
  "Experiencia em Destaque": [
    {
      id: 10,
      imageUrl:
        "https://hotelmt.com.br/wp-content/uploads/2018/11/258705-confira-5-dicas-para-organizar-um-evento-beneficente.jpg",
      date: "1 Jul 2025",
      title: "Retiro de Yoga",
      location: "Paraty, RJ",
      details: "Uma experiência de relaxamento profunda e meditação.",
    },
  ],
  "Relaxamento e Bem-Estar": [
    {
      id: 5,
      imageUrl: relaxamentoBemEstar,
      date: "1 Jul 2025",
      title: "Retiro de Yoga",
      location: "Paraty, RJ",
      details: "Uma experiência de relaxamento profunda e meditação.",
    },
  ],
  "Gastronomia e Degustações": [
    {
      id: 6,
      imageUrl: gastronomiaDegustacoes,
      date: "5 Ago 2025",
      title: "Degustação de Vinhos",
      location: "Bento Gonçalves, RS",
      details: "Explore vinhos locais e aprenda sobre harmonização.",
    },
  ],
  "Infantil e Familiar": [
    {
      id: 7,
      imageUrl: infantilFamiliar,
      date: "25 Set 2025",
      title: "Passeio ao Zoológico",
      location: "Curitiba, PR",
      details: "Diversão para toda a família com visita guiada ao zoológico.",
    },
  ],
  "Experiências Personalizadas": [
    {
      id: 8,
      imageUrl: experienciasPersonalizadas,
      date: "30 Out 2025",
      title: "Experiência Personalizada de Aventura",
      location: "Pantanal, MS",
      details: "Um pacote exclusivo para explorar o Pantanal com guia local.",
    },
  ],
};

export default experienceData;

import { useState } from "react";
import { Button, TextField, MenuItem, Select, FormControl, InputLabel } from "@mui/material";
import axios from "axios";

const ticketTypes = [
  { label: "Ingresso", value: "INGRESSO" },
  { label: "VIP", value: "VIP" },
  { label: "Gratuito", value: "GRATUITO" }
];

const categorias = [
  { label: "Shows e Entretenimento", value: "SHOWS_ENTRETENIMENTO" },
  { label: "Workshops e Aulas", value: "WORKSHOPS_AULAS" },
  { label: "Viagens e Turismo", value: "VIAGENS_TURISMO" },
  { label: "Aventura e Adrenalina", value: "AVENTURA_ADRENALINA" },
  { label: "Relaxamento e Bem-Estar", value: "RELAXAMENTO_BEM_ESTAR" },
  { label: "Gastronomia e Degustações", value: "GASTRONOMIA_DEGUSTACOES" },
  { label: "Infantil e Familiar", value: "INFANTIL_FAMILIAR" },
  { label: "Experiências Personalizadas", value: "EXPERIENCIAS_PERSONALIZADAS" }
];

const cardSizes = [
  { label: "Normal", value: "NORMAL" },
  { label: "Grande", value: "LARGE" }
];

export default function ExperienceCreationPage() {
  const [form, setForm] = useState({
    titulo: "",
    descricao: "",
    endereco: "",
    dataInicio: "",
    dataTermino: "",
    imagemUrl: "",
    preco: "",
    ticketType: "INGRESSO",
    categoria: "SHOWS_ENTRETENIMENTO",
    cardSize: "NORMAL"
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/eventos", form);
      alert("Evento criado com sucesso!");
    } catch (error) {
      console.error("Erro ao criar evento", error);
      alert("Erro ao criar evento. Verifique os dados e tente novamente.");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <TextField label="Título" name="titulo" value={form.titulo} onChange={handleChange} fullWidth required />
      <TextField label="Descrição" name="descricao" value={form.descricao} onChange={handleChange} fullWidth required multiline rows={4} />
      <TextField label="Endereço" name="endereco" value={form.endereco} onChange={handleChange} fullWidth required />
      <TextField label="Data de Início" name="dataInicio" type="datetime-local" value={form.dataInicio} onChange={handleChange} fullWidth />
      <TextField label="Data de Término" name="dataTermino" type="datetime-local" value={form.dataTermino} onChange={handleChange} fullWidth />
      <TextField label="Imagem URL" name="imagemUrl" value={form.imagemUrl} onChange={handleChange} fullWidth />
      <TextField label="Preço" name="preco" type="number" value={form.preco} onChange={handleChange} fullWidth />
      
      <FormControl fullWidth>
        <InputLabel>Tipo de Ingresso</InputLabel>
        <Select name="ticketType" value={form.ticketType} onChange={handleChange}>
          {ticketTypes.map((option) => (
            <MenuItem key={option.value} value={option.value}>{option.label}</MenuItem>
          ))}
        </Select>
      </FormControl>
      
      <FormControl fullWidth>
        <InputLabel>Categoria</InputLabel>
        <Select name="categoria" value={form.categoria} onChange={handleChange}>
          {categorias.map((option) => (
            <MenuItem key={option.value} value={option.value}>{option.label}</MenuItem>
          ))}
        </Select>
      </FormControl>
      
      <FormControl fullWidth>
        <InputLabel>Tamanho do Card</InputLabel>
        <Select name="cardSize" value={form.cardSize} onChange={handleChange}>
          {cardSizes.map((option) => (
            <MenuItem key={option.value} value={option.value}>{option.label}</MenuItem>
          ))}
        </Select>
      </FormControl>
      
      <Button type="submit" variant="contained" color="primary">Criar Evento</Button>
    </form>
  );
}

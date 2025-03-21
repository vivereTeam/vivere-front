import express from 'express';
import { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = globalThis.process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, '../dist')));

app.get('/api/data', (req, res) => {
    res.json({ message: 'Dados da API' });
});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../dist', 'index.html'));
});

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
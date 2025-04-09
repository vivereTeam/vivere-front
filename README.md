# 🌟 Vivere+ Project

**Vivere+** é uma plataforma de eCommerce de experiências que conecta usuários a atividades únicas e enriquecedoras, como workshops, passeios culturais, aulas especializadas e muito mais. Este repositório contém o código-fonte e a documentação do projeto, desenvolvido com React.js e Material UI.

---

## 🚀 Funcionalidades Principais

### **Sistema Completo de Marketplace**
- **Perfil Admin**:
  - Gerenciamento completo de eventos
- **Perfil Cliente**:
  - Compra de tickets para eventos

### **Interface Principal**
- Renderização dinâmica de eventos
- Sistema de busca
- Filtros por categorias

### **Sistema de Login**
- Autenticação segura com JWT
- Criação de conta com validação
- Recuperação de senha
- Controle de acesso por níveis (admin/cliente)

### **CRUD de Eventos (Admin)**
- **Criação**: Formulário completo com upload de imagens
- **Leitura**: Visualização detalhada com todas as informações
- **Atualização**: Edição dos campos do evento
- **Exclusão**: Remoção segura com confirmação
- Validação de dados em tempo real

### **Carrinho de Compras (Cliente)**
- Adição/remoção de tickets
- Cálculo automático de valores
- Processo de checkout

### **Sistema de Navegação**
- Rotas dinâmicas com react-router-dom
- Navegação intuitiva entre seções por meio do header

---

## 🛠️ Tecnologias Utilizadas

### **Frontend**
- **React.js 18** - Biblioteca principal para construção da UI
- **Material UI 6** - Componentes estilizados e sistema de design
- **React Router DOM 7** - Gerenciamento de rotas avançado
- **React Hook Form 7** - Manipulação de formulários com validação
- **Axios 1.8** - Cliente HTTP para integração com API
- **Yup 1.6** - Validação de schemas para formulários
- **React Slick 0.30** - Componente de carrossel responsivo

### **Autenticação**
- **JWT Decode 4.0** - Decodificação de tokens JWT
- **React Hook Form 7.54** - Integração com validação Yup

### **Build & Dev Tools**
- **Vite 6** - Bundler ultra-rápido
- **ESLint 9** - Linter com configuração padrão
- **Prettier 3** - Formatação de código automática
- **TypeScript** - Tipagem opcional via @types

### **Controle de Versão**
- **Git** - Versionamento do código
- **GitHub** - Hospedagem e colaboração
- **Conventional Commits** - Padronização de mensagens
- **Git Flow** - Estratégia de branches

### **Gestão de Equipe**
- **Quadro Kanban** - Organização visual de tarefas
- **Pair Programming** - Colaboração em features críticas
- **Code Reviews** - Revisões obrigatórias antes de merge
- **CI/CD** - Pipeline automatizado via GitHub Actions

---

## ⚙️ Backend do Projeto

O sistema possui uma API completa desenvolvida em Node.js com Express e PostgreSQL. Consulte o repositório do backend para documentação técnica completa:

🔗 [Repositório do Backend Vivere+](https://github.com/J0aoPaulo/vivere-backend)

**Principais recursos:**
- API RESTful com endpoints documentados (Swagger)
- Autenticação JWT segura com bcrypt
- Integração com banco de dados PostgreSQL via Prisma ORM
- Upload de imagens com Multer
- Sistema completo de pedidos e pagamentos
- Containerização com Docker
- Ambiente de desenvolvimento com Nodemon
- Suporte a testes com Jest e Supertest

---

## 📂 Estrutura do Projeto


```plaintext
└── vivereteam-vivere-front/
    ├── src/
        ├── App.jsx
        ├── main.jsx
        ├── components/
        │   ├── CardSlider.jsx
        │   ├── CartTicketItem.jsx
        │   ├── CategoryIcon.jsx
        │   ├── ExperienceCard.jsx
        │   ├── Footer.jsx
        │   ├── Header.jsx
        │   └── LargeExperienceCard.jsx
        ├── context/
        │   └── AuthContext.jsx
        ├── pages/
        │   ├── auth/
        │   │   ├── Login.jsx
        │   │   ├── ResetPassword.jsx
        │   │   └── SignUp.jsx
        │   ├── cart/
        │   │   └── CartPage.jsx
        │   ├── Experience/
        │   │   ├── ExperienceCreationPage.jsx
        │   │   ├── ExperienceDetailsPage.jsx
        │   │   └── ExperienceEditPage.jsx
        │   └── home/
        │       ├── CategoryListPage.jsx
        │       ├── CategoryPage.jsx
        │       ├── Home.jsx
        │       └── SearchResultsPage.jsx
        ├── routes/
        │   └── routes.jsx
        ├── services/
        │   └── api.js
        └── styles/
            ├── index.css
            └── theme.js
``` 

## 🔧 Instalação e Configuração

Siga os passos abaixo para configurar o projeto localmente:

### **Requisitos Prévios**
- Node.js (v16 ou superior)

### **Passos para Instalação**
1. **Clone o Repositório**:

   ```bash
   git clone https://github.com/J0aoPaulo/vivere.git
   cd vivere
2. **Instale as Dependências**
   ```bash
   npm install
3. **Execute o Projeto***:
   ```bash
   npm run dev
4. **Acesse no Navegador**
   ```bash
    http://localhost:3000.

## 🤝 Contribuição

1. Clone o projeto
2. Cria a branch da sua feature (`git checkout -b feature/AmazingFeature`)
3. Faça o commit das suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Realize o push para branch (`git push origin feature/AmazingFeature`)
5. Abra um pull request

## 🌐 Equipe de Desenvolvimento
<!-- readme: collaborators,contributors -start -->
<table>
	<tbody>
		<tr>
            <td align="center">
                <a href="https://github.com/J0aoPaulo">
                    <img src="https://avatars.githubusercontent.com/u/98539735?v=4" width="100;" alt="J0aoPaulo"/>
                    <br />
                    <sub><b>João Paulo Almeida</b></sub>
                </a>
            </td>
            <td align="center">
                <a href="https://github.com/Gabriel-Matias07">
                    <img src="https://avatars.githubusercontent.com/u/124216130?v=4" width="100;" alt="Gabriel-Matias07"/>
                    <br />
                    <sub><b>Gabriel Matias</b></sub>
                </a>
            </td>
            <td align="center">
                <a href="https://github.com/davyson-vasconcelos">
                    <img src="https://avatars.githubusercontent.com/u/147925506?v=4" width="100;" alt="davyson-vasconcelos"/>
                    <br />
                    <sub><b>Davyson Vasconcelos</b></sub>
                </a>
            </td>
            <td align="center">
                <a href="https://github.com/DavidEricson00">
                    <img src="https://avatars.githubusercontent.com/u/169815129?v=4" width="100;" alt="DavidEricson00"/>
                    <br />
                    <sub><b>David Ericson</b></sub>
                </a>
            </td>
            <td align="center">
                <a href="https://github.com/GuilhermeMCarneiro">
                    <img src="https://avatars.githubusercontent.com/u/146294977?v=4" width="100;" alt="GuilhermeMCarneiro"/>
                    <br />
                    <sub><b>GuilhermeMCarneiro</b></sub>
                </a>
            </td>
		</tr>
	<tbody>
</table>
<!-- readme: collaborators,contributors -end -->

# Capacita Store

Capacita Store é um projeto de eCommerce de experiências que oferece uma plataforma para usuários explorarem, reservarem e adquirirem experiências únicas e personalizadas. O foco está em conectar pessoas a atividades enriquecedoras, como workshops, passeios culturais, aulas específicas e muito mais. Este repositório contém o código-fonte e a documentação do projeto.

## 🚀 Funcionalidades Principais

- **Gerenciamento de Produtos**:

  - Listagem de produtos com atributos como nome, descrição, preço, categoria e quantidade em estoque.
  - Inclusão, edição e remoção de produtos através de componentes específicos.
  - Exibição de produtos em uma visualização amigável usando cards e estilização com Material UI.

- **Sistema de Navegação**:

  - Uso do `react-router-dom` para criar rotas distintas para as páginas principais da aplicação.
  - Pelo menos uma rota configurada para receber parâmetros dinâmicos.

- **Responsividade**:

  - Interface responsiva testada em diferentes dispositivos e tamanhos de tela (smartphones, tablets e desktops).
  - Testes de responsividade realizados utilizando o DevTools do Google Chrome.

- **Documentação de Equipe e Processos**:
  - Gerenciamento do progresso e tarefas utilizando um quadro Kanban.
  - Divisão de atividades igualitária entre os membros da equipe, documentada no repositório.

---

## 📊 Tecnologias Utilizadas

- **Frontend**:

  - React.js
  - Material UI (https://mui.com/material-ui)
  - React Router DOM para gerenciamento de rotas

- **Controle de Versão**:
  - Git e GitHub

---

## 🔧 Instalação e Configuração

Siga as instruções abaixo para configurar o projeto localmente:

### Requisitos Prévios

- Node.js (v16 ou superior)

### Passos para Instalação

1. **Clone o Repositório**:

   ```bash
   git clone https://github.com/J0aoPaulo/capacita-store.git
   cd capacita-store
   ```

2. **Instale as Dependências**:

   ```bash
   npm install
   ```

3. **Inicie o Projeto**:

   ```bash
   npm start
   ```

4. **Acesse no Navegador**:
   O frontend estará rodando em: `http://localhost:3000`

---

## 🛠️ Estrutura do Projeto

```plaintext
capacita-store/
├── src/            # Código-fonte principal
├── public/         # Arquivos estáticos
├── README.md       # Documentação do projeto
└── ...
```

---

## 🎨 Requisitos do Projeto

O objetivo do projeto é criar um aplicativo React para o gerenciamento de produtos de um site online. O sistema será a visualização do gerente ou administrador do sistema, permitindo as seguintes funcionalidades:

- **Listagem de Produtos**:

  - Deve exibir todos os produtos cadastrados com seus atributos principais, como nome, descrição, preço e quantidade em estoque.
  - Utilize uma tabela ou visualização em estilo de cards para melhorar a experiência do usuário.
  - Extra: estilize os cards utilizando Material UI.

- **Cadastro de Produtos**:

  - Deve permitir a inclusão de novos produtos com atributos obrigatórios e opcionais.
  - Atributos obrigatórios incluem nome, descrição, preço e categoria.

- **Edição de Produtos**:

  - Deve permitir a edição de produtos já cadastrados.
  - Exemplo de URL para edição: `http://www.meusite.com/produtos/:id`, onde `:id` é o identificador do produto.

- **Remoção de Produtos**:

  - Ao lado de cada produto, deve haver ícones para edição e remoção.

- **Responsividade**:

  - O sistema deve ser responsivo, ajustando-se bem a diferentes tamanhos de tela.
  - Utilize o DevTools do Google Chrome para testar o comportamento em smartphones, tablets e desktops.

- **Gerenciamento de Equipe**:

  - Utilize um quadro Kanban para documentar a divisão de tarefas e o progresso do projeto.
  - Todos os integrantes devem participar e realizar commits representativos no repositório GitHub.

- **Navegação**:
  - O aplicativo deve possuir pelo menos 3 rotas distintas, com pelo menos 1 delas recebendo parâmetros dinâmicos (ex.: ID do produto).

---

## 🎨 Contribuição

Contribuições são bem-vindas! Siga os passos abaixo:

1. Faça um fork do repositório.
2. Crie uma branch com sua feature/bugfix:
   ```bash
   git checkout -b minha-feature
   ```
3. Faça commit das suas alterações:
   ```bash
   git commit -m "Adicionei uma nova feature"
   ```
4. Envie para o repositório remoto:
   ```bash
   git push origin minha-feature
   ```
5. Abra um Pull Request.

---

## 🛡️ Licença

Este projeto está licenciado sob a [MIT License](LICENSE).

---

## 🔗 Links úteis

- [Repositório no GitHub](https://github.com/J0aoPaulo/capacita-store)
- [Material UI Documentation](https://mui.com/material-ui)

---

Se tiver dúvidas ou sugestões, entre em contato ou abra uma issue! 😊

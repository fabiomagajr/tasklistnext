# 💡 IdeaBook: Seu Caderno de Ideias Fullstack

![Next.js](https://img.shields.io/badge/Next-js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)

Bem-vindo ao **IdeaBook**! Este é um projeto de aprendizado focado em construir uma aplicação Fullstack completa e moderna, indo do zero ao deploy, com foco em boas práticas e nas tecnologias mais recentes do ecossistema Next.js.

## 🎯 O Projeto

O objetivo é construir uma aplicação CRUD (Create, Read, Update, Delete) escalável onde usuários possam registrar e gerenciar suas ideias. O foco principal é dominar os conceitos de desenvolvimento **Fullstack com Next.js (App Router)** e **MongoDB**.

## ✨ Funcionalidades

- [x] **Listar** ideias de um banco de dados.
- [x] **Adicionar** novas ideias através de um formulário.
- [ ] **Deletar** ideias existentes.
- [ ] **Editar** o conteúdo de uma ideia.
- [ ] Paginação para lidar com grandes volumes de dados.
- [ ] Autenticação de usuários (futuro).

## 🚀 Roteiro de Aprendizado

Este projeto é dividido em módulos progressivos para solidificar o conhecimento:

- [x] **Módulo 1: A Fundação**
  - [x] Setup do projeto com `create-next-app`
  - [x] Configuração do TypeScript e Tailwind CSS
  - [x] Limpeza e criação da página inicial (estática)

- [x] **Módulo 2: A Conexão (Read)**
  - [x] Instalação e configuração do MongoDB (Servidor Local)
  - [x] Criação do "Singleton" de conexão (`lib/mongodb.ts`)
  - [x] Uso de Variáveis de Ambiente (`.env.local`)
  - [x] Transformação da `HomePage` em um **Server Component** `async`
  - [x] Leitura (`find`) de dados do banco e exibição na tela (o "R" do CRUD)

- [x] **Módulo 3: A Criação (Create)**
  - [x] Conceito de Server vs. Client Components
  - [x] Criação de um **Client Component** (`AddIdeaForm.tsx`) para interatividade
  - [x] Criação de uma **Server Action** (`app/actions.ts`) para mutações no servidor
  - [x] Envio de dados do formulário para o banco (`insertOne`)
  - [x] Uso de `revalidatePath` para atualização automática da UI (o "C" do CRUD)

- [ ] **Módulo 4: A Deleção (Delete)**
  - [ ] Adicionar botão de exclusão
  - [ ] Criar Server Action para `deleteOne`
  - [ ] Passar o `_id` do documento para a action
  - [ ] Revalidar o cache da rota (o "D" do CRUD)

- [ ] **Módulo 5: A Edição (Update)**
  - [ ] Conceito de Rotas Dinâmicas (ex: `/idea/[id]/edit`)
  - [ ] Criar página de edição para carregar uma ideia específica
  - [ ] Criar Server Action para `updateOne`
  - [ ] Redirecionamento (`redirect`) após a edição (o "U" do CRUD)

- [ ] **Módulo 6: Tópicos Avançados**
  - [ ] Implementar Paginação (Pagination)
  - [ ] Adicionar autenticação (ex: NextAuth.js)
  - [ ] Fazer o Deploy da aplicação (ex: Vercel)

## 🛠️ Tecnologias Utilizadas

| Tecnologia | Propósito |
| :--- | :--- |
| **Next.js (App Router)** | Framework React Fullstack (Server Components, Routing) |
| **React** | Biblioteca de UI (Client Components, Hooks) |
| **TypeScript** | Superset do JavaScript que adiciona tipagem estática. |
| **MongoDB** | Banco de Dados NoSQL para armazenar as ideias. |
| **Driver `mongodb`** | Pacote NPM oficial para conectar Node.js ao MongoDB. |
| **Server Actions** | "API Embutida" do Next.js para mutações no backend sem `fetch`. |
| **Tailwind CSS** | Framework CSS utility-first para estilização rápida. |

## 🏁 Como Rodar o Projeto Localmente

Siga os passos abaixo para executar o IdeaBook no seu ambiente de desenvolvimento.

### 1. Pré-requisitos

- [Node.js](https://nodejs.org/) (v18 ou superior)
- [MongoDB Server](https://www.mongodb.com/try/download/community) (Instalado e rodando localmente)
- [MongoDB Compass](https://www.mongodb.com/products/compass) (Opcional, mas recomendado para visualizar o banco)

### 2. Clone o Repositório

(Você pode pular esta etapa, pois já temos o projeto)
```bash
git clone [https://github.com/fabiomagajr/tasklistnext.git](https://github.com/fabiomagajr/tasklistnext.git)
cd ideabook
```

### 3. Instale as Dependências

Este comando irá instalar o Next.js, React, MongoDB driver e outras bibliotecas.
```bash
npm install
```

### 4. Configure o Banco de Dados (Local)

1.  Certifique-se que seu servidor MongoDB local está rodando.
    ```bash
    # Verifique o status (no Ubuntu)
    sudo systemctl status mongodb
    
    # Se não estiver rodando, inicie-o
    sudo systemctl start mongodb
    ```
2.  (Opcional) Use o MongoDB Compass para criar manualmente o banco `ideabook` e a coleção `ideas`. O script também fará isso na primeira conexão, mas é bom para visualizar.

### 5. Crie as Variáveis de Ambiente

Crie um arquivo chamado `.env.local` na raiz do projeto e adicione a string de conexão do seu banco local.

```.env.local
# String de conexão para o MongoDB rodando localmente na porta padrão
MONGODB_URI=mongodb://127.0.0.1:2017/
```

### 6. Rode o Servidor de Desenvolvimento

Este comando iniciará a aplicação.
```bash
npm run dev
```

Abra [http://localhost:3000](http://localhost:3000) no seu navegador para ver o projeto funcionando!

## 📂 Estrutura de Pastas (Simplificada)

```
ideabook/
├── app/
│   ├── components/
│   │   └── AddIdeaForm.tsx  # (Client Component) Formulário de adição
│   ├── actions.ts           # (Server-side) Nossas Server Actions (a "API")
│   ├── layout.tsx           # Layout principal (HTML, BODY)
│   └── page.tsx             # Página inicial (Server Component que lê do banco)
├── lib/
│   └── mongodb.ts           # Lógica de conexão com o MongoDB (Singleton)
├── .env.local               # Arquivo SECRETO com a string de conexão
├── next.config.mjs          # Configurações do Next.js
└── package.json             # Dependências e scripts do projeto
```

# SystemDrawn API

API para sistema de agendamento de tatuagens e piercings.

---

## 🚀 Tecnologias

- Node.js
- Express
- PostgreSQL (NeonDB)
- JWT (autenticação)
- Argon2 (hash de senha)

---

## 📁 Instalação

### 1. Entrar na pasta do backend

```bash
cd backend
```

### 2. Instalar dependências

```bash
npm install
```

### 3. Criar arquivo `.env`

Crie um arquivo `.env` na raiz do backend:

```env
DATABASE_URL=sua_url_do_neon
```

---

## ▶️ Executar o projeto

```bash
npm run dev
```

Servidor rodará em:

```
http://localhost:3000
```

---

## 📌 Principais rotas

### Usuários

| Método | Rota | Descrição |
|--------|------|-----------|
| `GET` | `/usuarios/:cpf` | Buscar usuário por CPF |
| `POST` | `/usuarios` | Criar novo usuário |

### Agendamentos

| Método | Rota | Descrição |
|--------|------|-----------|
| `GET` | `/agendamentos/usuario/:cpf` | Listar agendamentos do usuário |
| `POST` | `/agendamentos` | Criar agendamento |
| `PUT` | `/agendamentos/:id` | Atualizar agendamento |
| `DELETE` | `/agendamentos/:id` | Deletar agendamento |

---

- Não subir o arquivo `.env` para o GitHub
- Banco de dados utilizado: Neon PostgreSQL

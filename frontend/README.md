# SystemDrawn Frontend

Interface web para sistema de agendamento de tatuagens e piercings.

---

## 🚀 Tecnologias

- React
- Vite
- Axios
- React Router DOM

---

## 📁 Instalação

### 1. Entrar na pasta do frontend

```bash
cd frontend
```

### 2. Instalar dependências

```bash
npm install
```

---

## ▶️ Executar projeto

```bash
npm run dev
```

A aplicação rodará em:

```
http://localhost:5173
```

---

## 🔗 Configuração da API

Arquivo: `src/services/api.js`

```js
import axios from "axios";

export const api = axios.create({
  baseURL: "http://localhost:3000"
});
```

---

## 🔐 Fluxo da aplicação

1. Usuário digita o CPF
2. Sistema verifica se o cadastro existe:
   - **Se existir** → login automático
   - **Se não existir** → cadastro rápido
3. Usuário acessa o dashboard
4. Pode criar, editar e excluir agendamentos

---

## 📌 Páginas

| Rota | Descrição |
|------|-----------|
| `/` | Login |
| `/dashboard` | Lista de agendamentos |
| `/novo-agendamento` | Criar agendamento |
| `/editar-agendamento/:id` | Editar agendamento |

---

## 🛑 Observações

- O backend deve estar rodando em `localhost:3000`
- Não esquecer de configurar o CORS no backend

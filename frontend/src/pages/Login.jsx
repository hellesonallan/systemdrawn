import { useState } from "react";
import { api } from "../services/api";
import Navbar from "../components/Navbar";

function Login() {
  const [cpf, setCpf] = useState("");
  const [nome, setNome] = useState("");
  const [novoUsuario, setNovoUsuario] = useState(false);

  async function entrar() {
    try {
      const response = await api.get(`/usuarios/${cpf}`);
      localStorage.setItem("usuario", JSON.stringify(response.data));
      window.location.href = "/dashboard";
    } catch (error) {
      if (error.response?.status === 404) {
        setNovoUsuario(true);
      } else {
        alert("Erro ao acessar sistema");
      }
    }
  }

  async function cadastrar() {
    try {
      const response = await api.post("/usuarios", { cpf, nome });
      localStorage.setItem("usuario", JSON.stringify(response.data));
      window.location.href = "/dashboard";
    } catch (error) {
      console.error(error);
      alert("Erro ao cadastrar usuário");
    }
  }

  return (
    <>
      <Navbar />
      <div className="login-page">
        <div className="login-card">
          <h1 className="login-brand">
            System<span>Drawn</span>
          </h1>
          <p className="login-subtitle">Acesse sua conta para continuar</p>

          <label className="login-label">CPF</label>
          <input
            className="login-input"
            placeholder="000.000.000-00"
            value={cpf}
            onChange={(e) => setCpf(e.target.value)}
          />

          {!novoUsuario ? (
            <button className="login-button" onClick={entrar}>
              Entrar
            </button>
          ) : (
            <>
              <p className="login-register-text">
                CPF não encontrado. Complete seu cadastro:
              </p>
              <label className="login-label">Nome Completo</label>
              <input
                className="login-input"
                placeholder="Digite seu nome"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
              />
              <button className="login-button" onClick={cadastrar}>
                Cadastrar e Entrar
              </button>
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default Login;

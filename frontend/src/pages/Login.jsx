import { useState } from "react";
import { api } from "../services/api";
import Navbar from "../components/Navbar/Navbar";
import heroImage from "../assets/hero-image.png";
import "./Login.css";

function Login() {
  const [cpf, setCpf] = useState("");
  const [nome, setNome] = useState("");
  const [novoUsuario, setNovoUsuario] = useState(false);

  function formatarCpf(valor) {
    return valor
      .replace(/\D/g, "")
      .slice(0, 11)
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d{1,2})$/, "$1-$2");
  }

  async function entrar() {
    try {
      const cpfLimpo = cpf.replace(/\D/g, "");
      const response = await api.get(`/usuarios/${cpfLimpo}`);
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
      const cpfLimpo = cpf.replace(/\D/g, "");
      const response = await api.post("/usuarios", { cpf: cpfLimpo, nome });
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
        <div className="login-content">
          <div className="login-hero">
            <h1 className="login-hero-title">
              Agende seu piercing ou <span>tatuagem</span> sem complicação
            </h1>
            <p className="login-hero-subtitle">
              SystemDrawn conecta você ao seu estúdio favorito. Escolha o
              horário e apareça só para fazer sua arte.
            </p>
          </div>

          <div className="login-card">
            <h2 className="login-card-title">Acesse sua conta</h2>

            <label className="login-label">CPF</label>
            <input
              className="login-input"
              placeholder="000.000.000-00"
              value={cpf}
              onChange={(e) => setCpf(formatarCpf(e.target.value))}
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

        <img
          src={heroImage}
          alt="Tatuagem e piercing"
          className="login-hero-image"
        />
      </div>
    </>
  );
}

export default Login;

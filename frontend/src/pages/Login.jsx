import { useState } from "react";
import { api } from "../services/api";

function Login() {
  const [cpf, setCpf] = useState("");
  const [nome, setNome] = useState("");
  const [novoUsuario, setNovoUsuario] =
    useState(false);

  async function entrar() {
    try {
      const response = await api.get(
        `/usuarios/${cpf}`
      );

      localStorage.setItem(
        "usuario",
        JSON.stringify(response.data)
      );

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
      const response = await api.post(
        "/usuarios",
        {
          cpf,
          nome
        }
      );

      localStorage.setItem(
        "usuario",
        JSON.stringify(response.data)
      );

      window.location.href = "/dashboard";
    } catch (error) {
      console.error(error);
      alert("Erro ao cadastrar usuário");
    }
  }

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h1 style={styles.brand}>
          System
          <span style={{ color: "#a855f7" }}>
            Drawn
          </span>
        </h1>

        <p style={styles.subtitle}>
          Acesse sua conta para continuar
        </p>

        <label style={styles.label}>
          CPF
        </label>

        <input
          style={styles.input}
          placeholder="000.000.000-00"
          value={cpf}
          onChange={(e) =>
            setCpf(e.target.value)
          }
        />

        {!novoUsuario ? (
          <button
            style={styles.button}
            onClick={entrar}
          >
            Entrar
          </button>
        ) : (
          <>
            <p
              style={{
                color: "#fff",
                marginTop: "20px",
                marginBottom: "10px",
              }}
            >
              CPF não encontrado.
              Complete seu cadastro:
            </p>

            <label style={styles.label}>
              Nome Completo
            </label>

            <input
              style={styles.input}
              placeholder="Digite seu nome"
              value={nome}
              onChange={(e) =>
                setNome(e.target.value)
              }
            />

            <button
              style={styles.button}
              onClick={cadastrar}
            >
              Cadastrar e Entrar
            </button>
          </>
        )}
      </div>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    background: "radial-gradient(circle at 20% 20%, #2a0a3d 0%, #0a0a0a 60%)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontFamily: "'Segoe UI', sans-serif",
    padding: "20px",
  },
  card: {
    background: "rgba(20, 20, 20, 0.85)",
    border: "1px solid #3b0764",
    borderRadius: "16px",
    padding: "40px",
    width: "100%",
    maxWidth: "400px",
    boxShadow: "0 20px 60px rgba(139, 92, 246, 0.25)",
    backdropFilter: "blur(10px)",
  },
  brand: {
    color: "#fff",
    fontSize: "32px",
    textAlign: "center",
    margin: "0 0 8px",
    letterSpacing: "1px",
  },
  subtitle: {
    color: "#a1a1aa",
    textAlign: "center",
    fontSize: "14px",
    marginBottom: "32px",
  },
  label: {
    color: "#d4d4d8",
    fontSize: "13px",
    display: "block",
    marginBottom: "8px",
  },
  input: {
    width: "100%",
    padding: "12px 16px",
    background: "#0a0a0a",
    border: "1px solid #3b0764",
    borderRadius: "8px",
    color: "#fff",
    fontSize: "15px",
    marginBottom: "24px",
    outline: "none",
    boxSizing: "border-box",
  },
  button: {
    width: "100%",
    padding: "13px",
    background: "linear-gradient(135deg, #7c3aed, #a855f7)",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    fontSize: "15px",
    fontWeight: 600,
    cursor: "pointer",
    boxShadow: "0 8px 20px rgba(139, 92, 246, 0.4)",
  },
};

export default Login;

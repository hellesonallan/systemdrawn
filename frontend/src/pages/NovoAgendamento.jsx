import { useState, useEffect } from "react";
import { api } from "../services/api";

function NovoAgendamento() {
  useEffect(() => {
    const usuario = localStorage.getItem("usuario");
    if (!usuario) window.location.href = "/";
  }, []);

  const usuario = JSON.parse(localStorage.getItem("usuario"));

  const [tipo, setTipo] = useState("TATUAGEM");
  const [data, setData] = useState("");
  const [horario, setHorario] = useState("");
  const [observacao, setObservacao] = useState("");

  async function salvar() {
    await api.post("/agendamentos", {
      usuarioCpf: usuario.cpf,
      tipo,
      data,
      horario,
      observacao,
    });
    alert("Agendamento criado!");
    window.location.href = "/dashboard";
  }

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <button
          style={styles.back}
          onClick={() => (window.location.href = "/dashboard")}
        >
          ← Voltar
        </button>

        <h1 style={styles.title}>Novo Agendamento</h1>
        <p style={styles.subtitle}>Preencha os detalhes do seu agendamento</p>

        <label style={styles.label}>Tipo de Serviço</label>
        <select
          style={styles.input}
          value={tipo}
          onChange={(e) => setTipo(e.target.value)}
        >
          <option>TATUAGEM</option>
          <option>PIERCING</option>
        </select>

        <div style={styles.row}>
          <div style={{ flex: 1 }}>
            <label style={styles.label}>Data</label>
            <input
              style={styles.input}
              type="date"
              value={data}
              onChange={(e) => setData(e.target.value)}
            />
          </div>
          <div style={{ flex: 1 }}>
            <label style={styles.label}>Horário</label>
            <input
              style={styles.input}
              type="time"
              value={horario}
              onChange={(e) => setHorario(e.target.value)}
            />
          </div>
        </div>

        <label style={styles.label}>Observação</label>
        <textarea
          style={{ ...styles.input, minHeight: "110px", resize: "vertical" }}
          value={observacao}
          onChange={(e) => setObservacao(e.target.value)}
          placeholder={
            tipo === "TATUAGEM"
              ? "Ex.: Tatuagem realista de lobo no antebraço, tamanho médio."
              : "Ex.: Piercing no nariz com joia prateada."
          }
        />

        <button style={styles.button} onClick={salvar}>
          Salvar Agendamento
        </button>
      </div>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    background: "radial-gradient(circle at 20% 80%, #2a0a3d 0%, #0a0a0a 60%)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontFamily: "'Segoe UI', sans-serif",
    padding: "30px 20px",
  },
  card: {
    background: "rgba(20,20,20,0.85)",
    border: "1px solid #3b0764",
    borderRadius: "16px",
    padding: "36px",
    width: "100%",
    maxWidth: "520px",
    boxShadow: "0 20px 60px rgba(139,92,246,0.25)",
  },
  back: {
    background: "transparent",
    border: "none",
    color: "#a1a1aa",
    cursor: "pointer",
    fontSize: "13px",
    marginBottom: "16px",
    padding: 0,
  },
  title: { color: "#fff", margin: "0 0 6px", fontSize: "26px" },
  subtitle: { color: "#a1a1aa", fontSize: "14px", marginBottom: "28px" },
  label: {
    color: "#d4d4d8",
    fontSize: "13px",
    display: "block",
    marginBottom: "8px",
    marginTop: "4px",
  },
  input: {
    width: "100%",
    padding: "12px 14px",
    background: "#0a0a0a",
    border: "1px solid #3b0764",
    borderRadius: "8px",
    color: "#fff",
    fontSize: "14px",
    marginBottom: "18px",
    outline: "none",
    boxSizing: "border-box",
    fontFamily: "inherit",
  },
  row: { display: "flex", gap: "14px" },
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
    marginTop: "8px",
    boxShadow: "0 8px 20px rgba(139,92,246,0.4)",
  },
};

export default NovoAgendamento;

import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { api } from "../services/api";

function EditarAgendamento() {
  useEffect(() => {
    const usuario = localStorage.getItem("usuario");
    if (!usuario) window.location.href = "/";
  }, []);

  const { id } = useParams();
  const navigate = useNavigate();
  const usuario = JSON.parse(localStorage.getItem("usuario"));

  const [tipo, setTipo] = useState("");
  const [data, setData] = useState("");
  const [horario, setHorario] = useState("");
  const [observacao, setObservacao] = useState("");

  useEffect(() => {
    carregarAgendamento();
  }, []);

  async function carregarAgendamento() {
    const response = await api.get(`/agendamentos/usuario/${usuario.cpf}`);
    const agendamento = response.data.find((item) => item.id === id);

    if (!agendamento) {
      alert("Agendamento não encontrado");
      navigate("/dashboard");
      return;
    }

    setTipo(agendamento.tipo);
    setData(agendamento.data.split("T")[0]);
    setHorario(agendamento.horario.slice(0, 5));
    setObservacao(agendamento.observacao || "");
  }

  async function salvar() {
    try {
      await api.put(`/agendamentos/${id}`, { data, horario, observacao });
      alert("Agendamento atualizado!");
      navigate("/dashboard");
    } catch (error) {
      console.error(error);
      alert("Erro ao atualizar.");
    }
  }

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <button style={styles.back} onClick={() => navigate("/dashboard")}>
          ← Voltar
        </button>

        <h1 style={styles.title}>Editar Agendamento</h1>
        <span style={styles.badge}>{tipo}</span>

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
          style={{ ...styles.input, minHeight: "120px", resize: "vertical" }}
          value={observacao}
          onChange={(e) => setObservacao(e.target.value)}
          rows={5}
        />

        <button style={styles.button} onClick={salvar}>
          Salvar Alterações
        </button>
      </div>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    background: "radial-gradient(circle at 80% 20%, #2a0a3d 0%, #0a0a0a 60%)",
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
  title: { color: "#fff", margin: "0 0 12px", fontSize: "26px" },
  badge: {
    display: "inline-block",
    background: "rgba(168,85,247,0.15)",
    color: "#c084fc",
    fontSize: "11px",
    fontWeight: 700,
    letterSpacing: "1px",
    padding: "5px 12px",
    borderRadius: "20px",
    marginBottom: "24px",
  },
  label: {
    color: "#d4d4d8",
    fontSize: "13px",
    display: "block",
    marginBottom: "8px",
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

export default EditarAgendamento;

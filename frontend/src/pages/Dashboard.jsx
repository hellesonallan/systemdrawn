import { useEffect, useState } from "react";
import { api } from "../services/api";

function Dashboard() {
  useEffect(() => {
    const usuario = localStorage.getItem("usuario");
    if (!usuario) window.location.href = "/";
  }, []);

  const [agendamentos, setAgendamentos] = useState([]);
  const usuario = JSON.parse(localStorage.getItem("usuario"));

  function logout() {
    localStorage.removeItem("usuario");
    window.location.href = "/";
  }

  useEffect(() => {
    carregarAgendamentos();
  }, []);

  async function carregarAgendamentos() {
    try {
      const response = await api.get(`/agendamentos/usuario/${usuario.cpf}`);
      setAgendamentos(response.data);
    } catch (error) {
      console.error(error);
      alert("Erro ao carregar agendamentos.");
    }
  }

  async function excluirAgendamento(id) {
    if (!window.confirm("Deseja realmente excluir este agendamento?")) return;
    try {
      await api.delete(`/agendamentos/${id}`);
      setAgendamentos(agendamentos.filter((a) => a.id !== id));
      alert("Agendamento excluído com sucesso!");
    } catch (error) {
      console.error(error);
      alert("Erro ao excluir agendamento.");
    }
  }

  return (
    <div style={styles.page}>
      <header style={styles.header}>
        <div>
          <p style={styles.hello}>Bem-vindo,</p>
          <h1 style={styles.userName}>{usuario.nome}</h1>
        </div>
        <button style={styles.logoutBtn} onClick={logout}>
          Sair
        </button>
      </header>

      <div style={styles.container}>
        <div style={styles.toolbar}>
          <h2 style={styles.sectionTitle}>Meus Agendamentos</h2>
          <button
            style={styles.primaryBtn}
            onClick={() => (window.location.href = "/novo-agendamento")}
          >
            + Novo Agendamento
          </button>
        </div>

        {agendamentos.length === 0 ? (
          <div style={styles.empty}>
            <p>Nenhum agendamento encontrado.</p>
          </div>
        ) : (
          <div style={styles.grid}>
            {agendamentos.map((item) => (
              <div key={item.id} style={styles.card}>
                <span style={styles.badge}>{item.tipo}</span>
                <div style={styles.cardRow}>
                  <span style={styles.cardLabel}>Data</span>
                  <span style={styles.cardValue}>{item.data}</span>
                </div>
                <div style={styles.cardRow}>
                  <span style={styles.cardLabel}>Horário</span>
                  <span style={styles.cardValue}>{item.horario}</span>
                </div>
                {item.observacao && (
                  <div style={styles.obs}>
                    <span style={styles.cardLabel}>Observação</span>
                    <p style={styles.obsText}>{item.observacao}</p>
                  </div>
                )}
                <div style={styles.actions}>
                  <button
                    style={styles.editBtn}
                    onClick={() =>
                      (window.location.href = `/editar-agendamento/${item.id}`)
                    }
                  >
                    Editar
                  </button>
                  <button
                    style={styles.deleteBtn}
                    onClick={() => excluirAgendamento(item.id)}
                  >
                    Excluir
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    background: "radial-gradient(circle at 80% 0%, #2a0a3d 0%, #0a0a0a 50%)",
    fontFamily: "'Segoe UI', sans-serif",
    color: "#fff",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "24px 40px",
    borderBottom: "1px solid #2a1745",
    background: "rgba(10,10,10,0.6)",
    backdropFilter: "blur(10px)",
  },
  hello: { color: "#a1a1aa", margin: 0, fontSize: "13px" },
  userName: { margin: "4px 0 0", fontSize: "22px", color: "#fff" },
  logoutBtn: {
    background: "transparent",
    color: "#d4d4d8",
    border: "1px solid #3b0764",
    padding: "8px 18px",
    borderRadius: "8px",
    cursor: "pointer",
    fontSize: "14px",
  },
  container: { maxWidth: "1100px", margin: "0 auto", padding: "40px" },
  toolbar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "28px",
    flexWrap: "wrap",
    gap: "16px",
  },
  sectionTitle: { margin: 0, fontSize: "20px", color: "#fff" },
  primaryBtn: {
    background: "linear-gradient(135deg, #7c3aed, #a855f7)",
    color: "#fff",
    border: "none",
    padding: "11px 20px",
    borderRadius: "8px",
    cursor: "pointer",
    fontWeight: 600,
    fontSize: "14px",
    boxShadow: "0 8px 20px rgba(139,92,246,0.35)",
  },
  empty: {
    background: "rgba(20,20,20,0.6)",
    border: "1px dashed #3b0764",
    padding: "60px",
    borderRadius: "12px",
    textAlign: "center",
    color: "#a1a1aa",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
    gap: "20px",
  },
  card: {
    background: "rgba(20,20,20,0.85)",
    border: "1px solid #2a1745",
    borderRadius: "14px",
    padding: "22px",
    transition: "transform 0.2s, border-color 0.2s",
  },
  badge: {
    display: "inline-block",
    background: "rgba(168,85,247,0.15)",
    color: "#c084fc",
    fontSize: "11px",
    fontWeight: 700,
    letterSpacing: "1px",
    padding: "5px 12px",
    borderRadius: "20px",
    marginBottom: "16px",
  },
  cardRow: {
    display: "flex",
    justifyContent: "space-between",
    padding: "8px 0",
    borderBottom: "1px solid #1f1235",
  },
  cardLabel: { color: "#a1a1aa", fontSize: "13px" },
  cardValue: { color: "#fff", fontSize: "14px", fontWeight: 500 },
  obs: { marginTop: "12px" },
  obsText: {
    color: "#d4d4d8",
    fontSize: "13px",
    margin: "6px 0 0",
    lineHeight: 1.5,
  },
  actions: { display: "flex", gap: "10px", marginTop: "18px" },
  editBtn: {
    flex: 1,
    background: "transparent",
    color: "#c084fc",
    border: "1px solid #7c3aed",
    padding: "9px",
    borderRadius: "8px",
    cursor: "pointer",
    fontSize: "13px",
    fontWeight: 600,
  },
  deleteBtn: {
    flex: 1,
    background: "transparent",
    color: "#f87171",
    border: "1px solid #7f1d1d",
    padding: "9px",
    borderRadius: "8px",
    cursor: "pointer",
    fontSize: "13px",
    fontWeight: 600,
  },
};

export default Dashboard;

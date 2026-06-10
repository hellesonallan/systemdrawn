const db = require('../database/connection');

class AgendamentoController {
  async criar(req, res) {
    try {
      const {
        usuarioCpf,
        tipo,
        data,
        horario,
        observacao,
      } = req.body;

      const agendamento = await db.query(
        `
        INSERT INTO agendamentos
        (
          usuario_cpf,
          tipo,
          data,
          horario,
          observacao
        )
        VALUES ($1,$2,$3,$4,$5)
        RETURNING *
        `,
        [
          usuarioCpf,
          tipo,
          data,
          horario,
          observacao,
        ]
      );

      return res.status(201).json(agendamento.rows[0]);
    } catch (error) {
      return res.status(500).json({
        erro: error.message,
      });
    }
  }

  async listarPorCpf(req, res) {
    try {
      const { cpf } = req.params;

      const agendamentos = await db.query(
        `
        SELECT *
        FROM agendamentos
        WHERE usuario_cpf = $1
        ORDER BY data, horario
        `,
        [cpf]
      );

      return res.json(agendamentos.rows);
    } catch (error) {
      return res.status(500).json({
        erro: error.message,
      });
    }
  }

  async atualizar(req, res) {
    try {
      const { id } = req.params;
      const { data, horario, observacao } = req.body;

      const resultado = await db.query(
        `
        UPDATE agendamentos
        SET
          data = $1,
          horario = $2,
          observacao = $3
        WHERE id = $4
        RETURNING *
        `,
        [data, horario, observacao, id]
      );

      return res.json(resultado.rows[0]);
    } catch (error) {
      return res.status(500).json({
        erro: error.message,
      });
    }
  }

  async excluir(req, res) {
    try {
      const { id } = req.params;

      await db.query(
        'DELETE FROM agendamentos WHERE id = $1',
        [id]
      );

      return res.json({
        mensagem: 'Agendamento removido',
      });
    } catch (error) {
      return res.status(500).json({
        erro: error.message,
      });
    }
  }
}

module.exports = new AgendamentoController();
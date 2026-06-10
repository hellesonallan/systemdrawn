const db = require('../database/connection');

class UsuarioController {
  async criar(req, res) {
    try {
      const { cpf, nome, telefone, email } = req.body;

      const usuario = await db.query(
        `
        INSERT INTO usuarios
        (cpf, nome, telefone, email)
        VALUES ($1,$2,$3,$4)
        RETURNING *
        `,
        [cpf, nome, telefone, email]
      );

      return res.status(201).json(usuario.rows[0]);
    } catch (error) {
      return res.status(500).json({
        erro: error.message,
      });
    }
  }

  async buscar(req, res) {
    try {
      const { cpf } = req.params;

      const usuario = await db.query(
        'SELECT * FROM usuarios WHERE cpf = $1',
        [cpf]
      );

      if (!usuario.rows.length) {
        return res.status(404).json({
          mensagem: 'Usuário não encontrado',
        });
      }

      return res.json(usuario.rows[0]);
    } catch (error) {
      return res.status(500).json({
        erro: error.message,
      });
    }
  }
}

module.exports = new UsuarioController();
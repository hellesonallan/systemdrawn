const express = require('express');
const router = express.Router();

const agendamentoController = require('../controllers/agendamentoController');

router.post('/', agendamentoController.criar);

router.get(
  '/usuario/:cpf',
  agendamentoController.listarPorCpf
);

router.put(
  '/:id',
  agendamentoController.atualizar
);

router.delete(
  '/:id',
  agendamentoController.excluir
);

module.exports = router;
const express = require('express');
const router = express.Router();

const usuarioController = require('../controllers/usuarioController');

router.post('/', usuarioController.criar);

router.get('/:cpf', usuarioController.buscar);

module.exports = router;
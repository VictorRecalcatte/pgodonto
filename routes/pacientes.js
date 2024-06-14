const express = require('express');
const { getPaciente,  cadastrarPaciente} = require('../controllers/paciente.js'); 

const router = express.Router();

// Rota para obter paciente
router.get('/pacientes', getPaciente);

// Rota para cadastrar paciente
router.post('/addpaciente', cadastrarPaciente);

module.exports = router;

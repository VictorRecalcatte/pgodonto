const express = require('express');
const cors = require('cors');
const pacienteRoutes = require('./routes/pacientes.js');
const db = require('./db.js');

const app = express();
const port = 3535;


app.use(express.json());
app.use(cors());

// Testar conexão com o banco de dados ao iniciar o servidor
db.testConnection();

// Rota para pacientes
app.use('/', pacienteRoutes);

// Inicia o servidor
app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});

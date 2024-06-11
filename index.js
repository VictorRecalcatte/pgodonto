const express = require('express');
const db = require('./db');
const cors = require('cors');

const app = express();
const port = 3535;

// Middleware para permitir o parsing do corpo da requisição como JSON
app.use(express.json());
app.use(cors());

// Testar conexão com o banco de dados ao iniciar o servidor
db.testConnection();


//rota para consultar pacientes
app.get('/pacientes', async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM Paciente');
    res.json(result.rows);
  } catch (err) {
    console.error('Erro ao obter pacientes', err.stack);
    res.status(500).send('Erro ao obter pacientes');
  }
});

// Rota para cadastrar um novo paciente
app.post('/addpaciente', async (req, res) => {
    try {
        const { nome, cpf, sexo, idade, cod_paciente } = req.body;

        // Verifica se todos os campos necessários estão presentes
        if (!nome || !cpf || !sexo || !idade || !cod_paciente) {
            return res.status(400).json({ message: 'Por favor, forneça nome, cpf, sexo e idade do paciente.' });
        }

        const q = 'INSERT INTO Paciente (nome, cpf, sexo, idade, cod_paciente) VALUES ($1, $2, $3, $4, $5)';
        const values = [nome, cpf, sexo, idade, cod_paciente];

        // Insere o paciente no banco de dados e retorna o paciente inserido
        const result = await db.query(q, values);

        res.status(200).json(result.rows[0]); // Retorna o paciente inserido
    } catch (err) {
        console.error('Erro ao cadastrar paciente:', err);
        res.status(500).json({ message: 'Erro ao cadastrar paciente.', err});
    }
});

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});

const db = require('../db.js');

const getPaciente = async (_, res) => {
    const q = "SELECT * FROM paciente";
  
    try {
      const { rows } = await db.query(q);
      res.status(200).json(rows); // Retorna apenas os dados dos pacientes
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
};


const cadastrarPaciente = async (req, res) => {
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

        res.status(200).json(result.rows[0]); 
    } catch (err) {
        console.error('Erro ao cadastrar paciente:', err);
        res.status(500).json({ message: 'Erro ao cadastrar paciente.', err});
    }
  };

module.exports = { getPaciente, cadastrarPaciente };

const { Pool } = require('pg');

// Configurações de conexão
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'odonto',
  password: 'admin123',
  port: 5432,
});

// Função para testar a conexão
const testConnection = async () => {
  try {
    const client = await pool.connect();
    console.log('Conectado ao banco de dados PostgreSQL');
    client.release();
  } catch (err) {
    console.error('Erro ao conectar ao banco de dados', err.stack);
  }
};



// Exportar o pool e a função de teste
module.exports = {
  query: (text, params) => pool.query(text, params),
  testConnection,
};

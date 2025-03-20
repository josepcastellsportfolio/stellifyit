const { Pool } = require('pg');

// Configuración de la conexión
const pool = new Pool({
  user: 'jcastells',
  host: 'localhost',
  database: 'stellifyit_db',  
  password: 'deltebre43580',  
  port: 5432,                
});

// Prueba de conexión
pool.query('SELECT NOW()', (err, res) => {
  if (err) {
    console.error('Error al conectar con PostgreSQL', err);
  } else {
    console.log('Conexión exitosa:', res.rows);
  }
  pool.end();
});
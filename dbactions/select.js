const { Pool } = require('pg');

// Configuración de conexión a PostgreSQL
const pool = new Pool({
    user: 'jcastells',
    host: 'localhost',
    database: 'stellifyit_db',  
    password: 'deltebre43580',  
    port: 5432,          
});

// Consulta a la base de datos
const queryTable = async () => {
  const client = await pool.connect();

  try {
    // Realiza la consulta a la tabla 'stellifyit.users'
    const result = await client.query('SELECT * FROM stellifyit.users;');
    
    // Muestra los resultados
    console.log('Datos de la tabla stellifyit.users:');
    console.table(result.rows); // Muestra los datos en formato de tabla
  } catch (err) {
    console.error('Error al consultar la tabla:', err);
  } finally {
    client.release();
  }
};

// Ejecutar la consulta
queryTable();
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

// Consultas para insertar datos
const insertData = async () => {
  const client = await pool.connect();

  try {
    await client.query('BEGIN');

    // Insertar datos en la tabla users
    await client.query(`
      INSERT INTO stellifyit.users (name, email, password_hash)
      VALUES 
        ('Josep Castells', 'josep@example.com', 'hashedpassword1'),
    `);

    await client.query('COMMIT');
    console.log('Datos insertados correctamente en el esquema stellifyit');
  } catch (err) {
    await client.query('ROLLBACK');
    console.error('Error al insertar los datos:', err);
  } finally {
    client.release();
  }
};

// Ejecución
const main = async () => {
  await insertData();
  pool.end();
};

main().catch((err) => console.error('Error general:', err));
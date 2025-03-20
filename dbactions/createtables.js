const { Pool } = require('pg');

// Configuración de la conexión
const pool = new Pool({
  user: 'jcastells',
  host: 'localhost',
  database: 'stellifyit_db',  
  password: 'deltebre43580',  
  port: 5432,                
});



const createTables = async () => {
  const client = await pool.connect();

  try {
    await client.query('BEGIN');

    // Crear el esquema 'stellifyit' si no existe
    await client.query(`
      CREATE SCHEMA IF NOT EXISTS stellifyit;
    `);

    // Crear tabla users
    await client.query(`
      CREATE TABLE IF NOT EXISTS stellifyit.users (
        id SERIAL PRIMARY KEY,
        username VARCHAR(50) UNIQUE NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        password_hash VARCHAR(255) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        last_login TIMESTAMP,
        is_active BOOLEAN DEFAULT true
      );

      CREATE INDEX IF NOT EXISTS idx_users_email ON stellifyit.users(email);
      CREATE INDEX IF NOT EXISTS idx_users_username ON stellifyit.users(username);
    `);

    // Crear tabla todos
    /*await client.query(`
      CREATE TABLE IF NOT EXISTS stellifyit.todos (
        id SERIAL PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        description TEXT,
        completed BOOLEAN DEFAULT false
      );
    `); */

    await client.query('COMMIT');
    console.log('Tablas creadas correctamente en el esquema stellifyit');
  } catch (err) {
    await client.query('ROLLBACK');
    console.error('Error al crear las tablas:', err);
  } finally {
    client.release();
  }
};

const main = async () => {
    await createTables();
    pool.end();
  };

  
main().catch((err) => console.error('Error general:', err));
import { Pool } from 'pg';
import 'dotenv/config';

if (!process.env.DB_USER || !process.env.DB_HOST || !process.env.DB_NAME || 
    !process.env.DB_PASSWORD || !process.env.DB_PORT) {
  throw new Error('Database configuration environment variables are not set');
}

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: Number(process.env.DB_PORT),
});

export default pool;
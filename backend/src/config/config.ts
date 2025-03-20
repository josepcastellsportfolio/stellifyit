import dotenv from 'dotenv';
import { Secret } from 'jsonwebtoken';

dotenv.config();

interface Config {
  database: {
    user: string;
    host: string;
    name: string;
    password: string;
    port: number;
  };
  jwt: {
    secret: Secret;
  }
}

const getConfig = (): Config => {
  const requiredEnvVars = [
    'DB_USER',
    'DB_HOST',
    'DB_NAME',
    'DB_PASSWORD',
    'DB_PORT',
    'JWT_SECRET'
  ];

  for (const envVar of requiredEnvVars) {
    if (!process.env[envVar]) {
      throw new Error(`Missing required environment variable: ${envVar}`);
    }
  }

  return {
    database: {
      user: process.env.DB_USER!,
      host: process.env.DB_HOST!,
      name: process.env.DB_NAME!,
      password: process.env.DB_PASSWORD!,
      port: Number(process.env.DB_PORT!),
    },
    jwt: {
      secret: process.env.JWT_SECRET || 'your-development-secret-key',
    }
  };
};

export const config = getConfig();
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pg_1 = require("pg");
require("dotenv/config");
if (!process.env.DB_USER || !process.env.DB_HOST || !process.env.DB_NAME ||
    !process.env.DB_PASSWORD || !process.env.DB_PORT) {
    throw new Error('Database configuration environment variables are not set');
}
const pool = new pg_1.Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: Number(process.env.DB_PORT),
});
exports.default = pool;

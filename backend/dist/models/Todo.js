"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pool = require('../config/db');
const Todo = {
    async findAll() {
        const result = await pool.query('SELECT * FROM todos');
        return result.rows;
    },
};
exports.default = Todo;

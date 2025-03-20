"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTodos = void 0;
const db_1 = __importDefault(require("../config/db"));
const getTodos = async (req, res) => {
    try {
        const result = await db_1.default.query('SELECT * FROM stellifyit.todos');
        res.status(200).json(result.rows);
    }
    catch (err) {
        const error = err;
        res.status(500).json({ error: error.message });
    }
};
exports.getTodos = getTodos;

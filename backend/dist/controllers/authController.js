"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logout = exports.register = exports.login = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const config_1 = require("../config/config");
const db_1 = __importDefault(require("../config/db"));
const login = async (req, res) => {
    const { username, password } = req.body;
    try {
        const result = await db_1.default.query('SELECT * FROM stellifyit.users WHERE name = $1', [username]);
        const user = result.rows[0];
        if (!user || !(await bcrypt_1.default.compare(password, user.password_hash))) {
            res.status(401).json({ message: 'Invalid credentials' });
            return;
        }
        const token = jsonwebtoken_1.default.sign({ username: user.name }, config_1.config.jwt.secret);
        res.json({ token });
    }
    catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ message: 'Server error during login' });
    }
};
exports.login = login;
const register = async (req, res) => {
    console.log('Register request body:', req.body); // Debug log
    const { username, email, password } = req.body; // Changed from name to username
    try {
        if (!username || !email || !password) {
            res.status(400).json({ message: 'Username, email and password are required' });
            return;
        }
        const existingUser = await db_1.default.query('SELECT * FROM stellifyit.users WHERE name = $1 OR email = $2', [username, email]);
        if (existingUser.rows.length > 0) {
            res.status(400).json({ message: 'Username or email already exists' });
            return;
        }
        const saltRounds = 10;
        const passwordHash = await bcrypt_1.default.hash(password, saltRounds);
        const result = await db_1.default.query(`INSERT INTO stellifyit.users 
       (name, email, password_hash, created_at) 
       VALUES ($1, $2, $3, CURRENT_TIMESTAMP) 
       RETURNING name, email`, [username, email, passwordHash]);
        res.status(201).json({
            message: 'User registered successfully',
            user: result.rows[0]
        });
    }
    catch (error) {
        console.error('Registration error:', error);
        res.status(500).json({ message: 'Server error during registration' });
    }
};
exports.register = register;
const logout = async (_req, res) => {
    try {
        res.status(200).json({ message: 'Logout successful' });
    }
    catch (error) {
        res.status(500).json({ message: 'Server error during logout' });
    }
};
exports.logout = logout;

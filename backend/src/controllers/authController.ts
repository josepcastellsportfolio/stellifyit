import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { config } from '../config/config';
import pool from '../config/db';

const login = async (req: Request, res: Response): Promise<void> => {
  const { username, password } = req.body;
  
  try {
    const result = await pool.query(
      'SELECT * FROM stellifyit.users WHERE name = $1',
      [username]
    );

    const user = result.rows[0];
    if (!user || !(await bcrypt.compare(password, user.password_hash))) {
      res.status(401).json({ message: 'Invalid credentials' });
      return;
    }

    const token = jwt.sign(
      { username: user.name },
      config.jwt.secret,
      { expiresIn: '1h' } 
    );
    res.json({ token });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Server error during login' });
  }
};

const register = async (req: Request, res: Response): Promise<void> => {
  const { username, email, password } = req.body;

  try {
    const existingUser = await pool.query(
      'SELECT * FROM stellifyit.users WHERE name = $1 OR email = $2',
      [username, email]
    );

    if (existingUser.rows.length > 0) {
      res.status(400).json({ message: 'Username or email already exists' });
      return;
    }

    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(password, saltRounds);

    const result = await pool.query(
      `INSERT INTO stellifyit.users (name, email, password_hash, created_at) 
       VALUES ($1, $2, $3, CURRENT_TIMESTAMP) RETURNING name, email`,
      [username, email, passwordHash]
    );

    res.status(201).json({
      message: 'User registered successfully',
      user: result.rows[0]
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ message: 'Server error during registration' });
  }
};

export { login, register };
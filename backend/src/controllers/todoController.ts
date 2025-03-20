import { Request, Response } from 'express';
import pool from '../config/db';

const getTodos = async (req: Request, res: Response): Promise<void> => {
  try {
    const result = await pool.query('SELECT * FROM stellifyit.todos');
    res.status(200).json(result.rows);
  } catch (err) {
    const error = err as Error;
    res.status(500).json({ error: error.message });
  }
};

export {
  getTodos,
};
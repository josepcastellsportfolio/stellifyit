const pool = require('../config/db');

const Todo = {
  async findAll() {
    const result = await pool.query('SELECT * FROM todos');
    return result.rows;
  },
};

export default Todo; 
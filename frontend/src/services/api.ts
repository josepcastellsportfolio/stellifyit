import axios from 'axios';

const API_URL = 'http://localhost:3000';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests
api.interceptors.request.use((config) => {
  try {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  } catch (error) {
    console.error('Error adding token to request:', error);
  }
  return config;
});

export const authService = {
  login: async (username: string, password: string) => {
    try {
      const response = await api.post('/auth/login', { username, password });
      console.log('Login response:', response.data);
      localStorage.setItem('token', response.data.token);
      return response.data;
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  },
  register: async (userData: { username: string; email: string; password: string }) => {
    try {
      const response = await api.post('/auth/register', userData);
      console.log('User registered:', response.data);
      return response.data;
    } catch (error) {
      console.error('Registration error:', error);
      throw error;
    }
  },
  logout: () => {
    localStorage.removeItem('token');
  }
};

export const todoService = {
  getTodos: async () => {
    const response = await api.get('/todos');
    return response.data;
  },
  createTodo: async (todo: { title: string; description: string }) => {
    const response = await api.post('/todos', todo);
    return response.data;
  }
};

export default authService;
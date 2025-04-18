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
      const token = response.data.token;
      localStorage.setItem('token', token);
      return response.data;
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  },
  register: async (userData: { username: string; email: string; password: string }) => {
    try {
      const response = await api.post('/auth/register', userData);
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
    try {
      const response = await api.get('/todos');
      return response.data;
    } catch (error) {
      console.error('Error fetching todos:', error);
      throw error;
    }
  },
  createTodo: async (todo: { title: string; description: string }) => {
    try {
      const response = await api.post('/todos', todo);
      return response.data;
    } catch (error) {
      console.error('Error creating todo:', error);
      throw error;
    }
  }
};

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401 && error.response?.data?.message === 'Token has expired') {
      alert('Your session has expired. Please log in again.');
      window.location.href = '/login'; // Redirect to login page
    }
    return Promise.reject(error);
  }
);

export const openRouterService = {
  getModels: async () => {
    try {
      const response = await api.get('/openrouter/models');
      return response.data;
    } catch (error) {
      console.error('Error fetching models:', error);
      throw error;
    }
  },
  callOpenRouter: async (prompt: string, model: string) => {
    try {
      const response = await api.post('/openrouter', { prompt, model });
      return response.data;
    } catch (error) {
      console.error('Error calling OpenRouter:', error);
      throw error;
    }
  },
};

export default authService;
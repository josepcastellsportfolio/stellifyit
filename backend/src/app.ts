import express from 'express';
import cors from 'cors';
import todoRoutes from './routes/todoRoutes';
import authRoutes from './routes/authRoutes';
import authMiddleware from './middlewares/authMiddleware';
import openRouterRoutes from './routes/openRouterRoutes'; // Import the new route


const app = express();

// Enable CORS for all routes
app.use(cors({
  origin: 'http://192.168.18.159:5173',  // Your frontend URL
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));
app.use(express.json());

// Public routes BEFORE auth middleware
app.use('/auth', authRoutes);

app.use('/openrouter', openRouterRoutes); 
app.get('/', (req, res) => {
  res.redirect('/auth/login');
});

// Protected routes AFTER auth middleware
app.use(authMiddleware);
app.use('/frontpage', todoRoutes);


// Catch-all for protected routes
app.get('*', (req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

export default app;
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const todoRoutes_1 = __importDefault(require("./routes/todoRoutes"));
const authRoutes_1 = __importDefault(require("./routes/authRoutes"));
const authMiddleware_1 = __importDefault(require("./middlewares/authMiddleware"));
const openRouterRoutes_1 = __importDefault(require("./routes/openRouterRoutes")); // Import the new route
const app = (0, express_1.default)();
// Enable CORS for all routes
app.use((0, cors_1.default)({
    origin: 'http://192.168.18.159:5173', // Your frontend URL
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
}));
app.use(express_1.default.json());
// Public routes BEFORE auth middleware
app.use('/auth', authRoutes_1.default);
app.use('/openrouter', openRouterRoutes_1.default);
app.get('/', (req, res) => {
    res.redirect('/auth/login');
});
// Protected routes AFTER auth middleware
app.use(authMiddleware_1.default);
app.use('/frontpage', todoRoutes_1.default);
// Catch-all for protected routes
app.get('*', (req, res) => {
    res.status(404).json({ message: 'Route not found' });
});
exports.default = app;

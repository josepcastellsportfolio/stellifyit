import express from 'express';
import { login, register, logout } from '../controllers/authController';

const router = express.Router();

router.post('/login', login as express.RequestHandler);
router.post('/register', register as express.RequestHandler);
router.post('/logout', logout as express.RequestHandler);

export default router;
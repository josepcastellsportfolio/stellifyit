import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { config } from '../config/config';

declare module 'express' {
  interface Request {
    user?: {
      username: string;
    };
  }
}

const authMiddleware = (req: Request, res: Response, next: NextFunction): void => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    
    if (!token) {
      res.status(401).json({ 
        message: 'Authentication required',
        redirect: '/auth/login'
      });
      return;
    }

    const decoded = jwt.verify(token, config.jwt.secret) as { username: string };
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ 
      message: 'Invalid token',
      redirect: '/auth/login'
    });
  }
};

export default authMiddleware;
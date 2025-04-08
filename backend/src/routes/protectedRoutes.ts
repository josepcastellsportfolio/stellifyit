import { Router } from 'express';
import verifyToken from '../middlewares/verifyToken';

const router = Router();

router.get('/protected', verifyToken, (req, res) => {
  res.json({ message: 'This is a protected route', user: (req as any).user });
});

export default router;
// Express routres for auth endpoint
import { Router } from 'express';
import { signup, login, logout, info } from './user.controller';
import { authMiddleware } from '../../middlewares/authSession';

const router: Router = Router();

// Public
router.post('/signup', signup);
router.post('/login', login);
router.post('/logout', logout);

// Protected
router.get('/info', authMiddleware, info);

export default router;
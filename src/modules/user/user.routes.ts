// Express routres for auth endpoint

import { Router } from 'express';
import { signup, login, logout } from './user.controller';
// import authMiddleware from '../../middlewares/auth';

const router: Router = Router();

// Public
router.post('/signup', signup);
router.post('/login', login);
router.post('/logout', logout);

// Protected

export default router;
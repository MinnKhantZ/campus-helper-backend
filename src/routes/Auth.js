import express from 'express';
import { login, register, refresh, logout, me } from '../controllers/User.js';
import { authMiddleware } from '../services/auth.js';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.post('/refresh', refresh);
router.post('/logout', authMiddleware(), logout);
router.get('/me', authMiddleware(), me);

export default router;

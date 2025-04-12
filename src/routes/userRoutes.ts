import express from 'express';
import { registerUser } from '../controllers/userController';
import { loginUser } from '../controllers/userController';
import { authMiddleware } from '../middlewares/authMiddleware';

const router = express.Router();

// Rota para registrar um novo usuário
router.post('/register', registerUser);

// Rota para fazer login de um usuário
router.post('/login', loginUser);

// Rota protegida (exemplo) - apenas usuários autenticados
router.get('/profile', authMiddleware, (req, res) => {
  res.json({ message: 'Bem-vindo ao seu perfil' });
});

export default router;

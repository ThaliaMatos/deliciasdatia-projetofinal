"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userController_1 = require("../controllers/userController");
const userController_2 = require("../controllers/userController");
const authMiddleware_1 = require("../middlewares/authMiddleware");
const router = express_1.default.Router();
// Rota para registrar um novo usuário
router.post('/register', userController_1.registerUser);
// Rota para fazer login de um usuário
router.post('/login', userController_2.loginUser);
// Rota protegida (exemplo) - apenas usuários autenticados
router.get('/profile', authMiddleware_1.authMiddleware, (req, res) => {
    res.json({ message: 'Bem-vindo ao seu perfil' });
});
exports.default = router;

"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginUser = exports.registerUser = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const pg_1 = require("pg");
// Instância do banco de dados
const pool = new pg_1.Pool({
    connectionString: process.env.DATABASE_URL,
});
// Função para registrar novo usuário
const registerUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { nome, email, password } = req.body;
    if (!nome || !email || !password) {
        return res.status(400).json({ message: 'Todos os campos são obrigatórios' });
    }
    try {
        const hashedPassword = yield bcryptjs_1.default.hash(password, 10);
        yield pool.query('INSERT INTO usuarios (nome, email, password) VALUES ($1, $2, $3)', [nome, email, hashedPassword]);
        return res.status(201).json({ message: 'Usuário registrado com sucesso!' });
    }
    catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Erro ao registrar usuário' });
    }
});
exports.registerUser = registerUser;
// Função para fazer login
const loginUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    // Validação de entrada
    if (!email || !password) {
        return res.status(400).json({ message: 'Email e senha são obrigatórios' });
    }
    try {
        // Verificar se o usuário existe no banco de dados
        const result = yield pool.query('SELECT * FROM usuarios WHERE email = $1', [email]);
        if (result.rows.length === 0) {
            return res.status(400).json({ message: 'Usuário não encontrado' });
        }
        const user = result.rows[0];
        // Comparar a senha
        const isMatch = yield bcryptjs_1.default.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Senha incorreta' });
        }
        // Gerar token JWT
        const token = jsonwebtoken_1.default.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        // Retornar o token para o cliente
        return res.json({ token });
    }
    catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Erro interno do servidor' });
    }
});
exports.loginUser = loginUser;

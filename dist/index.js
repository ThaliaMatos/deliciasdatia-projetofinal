"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const pg_1 = require("pg");
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
const cors_1 = __importDefault(require("cors"));
const productRoutes_1 = __importDefault(require("./routes/productRoutes"));
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = 5000;
// Conectar ao banco de dados PostgreSQL
const pool = new pg_1.Pool({
    connectionString: process.env.DATABASE_URL,
});
pool.connect()
    .then(() => console.log('Banco de dados conectado com sucesso!'))
    .catch(err => console.error('Erro ao conectar ao banco de dados:', err));
// Middleware
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
// Rotas
app.use('/api/products', productRoutes_1.default);
app.use('/api/users', userRoutes_1.default);
// Servir as imagens
app.use('/uploads', express_1.default.static(path_1.default.join(__dirname, 'uploads')));
app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});

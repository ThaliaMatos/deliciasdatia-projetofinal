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
Object.defineProperty(exports, "__esModule", { value: true });
exports.getProducts = exports.addProduct = void 0;
const pg_1 = require("pg");
// Instancia do banco de dados
const pool = new pg_1.Pool({
    connectionString: process.env.DATABASE_URL,
});
const addProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, description, price } = req.body;
    const image = req.file ? req.file.filename : null;
    try {
        // Inserir produto no banco de dados
        yield pool.query('INSERT INTO produtos (name, description, price, image) VALUES ($1, $2, $3, $4)', [name, description, price, image]);
        res.status(201).json({ message: 'Produto cadastrado com sucesso!' });
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Erro ao cadastrar produto' });
    }
});
exports.addProduct = addProduct;
const getProducts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield pool.query('SELECT * FROM produtos');
        res.json(result.rows);
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Erro ao buscar produtos' });
    }
});
exports.getProducts = getProducts;

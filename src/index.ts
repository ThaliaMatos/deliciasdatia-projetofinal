import express from 'express';
import { Pool } from 'pg';
import dotenv from 'dotenv';
import path from 'path';
import cors from 'cors';
import productRoutes from './routes/productRoutes';
import userRoutes from './routes/userRoutes';

dotenv.config();

const app = express();
const port = 5000;

// Conectar ao banco de dados PostgreSQL
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

pool.connect()
  .then(() => console.log('Banco de dados conectado com sucesso!'))
  .catch(err => console.error('Erro ao conectar ao banco de dados:', err));

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rotas
app.use('/api/products', productRoutes);
app.use('/api/users', userRoutes);

// Servir as imagens
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});

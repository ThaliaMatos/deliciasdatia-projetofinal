import { Request, Response } from 'express';
import { Pool } from 'pg';

// Instancia do banco de dados
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

export const addProduct = async (req: Request, res: Response): Promise<void> => {
    const { name, description, price } = req.body;
    const image = req.file ? req.file.filename : null;
  
    try {
      // Inserir produto no banco de dados
      await pool.query(
        'INSERT INTO produtos (name, description, price, image) VALUES ($1, $2, $3, $4)',
        [name, description, price, image]
      );
  
      res.status(201).json({ message: 'Produto cadastrado com sucesso!' });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Erro ao cadastrar produto' });
    }
  };
  

  export const getProducts = async (req: Request, res: Response): Promise<void> => {
    try {
      const result = await pool.query('SELECT * FROM produtos');
      res.json(result.rows); 
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Erro ao buscar produtos' }); 
    }
  };

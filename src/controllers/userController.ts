import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { Pool } from 'pg';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

// Handler de login: retorna Promise<void>
export const loginUser = async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400).json({ message: 'Email e senha são obrigatórios' });
    return;
  }

  try {
    const result = await pool.query('SELECT * FROM usuarios WHERE email = $1', [email]);
    if (result.rows.length === 0) {
      res.status(400).json({ message: 'Usuário não encontrado' });
      return;
    }

    const user = result.rows[0];
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      res.status(400).json({ message: 'Senha incorreta' });
      return;
    }

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET as string, { expiresIn: '1h' });
    res.json({ token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Erro interno do servidor' });
  }
};

// Handler de registro: retorna Promise<void>
export const registerUser = async (req: Request, res: Response): Promise<void> => {
  const { nome, email, password } = req.body;
  if (!nome || !email || !password) {
    res.status(400).json({ message: 'Todos os campos são obrigatórios' });
    return;
  }

  try {
    const hashed = await bcrypt.hash(password, 10);
    await pool.query(
      'INSERT INTO usuarios (nome, email, password) VALUES ($1, $2, $3)',
      [nome, email, hashed]
    );
    res.status(201).json({ message: 'Usuário registrado com sucesso!' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Erro ao registrar usuário' });
  }
};

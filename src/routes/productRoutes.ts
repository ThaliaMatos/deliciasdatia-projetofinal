import express from 'express';
import multer from 'multer';
import path from 'path';
import { addProduct, getProducts } from '../controllers/productController';
import { authMiddleware } from '../middlewares/authMiddleware';

const router = express.Router();

// Configuração do multer para upload de imagens
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'src/uploads'); // ou 'uploads' se estiver fora da pasta src
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});
const upload = multer({ storage });

// Rota para adicionar um produto
router.post('/', authMiddleware, upload.single('image'), addProduct);

// Rota para listar os produtos
router.get('/', getProducts);

export default router;

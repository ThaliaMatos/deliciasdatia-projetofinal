"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
const productController_1 = require("../controllers/productController");
const authMiddleware_1 = require("../middlewares/authMiddleware");
const router = express_1.default.Router();
// Configuração do multer para upload de imagens
const storage = multer_1.default.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'src/uploads'); // ou 'uploads' se estiver fora da pasta src
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path_1.default.extname(file.originalname));
    }
});
const upload = (0, multer_1.default)({ storage });
// Rota para adicionar um produto
router.post('/', authMiddleware_1.authMiddleware, upload.single('image'), productController_1.addProduct);
// Rota para listar os produtos
router.get('/', productController_1.getProducts);
exports.default = router;

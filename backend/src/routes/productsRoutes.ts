import { Router } from 'express';
import { getProducts, addProduct, deleteProduct, updateProduct } from '../controllers/productsController';

const router = Router();

router.get('/', getProducts);
router.post('/', addProduct);
router.delete('/:id', deleteProduct);
router.put('/:id', updateProduct);

export default router;

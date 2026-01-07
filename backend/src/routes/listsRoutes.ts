import { Router } from 'express';
import { getLists, addList, deleteList, addProductToList, toggleProductInList } from '../controllers/listsController';

const router = Router();

router.get('/', getLists);
router.post('/', addList);
router.delete('/:id', deleteList);
router.post('/:id/products', addProductToList);

router.patch('/:id/products/:productId/toggle', toggleProductInList);

export default router;
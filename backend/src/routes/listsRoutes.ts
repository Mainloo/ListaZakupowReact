import { Router } from 'express';
import { getLists, addList, deleteList, addProductToList, toggleProductInList, removeProductFromList } from '../controllers/listsController';

const router = Router();

router.get('/', getLists);
router.post('/', addList);
router.delete('/:id', deleteList);
router.post('/:id/products', addProductToList);
router.patch('/:id/products/:productId/toggle', toggleProductInList);
router.delete('/:id/products/:productId', removeProductFromList);

export default router;
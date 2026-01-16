import { Router } from 'express';
import { getLists, addList, updateList, deleteList, addProductToList, toggleProductInList, removeProductFromList } from '../controllers/listsController';

const router = Router();

router.get('/', getLists);
router.post('/', addList);
router.put('/:id', updateList);
router.delete('/:id', deleteList);
router.post('/:id/products', addProductToList);
router.patch('/:id/products/:productId/toggle', toggleProductInList);
router.delete('/:id/products/:productId', removeProductFromList);

export default router;
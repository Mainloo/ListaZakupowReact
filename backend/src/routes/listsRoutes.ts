import { Router } from 'express';
import { getLists, addList, deleteList } from '../controllers/listsController';

const router = Router();

router.get('/', getLists);
router.post('/', addList);
router.delete('/:id', deleteList);

export default router;

import { Request, Response } from 'express';
import { lists } from '../data/lists';
import { ShoppingList } from '../types';

export const getLists = (req: Request, res: Response) => {
    res.json(lists);
};

export const addList = (req: Request, res: Response) => {
    const { name, date, notes } = req.body as Omit<ShoppingList, 'id' | 'createdAt' | 'products'>;

    if (!name || name.length < 3 || name.length > 50) {
        return res.status(400).json({ error: 'Nazwa listy 3-50 znaków' });
    }

    if (!date) {
        return res.status(400).json({ error: 'Data jest wymagana' });
    }

    const newList: ShoppingList = {
        id: Date.now(),
        name,
        date,
        notes: notes || '',
        createdAt: new Date().toISOString().split('T')[0],
        products: []
    };

    lists.push(newList);
    res.status(201).json(newList);
};

export const deleteList = (req: Request, res: Response) => {
    const id = Number(req.params.id);
    const index = lists.findIndex(l => l.id === id);
    if (index === -1) return res.status(404).json({ error: 'Nie znaleziono listy' });

    lists.splice(index, 1);
    res.sendStatus(204);
};

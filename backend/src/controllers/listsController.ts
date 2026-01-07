import { Request, Response } from 'express';
import { lists } from '../data/lists';
import { products } from '../data/products';
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

export const addProductToList = (req: Request, res: Response) => {
    const listId = Number(req.params.id);
    const { productId, quantity } = req.body; 

    const list = lists.find(l => l.id === listId);
    if (!list) return res.status(404).json({ error: 'Nie znaleziono listy' });

    const productInDb = products.find(p => p.id === Number(productId));
    if (!productInDb) return res.status(404).json({ error: 'Nie znaleziono produktu' });
    const existingItem = list.products.find(p => p.id === Number(productId));

    if (existingItem) {
        // SCENARIUSZ A: Produkt jest
        existingItem.quantity += (quantity || 1);
    } else {
        // SCENARIUSZ B: Produktu nie ma
        const newItem = {
            ...productInDb,
            quantity: quantity || 1, 
            isBought: false          
        };
        list.products.push(newItem);
    }

    res.status(200).json(list);
};

export const toggleProductInList = (req: Request, res: Response) => {
    const listId = Number(req.params.id);
    const productId = Number(req.params.productId); 

    const list = lists.find(l => l.id === listId);
    if (!list) return res.status(404).json({ error: 'Nie znaleziono listy' });

    const item = list.products.find(p => p.id === productId);
    if (!item) return res.status(404).json({ error: 'Produkt nie jest na tej liście' });

    item.isBought = !item.isBought;

    res.json(list);
};

export const removeProductFromList = (req: Request, res: Response) => {
    const listId = Number(req.params.id);
    const productId = Number(req.params.productId);
    const list = lists.find(l => l.id === listId);
    if (!list) {
        return res.status(404).json({ error: 'Nie znaleziono listy' });
    }
    const productIndex = list.products.findIndex(p => p.id === productId);
    
    if (productIndex === -1) {
        return res.status(404).json({ error: 'Tego produktu nie ma na liście' });
    }
    list.products.splice(productIndex, 1);
    res.sendStatus(204);
}
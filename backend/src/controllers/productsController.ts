import { Request, Response } from 'express';
import { products } from '../data/products';
import { Product } from '../types';

export const getProducts = (req: Request, res: Response) => {
    res.json(products);
};

export const addProduct = (req: Request, res: Response) => {
    const { name, category, price } = req.body as Omit<Product, 'id'>;

    if (!name || name.length < 2) {
        return res.status(400).json({ error: 'Nazwa produktu min. 2 znaki' });
    }
    if (!category) {
        return res.status(400).json({ error: 'Kategoria jest wymagana' });
    }

    const newProduct: Product = {
        id: Date.now(),
        name,
        category,
        price
    };

    products.push(newProduct);
    res.status(201).json(newProduct);
};

export const deleteProduct = (req: Request, res: Response) => {
    const id = Number(req.params.id);
    const index = products.findIndex(p => p.id === id);
    if (index === -1) return res.status(404).json({ error: 'Nie znaleziono produktu' });

    products.splice(index, 1);
    res.sendStatus(204);
};

export const updateProduct = (req: Request, res: Response) => {

    // console.log("CONTROLLER: Próba edycji!"); 
    // console.log("ID z URL:", req.params.id);
    // console.log("Dane z Body:", req.body);

    const id = Number(req.params.id);
    const { name, category, price } = req.body;

    const product = products.find(p => p.id === id);

    if (!product) {
        return res.status(404).json({ error: 'Nie znaleziono produktu' });
    }

    if (name) product.name = name;
    if (category) product.category = category;
    if (price !== undefined) product.price = price; 

    res.json(product);
};
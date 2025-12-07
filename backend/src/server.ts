import express, { Request, Response } from 'express';
import cors from 'cors';
import connectDB from "../database/db"; 

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

connectDB();

interface Product {
    id: number;
    name: string;
    quantity: number;
    category: string;
    bought: boolean;
    addedAt: string;
    price?: number;
}

interface ShoppingList {
    id: number;
    name: string;
    date: string;
    notes: string;
    createdAt: string;
    products: Product[];
}


const lists: ShoppingList[] = [
    { 
        id: 1, 
        name: "Startowa lista", 
        date: "2026-01-20", 
        notes: "Przykładowa notatka", 
        createdAt: "2026-01-10",
        products: [] 
    }
];


app.get('/api/lists', (req: Request, res: Response) => {
    res.json(lists);
});


app.post('/api/lists', (req: Request, res: Response): any => {

    const { name, date, notes } = req.body as { name: string, date: string, notes?: string };


    if (!name || name.length < 3 || name.length > 50) {
        return res.status(400).json({ error: "Nazwa musi mieć 3-50 znaków." });
    }
    if (!date) {
        return res.status(400).json({ error: "Data jest wymagana." });
    }

    const newList: ShoppingList = {
        id: Date.now(),
        name,
        date,
        notes: notes || "",
        createdAt: new Date().toISOString().split('T')[0],
        products: []
    };

    lists.push(newList);
    res.status(201).json(newList);
});


app.listen(PORT, () => {
    console.log(`Serwer TS działa na porcie ${PORT}`);
});
export interface Product {
    id: number;
    name: string;
    quantity: number;
    category: string;
    bought: boolean;
    addedAt: string;
    price?: number;
}

export interface ShoppingList {
    id: number;
    name: string;
    date: string;
    notes: string;
    createdAt: string;
    products: Product[];
}

export interface NewListForm {
    name: string;
    date: string;
    notes: string;
}
export interface Product {
    id: number;
    name: string;
    category: string;
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
    notes?: string;
}

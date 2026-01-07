export interface Product {
    id: number;
    name: string;
    category: string;
    price?: number;
}

export interface ShoppingListItem extends Product {
    quantity: number;
    isBought: boolean;
}

export interface ShoppingList {
    id: number;
    name: string;
    date: string;
    notes: string;
    createdAt: string;
    products: ShoppingListItem[]; 
}

export interface NewListForm {
    name: string;
    date: string;
    notes?: string;
}
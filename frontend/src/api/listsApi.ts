import { ShoppingList, NewListForm } from '../types';

const API_URL = 'http://localhost:5000/api/lists';

export const fetchLists = async (): Promise<ShoppingList[]> => {
    const res = await fetch(API_URL);
    if (!res.ok) {
        throw new Error('Błąd podczas pobierania list');
    }
    return res.json();
};

export const createList = async (newList: NewListForm): Promise<ShoppingList> => {
    const res = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newList)
    });

    if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.error || 'Błąd serwera');
    }
    return res.json();
};

export const removeList = async (id: number): Promise<void> => {
    await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
};


export const addProductToList = async (listId: number, productId: number, quantity: number): Promise<ShoppingList> => {
    const res = await fetch(`${API_URL}/${listId}/products`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ productId, quantity }) 
    });

    if (!res.ok) throw new Error('Nie udało się dodać produktu');
    return res.json();
};

export const toggleProductStatus = async (listId: number, productId: number): Promise<ShoppingList> => {
    const res = await fetch(`${API_URL}/${listId}/products/${productId}/toggle`, {
        method: 'PATCH',
    });

    if (!res.ok) throw new Error('Nie udało się zmienić statusu');
    return res.json();
};
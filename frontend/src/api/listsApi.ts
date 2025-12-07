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
// usuwanie
export const removeList = async (id: number): Promise<void> => {
    await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
};
import api from './axios';
import { ShoppingList, NewListForm } from '../types';

export const fetchLists = async (sortBy?: string, order?: string): Promise<ShoppingList[]> => {
    const response = await api.get('/lists', { params: { sortBy, order } });
    return response.data;
};

export const createList = async (newList: NewListForm): Promise<ShoppingList> => {
    const response = await api.post('/lists', newList);
    return response.data;
};

export const removeList = async (id: number): Promise<void> => {
    await api.delete(`/lists/${id}`);
};

export const updateList = async (id: number, listData: Partial<NewListForm>): Promise<ShoppingList> => {
    const response = await api.put(`/lists/${id}`, listData);
    return response.data;
};

export const addProductToList = async (
    listId: number, 
    productId: number, 
    quantity: number
): Promise<ShoppingList> => {
    const response = await api.post(`/lists/${listId}/products`, { 
        productId, 
        quantity 
    });
    return response.data;
};

export const toggleProductStatus = async (
    listId: number, 
    productId: number
): Promise<ShoppingList> => {
    const response = await api.patch(`/lists/${listId}/products/${productId}/toggle`);
    return response.data;
};

export const removeProductFromList = async (listId: number, productId: number): Promise<void> => {
    await api.delete(`/lists/${listId}/products/${productId}`);
};
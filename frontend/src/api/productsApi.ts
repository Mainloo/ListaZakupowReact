import api from './axios';
import { Product } from '../types';

export const getProducts = async (): Promise<Product[]> => {
    const response = await api.get('/products');
    return response.data;
};

export const createProduct = async (
    product: Omit<Product, 'id'>
): Promise<Product> => {
    const response = await api.post('/products', product);
    return response.data;
};

export const updateProduct = async (
    product: Product
): Promise<Product> => {
    const response = await api.put(`/products/${product.id}`, product);
    return response.data;
};

export const deleteProduct = async (id: number): Promise<void> => {
    await api.delete(`/products/${id}`);
};

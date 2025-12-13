import React, { useEffect, useState } from 'react';
import { Product } from '../types';
import {
    getProducts,
    createProduct,
    deleteProduct
} from '../api/productsApi';

import { ProductForm } from '../components/ProductForm';
import { ProductList } from '../components/ProductList';

export const ProductsPage: React.FC = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [error, setError] = useState('');

    useEffect(() => {
        loadProducts();
    }, []);

    const loadProducts = async () => {
        try {
            const data = await getProducts();
            setProducts(data);
        } catch {
            setError('Nie udało się pobrać produktów');
        }
    };

    const handleAdd = async (data: Omit<Product, 'id'>) => {
        try {
            const newProduct = await createProduct(data);
            setProducts(prev => [...prev, newProduct]);
        } catch (err: any) {
            setError(err.response?.data?.error || 'Błąd podczas dodawania');
        }
    };

    const handleDelete = async (id: number) => {
        await deleteProduct(id);
        setProducts(prev => prev.filter(p => p.id !== id));
    };

    return (
        <div>
            <h2>Baza produktów</h2>

            {error && <p className="error">{error}</p>}

            <ProductForm onAdd={handleAdd} />
            <ProductList products={products} onDelete={handleDelete} />
        </div>
    );
};

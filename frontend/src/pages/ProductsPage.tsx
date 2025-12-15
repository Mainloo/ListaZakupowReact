import React, { useEffect, useState } from 'react';
import { Product } from '../types';
import {
    getProducts,
    createProduct,
    deleteProduct,
    updateProduct
} from '../api/productsApi';

import { ProductForm } from '../components/ProductForm';
import { ProductList } from '../components/ProductList';

export const ProductsPage: React.FC = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [editingProduct, setEditingProduct] = useState<Product | null>(null);
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

    const handleUpdate = async (productToUpdate: Product) => {
        try {
            const updated = await updateProduct(productToUpdate);
            
            setProducts(prev => prev.map(p => p.id === updated.id ? updated : p));
            
            setEditingProduct(null);
        } catch (err: any) {
            setError('Błąd podczas aktualizacji');
            throw err;
        }
    };

    const handleDelete = async (id: number) => {
        if (editingProduct?.id === id) {
            setEditingProduct(null);
        }
        await deleteProduct(id);
        setProducts(prev => prev.filter(p => p.id !== id));
    };

    return (
        <div>
            <h2>Baza produktów</h2>

            {error && <p className="error">{error}</p>}

            <ProductForm 
                onAdd={handleAdd} 
                onUpdate={handleUpdate}
                editingProduct={editingProduct}
                onCancel={() => setEditingProduct(null)}
            />
            <ProductList 
                products={products} 
                onDelete={handleDelete} 
                onEdit={(product) => setEditingProduct(product)} 
            />
        </div>
    );
};

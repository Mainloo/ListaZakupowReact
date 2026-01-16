import React, { useState, FormEvent, useEffect } from 'react';
import { Product } from '../types';
import { Button } from './common/Button';

interface Props {
    onAdd: (data: Omit<Product, 'id'>) => Promise<void>;
    onUpdate: (product: Product) => Promise<void>; 
    editingProduct: Product | null;                
    onCancel: () => void;                          
}

export const ProductForm: React.FC<Props> = ({ onAdd, onUpdate, editingProduct, onCancel }) => {
    const [name, setName] = useState('');
    const [category, setCategory] = useState('');
    const [price, setPrice] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        if (editingProduct) {
            setName(editingProduct.name);
            setCategory(editingProduct.category);
            setPrice(editingProduct.price ? String(editingProduct.price) : '');
        } else {
            clearForm();
        }
    }, [editingProduct]);

    const clearForm = () => {
        setName('');
        setCategory('');
        setPrice('');
        setError('');
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setError('');

        if (name.trim().length < 2) {
            setError('Nazwa musi mieć min. 2 znaki');
            return;
        }

        if (!category.trim()) {
            setError('Kategoria jest wymagana');
            return;
        }

        const priceNumber = price ? Number(price) : undefined;

        try {
            if (editingProduct) {
                await onUpdate({
                    id: editingProduct.id, 
                    name: name.trim(),
                    category: category.trim(),
                    price: priceNumber
                });
            } else {
                await onAdd({
                    name: name.trim(),
                    category: category.trim(),
                    price: priceNumber
                });
                clearForm(); 
            }
        } catch (err: any) {
            setError('Błąd zapisu danych');
        }
    };

    return (
        <div className="form-card">
            <h3>{editingProduct ? 'Edytuj produkt' : 'Dodaj produkt'}</h3>

            {error && <p className="error">{error}</p>}

            <form onSubmit={handleSubmit}>
                <div className="form-row">
                    <input
                        placeholder="Nazwa produktu"
                        value={name}
                        onChange={e => setName(e.target.value)}
                        style={{ flex: 2 }}
                    />
                    <input
                        placeholder="Kategoria"
                        value={category}
                        onChange={e => setCategory(e.target.value)}
                        style={{ flex: 1 }}
                    />
                    <input
                        type="number"
                        placeholder="Cena (zł)"
                        value={price}
                        onChange={e => setPrice(e.target.value)}
                        style={{ width: '100px' }}
                    />
                </div>

                <div style={{ marginTop: '10px' }}>
                    <Button type="submit" style={{ marginRight: '10px' }}>
                        {editingProduct ? 'Zapisz zmiany' : 'Dodaj'}
                    </Button>
                    {editingProduct && (
                        <Button type="button" variant="secondary" onClick={onCancel}>Anuluj</Button>
                    )}
                </div>
            </form>
        </div>
    );
};
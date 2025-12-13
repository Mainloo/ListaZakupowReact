import React, { useState, FormEvent } from 'react';

interface Props {
    onAdd: (data: {
        name: string;
        category: string;
        price?: number;
    }) => void;
}

export const ProductForm: React.FC<Props> = ({ onAdd }) => {
    const [name, setName] = useState('');
    const [category, setCategory] = useState('');
    const [price, setPrice] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = (e: FormEvent) => {
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

        onAdd({
            name: name.trim(),
            category: category.trim(),
            price: price ? Number(price) : undefined
        });

        setName('');
        setCategory('');
        setPrice('');
    };

    return (
        <form onSubmit={handleSubmit} style={{ marginBottom: '20px' }}>
            <h3>Dodaj produkt</h3>

            {error && <p className="error">{error}</p>}

            <input
                placeholder="Nazwa produktu"
                value={name}
                onChange={e => setName(e.target.value)}
            />

            <input
                placeholder="Kategoria"
                value={category}
                onChange={e => setCategory(e.target.value)}
            />

            <input
                type="number"
                placeholder="Cena (opcjonalnie)"
                value={price}
                onChange={e => setPrice(e.target.value)}
            />

            <button type="submit">Dodaj</button>
        </form>
    );
};

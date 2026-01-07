import React, { useState } from 'react';
import { Product } from '../types';

interface Props {
    availableProducts: Product[];
    onAdd: (productId: number, quantity: number) => void; 
}

export const AddProductToList: React.FC<Props> = ({ availableProducts, onAdd }) => {
    const [selectedId, setSelectedId] = useState<string>('');
    const [quantity, setQuantity] = useState<number>(1); 

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (selectedId) {
            onAdd(Number(selectedId), quantity);
            setSelectedId('');
            setQuantity(1); 
        }
    };

    return (
        <form onSubmit={handleSubmit} style={{ marginTop: '10px', display: 'flex', gap: '5px', alignItems: 'center' }}>
            <select 
                value={selectedId} 
                onChange={(e) => setSelectedId(e.target.value)}
                style={{ padding: '5px' }}
            >
                <option value="">-- Wybierz produkt --</option>
                {availableProducts.map(p => (
                    <option key={p.id} value={p.id}>
                        {p.name}
                    </option>
                ))}
            </select>
            
            {/* Pole ilości */}
            <input 
                type="number" 
                min="1" 
                value={quantity} 
                onChange={e => setQuantity(Number(e.target.value))}
                style={{ width: '50px', padding: '5px' }}
            />

            <button type="submit" disabled={!selectedId}>Dodaj</button>
        </form>
    );
};
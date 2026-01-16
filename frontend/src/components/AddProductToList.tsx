import { Product } from '../types';
import { Button } from './common/Button';
import { useState } from 'react';

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
        <form className="add-product-form" onSubmit={handleSubmit}>
            <select 
                className="product-select"
                value={selectedId} 
                onChange={(e) => setSelectedId(e.target.value)}
            >
                <option value="">-- Wybierz produkt --</option>
                {availableProducts.map(p => (
                    <option key={p.id} value={p.id}>
                        {p.name}
                    </option>
                ))}
            </select>
            
            <input 
                className="quantity-input"
                type="number" 
                min="1" 
                value={quantity} 
                onChange={e => setQuantity(Number(e.target.value))}
            />

            <Button type="submit" disabled={!selectedId}>Dodaj</Button>
        </form>
    );
};
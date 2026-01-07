import React from 'react';
import { ShoppingList, Product } from '../types';
import { AddProductToList } from './AddProductToList';

interface Props {
    list: ShoppingList;
    availableProducts: Product[];
    onAddProduct: (listId: number, productId: number, quantity: number) => void;
    onToggleProduct: (listId: number, productId: number) => void;
    onRemove: (id: number) => void;
    onRemoveProduct: (listId: number, productId: number) => void;
}

export const ListItem: React.FC<Props> = ({ 
    list, 
    availableProducts, 
    onAddProduct, 
    onToggleProduct, 
    onRemove,
    onRemoveProduct
}) => {
    return (
        <div className="list-card">
            <div className="list-header">
                <h3>{list.name} <span className="date">({list.date})</span></h3>
                <button onClick={() => onRemove(list.id)}>Usuń listę</button>
            </div>
            
            {list.notes && <p className="notes">{list.notes}</p>}

            <ul className="shopping-items">
                {list.products.map((p, idx) => (
                    <li 
                        key={`${p.id}-${idx}`} 
                        style={{ 
                            textDecoration: p.isBought ? 'line-through' : 'none',
                            color: p.isBought ? '#aaa' : 'inherit',
                            padding: '5px 0', 
                            display: 'flex', 
                            justifyContent: 'center',
                            alignItems: 'center',    
                            gap: '10px'               
                        }}
                    >
                        <div>
                            <input 
                                type="checkbox" 
                                checked={p.isBought} 
                                onChange={() => onToggleProduct(list.id, p.id)}
                                style={{ marginRight: '10px' }}
                            />
                            {p.name} (x{p.quantity}) - {p.category}
                            
                            {p.price && (
                                <span style={{ fontWeight: 'bold', marginLeft: '5px' }}>
                                    | {(p.price * p.quantity).toFixed(2)} zł
                                </span>
                            )}
                        </div>

                        <button 
                            onClick={() => onRemoveProduct(list.id, p.id)}
                            style={{ marginLeft: '10px', color: 'red', cursor: 'pointer' }}
                        >X</button>
                    </li>
                ))}
                {list.products.length === 0 && <li><i>Brak produktów na liście</i></li>}
            </ul>

            <AddProductToList 
                availableProducts={availableProducts} 
                onAdd={(pid, qty) => onAddProduct(list.id, pid, qty)} 
            />
        </div>
    );
};
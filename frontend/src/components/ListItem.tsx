import React from 'react';
import { ShoppingList, Product } from '../types';
import { AddProductToList } from './AddProductToList';

interface Props {
    list: ShoppingList;
    availableProducts: Product[]; 
    onAddProduct: (listId: number, productId: number, quantity: number) => void;
    onToggleProduct: (listId: number, productId: number) => void; // Nowy prop
}

export const ListItem: React.FC<Props> = ({ list, availableProducts, onAddProduct, onToggleProduct }) => {
    return (
        <div className="list-item" style={{ border: '1px solid #ddd', padding: '15px', margin: '10px 0', borderRadius: '5px', background: '#fff' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h3 style={{ margin: 0 }}>{list.name}</h3>
                <small>{list.date}</small>
            </div>
            <p style={{ fontStyle: 'italic', color: '#666' }}>{list.notes}</p>

            <hr style={{ margin: '10px 0', borderTop: '1px solid #eee' }} />
            
            <strong>Do kupienia:</strong>
            {list.products && list.products.length > 0 ? (
                <ul style={{ listStyle: 'none', padding: 0 }}>
                    {list.products.map((p, index) => (
                        <li key={`${list.id}-${p.id}-${index}`} 
                            style={{ 
                                display: 'flex', 
                                alignItems: 'center', 
                                padding: '5px 0',
                                textDecoration: p.isBought ? 'line-through' : 'none', 
                                color: p.isBought ? '#aaa' : '#000' 
                            }}>
                            
                            {/* Checkbox */}
                            <input 
                                type="checkbox" 
                                checked={p.isBought} 
                                onChange={() => onToggleProduct(list.id, p.id)}
                                style={{ marginRight: '10px', cursor: 'pointer' }}
                            />
                            
                            <span>
                                <b>{p.name}</b> x{p.quantity} 
                                <span style={{ fontSize: '0.8em', marginLeft: '5px' }}>
                                    ({p.category}) {p.price ? `${(p.price * p.quantity).toFixed(2)} zł` : ''}
                                </span>
                            </span>
                        </li>
                    ))}
                </ul>
            ) : (
                <p style={{ fontSize: '0.9em', color: '#888' }}>Lista pusta.</p>
            )}

            <AddProductToList 
                availableProducts={availableProducts} 
                onAdd={(productId, quantity) => onAddProduct(list.id, productId, quantity)} 
            />
        </div>
    );
};
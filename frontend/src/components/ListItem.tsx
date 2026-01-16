import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingList, Product } from '../types';
import { AddProductToList } from './AddProductToList';
import { Button } from './common/Button';

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
                <div>
                     <Link to={`/list/${list.id}`}>
                        <Button variant="secondary" style={{ marginRight: '5px' }}>Edytuj</Button>
                     </Link>
                    <Button variant="danger" onClick={() => onRemove(list.id)}>Usuń listę</Button>
                </div>
            </div>
            
            {list.notes && <p className="notes">{list.notes}</p>}

            <ul className="shopping-items">
                {list.products.map((p, idx) => (
                    <li key={`${p.id}-${idx}`}>
                        <div className="product-info">
                            <input 
                                type="checkbox" 
                                checked={p.isBought} 
                                onChange={() => onToggleProduct(list.id, p.id)}
                            />
                            <span style={{ 
                                textDecoration: p.isBought ? 'line-through' : 'none',
                                color: p.isBought ? '#aaa' : 'inherit'
                            }}>
                                {p.name} (x{p.quantity}) - {p.category}
                            </span>
                            
                            {p.price && (
                                <span className="price-tag">
                                    | {(p.price * p.quantity).toFixed(2)} zł
                                </span>
                            )}
                        </div>

                        <button 
                            className="remove-btn"
                            onClick={() => onRemoveProduct(list.id, p.id)}
                            title="Usuń produkt"
                        >✕</button>
                    </li>
                ))}
                {list.products.length === 0 && <li style={{ justifyContent: 'center', color: '#888' }}><i>Brak produktów na liście</i></li>}
            </ul>

            <AddProductToList 
                availableProducts={availableProducts} 
                onAdd={(pid, qty) => onAddProduct(list.id, pid, qty)} 
            />
        </div>
    );
};
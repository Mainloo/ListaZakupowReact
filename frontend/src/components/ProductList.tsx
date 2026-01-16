import React from 'react';
import { Product } from '../types';
import { Button } from './common/Button';

interface Props {
    products: Product[];
    onDelete: (id: number) => void;
    onEdit: (product: Product) => void;
}

export const ProductList: React.FC<Props> = ({ products, onDelete, onEdit }) => {
    if (products.length === 0) {
        return <p style={{ textAlign: 'center', marginTop: '20px', color: '#666' }}>Brak produktów w bazie</p>;
    }

    return (
        <table className="products-table">
            <thead>
                <tr>
                    <th>Nazwa</th>
                    <th>Kategoria</th>
                    <th>Cena</th>
                    <th>Akcje</th>
                </tr>
            </thead>
            <tbody>
                {products.map(product => (
                    <tr key={product.id}>
                        <td>{product.name}</td>
                        <td>{product.category}</td>
                        <td>{product.price ? `${product.price.toFixed(2)} zł` : '-'}</td>
                        <td style={{ width: '150px' }}>
                            <Button variant="secondary" onClick={() => onEdit(product)} style={{ marginRight: '5px' }}>Edytuj</Button>
                            <Button variant="danger" onClick={() => onDelete(product.id)}>Usuń</Button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

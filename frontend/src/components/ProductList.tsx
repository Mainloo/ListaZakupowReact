import React from 'react';
import { Product } from '../types';

interface Props {
    products: Product[];
    onDelete: (id: number) => void;
}

export const ProductList: React.FC<Props> = ({ products, onDelete }) => {
    if (products.length === 0) {
        return <p>Brak produktów w bazie</p>;
    }

    return (
        <ul>
            {products.map(product => (
                <li key={product.id}>
                    {product.name} ({product.category}) {product.price && `- ${product.price} zł`}
                    <button onClick={() => onDelete(product.id)}>Usuń</button>
                </li>
            ))}
        </ul>
    );
};

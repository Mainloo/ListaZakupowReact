import React from 'react';
import { ShoppingList } from '../types';

interface Props {
    list: ShoppingList;
}

export const ListItem: React.FC<Props> = ({ list }) => {
    return (
        <div className="list-item">
            <strong>{list.name}</strong> (ID: {list.id}) <br/>
            <small>Data: {list.date}</small> <br/>
            <p>{list.notes}</p>
        </div>
    );
};
import React, { useState, ChangeEvent, FormEvent } from 'react';
import { NewListForm } from '../types'; 

import { Button } from './common/Button';

interface Props {
    onAdd: (data: NewListForm) => Promise<void>;
}

export const ListForm: React.FC<Props> = ({ onAdd }) => {
    const [formData, setFormData] = useState<NewListForm>({ name: '', date: '', notes: '' });
    const [error, setError] = useState('');

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setError('');

        if (formData.name.length < 3) {
            setError("Nazwa za krótka (min 3 znaki)");
            return;
        }

        try {
            await onAdd(formData);
            setFormData({ name: '', date: '', notes: '' }); 
        } catch (err: any) {
            setError(err.message);
        }
    };

    return (
        <div className="form-card">
            <h3>Dodaj nową listę</h3>
            {error && <p className="error">{error}</p>}
            
            <form onSubmit={handleSubmit}>
                <div className="form-row">
                    <input 
                        name="name" 
                        value={formData.name} 
                        onChange={handleChange} 
                        placeholder="Nazwa listy"
                        style={{ flex: 2 }} 
                    />
                    <input 
                        name="date" 
                        type="date" 
                        value={formData.date} 
                        onChange={handleChange} 
                    />
                </div>
                <div className="form-row">
                    <input 
                        name="notes" 
                        value={formData.notes} 
                        onChange={handleChange} 
                        placeholder="Notatki (opcjonalnie)" 
                        style={{ flex: 1 }}
                    />
                </div>
                <Button type="submit">Utwórz</Button>
            </form>
        </div>
    );
};
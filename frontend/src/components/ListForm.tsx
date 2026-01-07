import React, { useState, ChangeEvent, FormEvent } from 'react';
import { NewListForm } from '../types'; 

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
        <div style={{ borderBottom: '2px solid #ccc', paddingBottom: '20px' }}>
            <h3>Dodaj nową listę</h3>
            {error && <p className="error">{error}</p>}
            
            <form onSubmit={handleSubmit}>
                <input 
                    name="name" 
                    value={formData.name} 
                    onChange={handleChange} 
                    placeholder="Nazwa listy" 
                />
                <input 
                    name="date" 
                    type="date" 
                    value={formData.date} 
                    onChange={handleChange} 
                />
                <input 
                    name="notes" 
                    value={formData.notes} 
                    onChange={handleChange} 
                    placeholder="Notatki" 
                />
                <button type="submit">Utwórz</button>
            </form>
        </div>
    );
};
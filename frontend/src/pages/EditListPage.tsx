import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchLists, updateList } from '../api/listsApi';
import { ShoppingList } from '../types';
import { Button } from '../components/common/Button';

export const EditListPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [list, setList] = useState<ShoppingList | null>(null);
    const [name, setName] = useState('');
    const [date, setDate] = useState('');
    const [notes, setNotes] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        const loadList = async () => {
            try {
                const lists = await fetchLists();
                const foundList = lists.find(l => l.id === Number(id));
                if (foundList) {
                    setList(foundList);
                    setName(foundList.name);
                    setDate(foundList.date);
                    setNotes(foundList.notes);
                } else {
                    setError('Nie znaleziono listy');
                }
            } catch (err) {
                setError('Błąd pobierania danych');
            }
        };
        if (id) loadList();
    }, [id]);

    const handleSave = async () => {
        if (!list) return;
        try {
            await updateList(list.id, { name, date, notes });
            alert('Zapisano zmiany');
            navigate('/');
        } catch (err) {
            setError('Błąd zapisywania zmian');
        }
    };

    if (error) return <div>{error}</div>;
    if (!list) return <div>Ładowanie...</div>;

    return (
        <div className="form-card">
            <h2>Edycja Listy</h2>
            <div className="form-row">
                <div style={{ flex: 1 }}>
                    <label style={{ display: 'block', marginBottom: '5px' }}>Nazwa:</label>
                    <input 
                        value={name} 
                        onChange={e => setName(e.target.value)} 
                        style={{ width: '100%' }}
                    />
                </div>
            </div>
            <div className="form-row">
                <div>
                    <label style={{ display: 'block', marginBottom: '5px' }}>Data:</label>
                    <input 
                        type="date" 
                        value={date} 
                        onChange={e => setDate(e.target.value)}
                    />
                </div>
            </div>
            <div className="form-row">
                <div style={{ flex: 1 }}>
                    <label style={{ display: 'block', marginBottom: '5px' }}>Notatki:</label>
                    <textarea 
                        value={notes} 
                        onChange={e => setNotes(e.target.value)}
                        style={{ width: '100%', height: '100px' }}
                    />
                </div>
            </div>
            <div style={{ marginTop: '20px' }}>
                <Button onClick={handleSave} style={{ marginRight: '10px' }}>Zapisz</Button>
                <Button variant="secondary" onClick={() => navigate('/')}>Anuluj</Button>
            </div>
        </div>
    );
};

// frontend/src/App.tsx
import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import './App.css';

// --- DEFINICJE TYPÓW (zgodne z dokumentacją) ---
interface Product {
  id: number;
  name: string;
  quantity: number;
  category: string;
  bought: boolean;
  addedAt: string;
  price?: number;
}

interface ShoppingList {
  id: number;
  name: string;
  date: string;
  notes: string;
  createdAt: string;
  products: Product[];
}

interface NewListForm {
  name: string;
  date: string;
  notes: string;
}

function App() {
  // Stan typowany generycznie <ShoppingList[]>
  const [lists, setLists] = useState<ShoppingList[]>([]);
  
  // Stan formularza
  const [formData, setFormData] = useState<NewListForm>({
    name: '',
    date: '',
    notes: ''
  });

  const [error, setError] = useState<string>('');

  // 1. POBIERANIE (Typowanie Response)
  useEffect(() => {
    const fetchLists = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/lists');
        const data: ShoppingList[] = await res.json();
        setLists(data);
      } catch (err) {
        console.error("Błąd:", err);
      }
    };
    fetchLists();
  }, []);

  // Obsługa zmian w inputach (Typowanie zdarzenia ChangeEvent)
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // 2. WYSYŁANIE (Typowanie zdarzenia FormEvent)
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');

    // Walidacja front-end
    if (formData.name.length < 3) {
      setError("Nazwa za krótka (min 3 znaki)");
      return;
    }

    try {
      const res = await fetch('http://localhost:5000/api/lists', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.error || "Błąd serwera");
      }

      const createdList: ShoppingList = await res.json();
      
      setLists(prev => [...prev, createdList]);
      setFormData({ name: '', date: '', notes: '' }); // Reset
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <div className="App">
      <h1>🛒 Planer Zakupów (TS)</h1>

      {/* FORMULARZ */}
      <div style={{ borderBottom: '2px solid #ccc', paddingBottom: '20px' }}>
        <h3>Dodaj nową listę</h3>
        {error && <p className="error">{error}</p>}
        
        <form onSubmit={handleSubmit}>
          <input 
            type="text" 
            name="name"
            placeholder="Nazwa listy (np. Impreza)" 
            value={formData.name}
            onChange={handleChange}
          />
          <input 
            type="date" 
            name="date"
            value={formData.date}
            onChange={handleChange}
          />
          <input 
            type="text" 
            name="notes"
            placeholder="Notatki (opcjonalne)" 
            value={formData.notes}
            onChange={handleChange}
          />
          <button type="submit">Utwórz Listę</button>
        </form>
      </div>

      {/* LISTA */}
      <div>
        <h3>Twoje Listy:</h3>
        {lists.map((list) => (
          <div key={list.id} className="list-item">
            <strong>{list.name}</strong> (ID: {list.id}) <br/>
            <small>Data planowana: {list.date}</small> <br/>
            <small>Utworzono: {list.createdAt}</small>
            <p>{list.notes}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
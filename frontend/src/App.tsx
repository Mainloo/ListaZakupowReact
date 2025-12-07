import React, { useState, useEffect } from 'react';
import './App.css';

import { ShoppingList, NewListForm } from './types';
import { fetchLists, createList } from './api/listsApi';
import { ListForm } from './components/ListForm';
import { ListItem } from './components/ListItem';

function App() {
  const [lists, setLists] = useState<ShoppingList[]>([]);
  const [globalError, setGlobalError] = useState<string>('');


  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const data = await fetchLists();
      setLists(data);
    } catch (err) {
      setGlobalError('Nie udało się pobrać list z serwera.');
    }
  };

  const handleAddList = async (formData: NewListForm) => {
    // API call
    const newList = await createList(formData);
    // Aktualizacja stanu
    setLists(prev => [...prev, newList]);
  };

  return (
    <div className="App">
      <h1>🛒 Planer Zakupów (Modularny)</h1>
      
      {globalError && <p className="error" style={{textAlign:'center'}}>{globalError}</p>}
      <ListForm onAdd={handleAddList} />

      <div>
        <h3>Twoje Listy:</h3>
        {lists.map((list) => (
          <ListItem key={list.id} list={list} />
        ))}
      </div>
    </div>
  );
}

export default App;
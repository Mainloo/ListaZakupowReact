import React, { useState, useEffect } from 'react';
import './App.css';

import { ShoppingList, NewListForm } from './types';
import { fetchLists, createList } from './api/listsApi';
import { ListForm } from './components/ListForm';
import { ListItem } from './components/ListItem';
import { ProductsPage } from './pages/ProductsPage';

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
      <h1>Planer Zakupów</h1>
      
      {globalError && <p className="error" style={{textAlign:'center'}}>{globalError}</p>}
      
      <section style={{ borderBottom: '3px solid #ddd', paddingBottom: '30px' }}>
        <ProductsPage />
      </section>

     <section style={{ marginTop: '30px' }}>
      <h2>Listy zakupów</h2>

      <ListForm onAdd={handleAddList} />

      <div>
        <h3>Twoje Listy:</h3>
        {lists.map(list => (
          <ListItem key={list.id} list={list} />
        ))}
      </div>
    </section>
    </div>
  );
}

export default App;
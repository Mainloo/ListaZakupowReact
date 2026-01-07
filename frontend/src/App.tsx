import React, { useState, useEffect } from 'react';
import './App.css';

import { ShoppingList, NewListForm, Product } from './types';
import { fetchLists, createList, addProductToList, toggleProductStatus, removeList, removeProductFromList } from './api/listsApi'; 
import { getProducts } from './api/productsApi';

import { ListForm } from './components/ListForm';
import { ListItem } from './components/ListItem';
import { ProductsPage } from './pages/ProductsPage';

function App() {
  const [lists, setLists] = useState<ShoppingList[]>([]);
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [globalError, setGlobalError] = useState<string>('');

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [listsData, productsData] = await Promise.all([
        fetchLists(),
        getProducts()
      ]);
      setLists(listsData);
      setAllProducts(productsData);
    } catch (err) {
      setGlobalError('Nie udało się pobrać danych.');
    }
  };

  const refreshProducts = async () => {
      const data = await getProducts();
      setAllProducts(data);
  };

  const handleAddList = async (formData: NewListForm) => {
    const newList = await createList(formData);
    setLists(prev => [...prev, newList]);
  };

const handleAddProductToList = async (listId: number, productId: number, quantity: number) => {
      try {
          const updatedList = await addProductToList(listId, productId, quantity);
          setLists(prev => prev.map(l => l.id === listId ? updatedList : l));
      } catch (err) {
          alert('Błąd dodawania produktu');
      }
  };

  const handleToggleProduct = async (listId: number, productId: number) => {
      try {
        
          const updatedList = await toggleProductStatus(listId, productId);
          setLists(prev => prev.map(l => l.id === listId ? updatedList : l));
      } catch (err) {
          console.error(err);
      }
  };
  const handleRemoveList = async (id: number) => {
      if (!window.confirm("Czy na pewno chcesz usunąć tę listę?")) return;
      try {
          await removeList(id); 

          setLists(prev => prev.filter(list => list.id !== id));
      } catch (err) {
          alert('Błąd podczas usuwania listy');
      }
  };


 const handleRemoveProductFromList = async (listId: number, productId: number) => {
      const currentList = lists.find(l => l.id === listId);
      const productToDelete = currentList?.products.find(p => p.id === productId);

      if (!productToDelete) return;

      if (!window.confirm(`Czy na pewno chcesz usunąć ${productToDelete.name}?`)) return;

      try {
          await removeProductFromList(listId, productId);
          setLists(prevLists => prevLists.map(list => {
              if (list.id === listId) {
                  return {
                      ...list,
                      products: list.products.filter(p => p.id !== productId)
                  };
              }
              return list;
          }));
      } catch (err) {
          console.error(err);
          alert('Nie udało się usunąć produktu.');
      }
  };
  return (
    <div className="App">
      <h1>Planer Zakupów</h1>
      {globalError && <p className="error">{globalError}</p>}
      
      <section style={{ borderBottom: '3px solid #ddd', paddingBottom: '30px' }}>
        <button onClick={refreshProducts}>Odśwież bazę produktów</button>
        <ProductsPage />
      </section>

      <section style={{ marginTop: '30px' }}>
        <h2>Listy zakupów</h2>
        <ListForm onAdd={handleAddList} />

        <div>
          <h3>Twoje Listy:</h3>
          {lists.map(list => (
            <ListItem
                key={list.id} 
                list={list}
                availableProducts={allProducts}
                onAddProduct={handleAddProductToList}
                onToggleProduct={handleToggleProduct}
                onRemove={handleRemoveList}
                onRemoveProduct={handleRemoveProductFromList}
            />
          ))}
        </div>
      </section>
    </div>
  );
}

export default App;
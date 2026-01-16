import React, { useState, useEffect, useCallback } from 'react';
import { ShoppingList, NewListForm, Product } from '../types';
import { 
  fetchLists, 
  createList, 
  addProductToList, 
  toggleProductStatus, 
  removeList, 
  removeProductFromList 
} from '../api/listsApi';
import { getProducts } from '../api/productsApi';

import { ListForm } from '../components/ListForm';
import { ListItem } from '../components/ListItem';

export const ListsPage: React.FC = () => {
  const [lists, setLists] = useState<ShoppingList[]>([]);
  const [availableProducts, setAvailableProducts] = useState<Product[]>([]);
  const [error, setError] = useState<string>('');
  const [sortBy, setSortBy] = useState<string>('date');
  const [order, setOrder] = useState<string>('desc');

  const loadData = useCallback(async () => {
    try {
      const [listsData, productsData] = await Promise.all([
        fetchLists(sortBy, order),
        getProducts()
      ]);
      setLists(listsData);
      setAvailableProducts(productsData);
    } catch (err) {
      setError('Nie udało się pobrać danych list zakupów.');
    }
  }, [sortBy, order]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const handleAddList = async (formData: NewListForm) => {
    try {
      await createList(formData);
      loadData();
      setError('');
    } catch (err) {
      setError('Błąd podczas tworzenia listy');
    }
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
    <div>
      <h2>Listy zakupów</h2>
      
      {error && <p className="error">{error}</p>}

      <ListForm onAdd={handleAddList} />

      <div style={{ marginTop: '30px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
            <h3 style={{ margin: 0 }}>Twoje Listy:</h3>
            <div className="sort-controls">
                <label>Sortuj wg: </label>
                <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                    <option value="date">Daty</option>
                    <option value="name">Nazwy</option>
                </select>
                <select value={order} onChange={(e) => setOrder(e.target.value)} style={{ marginLeft: '10px' }}>
                    <option value="asc">Rosnąco</option>
                    <option value="desc">Malejąco</option>
                </select>
            </div>
        </div>
        {lists.map(list => (
          <ListItem
            key={list.id}
            list={list}
            availableProducts={availableProducts}
            onAddProduct={handleAddProductToList}
            onToggleProduct={handleToggleProduct}
            onRemove={handleRemoveList}
            onRemoveProduct={handleRemoveProductFromList}
          />
        ))}
      </div>
    </div>
  );
};
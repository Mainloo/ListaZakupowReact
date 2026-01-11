import React from 'react';
import './App.css';

// Importujemy nasze dwie główne strony
import { ProductsPage } from './pages/ProductsPage';
import { ListsPage } from './pages/ListsPage';

function App() {
  return (
    <div className="App">
      <h1>Planer Zakupów</h1>
      
      {/* Sekcja zarządzania bazą produktów */}
      <section style={{ borderBottom: '3px solid #ddd', paddingBottom: '30px' }}>
        <ProductsPage />
      </section>

      {/* Sekcja zarządzania listami zakupów */}
      <section style={{ marginTop: '30px' }}>
        <ListsPage />
      </section>
    </div>
  );
}

export default App;
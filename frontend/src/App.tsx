import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';

import { ProductsPage } from './pages/ProductsPage';
import { ListsPage } from './pages/ListsPage';
import { EditListPage } from './pages/EditListPage';

function App() {
  return (
    <Router>
      <div className="App">
        <nav style={{ padding: '20px', backgroundColor: '#f8f9fa', marginBottom: '20px', borderBottom: '1px solid #ddd' }}>
          <Link to="/" style={{ margin: '0 15px', textDecoration: 'none', color: '#333', fontWeight: 'bold' }}>Listy Zakupów</Link>
          <Link to="/products" style={{ margin: '0 15px', textDecoration: 'none', color: '#333', fontWeight: 'bold' }}>Baza Produktów</Link>
        </nav>

        <div className="container" style={{ padding: '0 20px' }}>
          <Routes>
            <Route path="/" element={<ListsPage />} />
            <Route path="/products" element={<ProductsPage />} />
            <Route path="/list/:id" element={<EditListPage />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
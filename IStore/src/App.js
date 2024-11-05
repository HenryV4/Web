import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Pages/Home.js';
import CatalogPage from './Pages/CatalogPage.js';
import BankDetails from './Pages/BankDetails.js';
import { BanksProvider } from '../src/data/BanksContext.js';
import './App.css';
import '@fortawesome/fontawesome-free/css/all.min.css';

function App() {
  return (
    <Router>
      <div className="App">
        <BanksProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/catalog" element={<CatalogPage />} />
          <Route path="/bank/:id" element={<BankDetails />} />
        </Routes>
        </BanksProvider>
      </div>
    </Router>
  );
}

export default App;

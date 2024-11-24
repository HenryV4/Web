import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Pages/Home.js';
import CatalogPage from './Pages/CatalogPage.js';
import BankDetails from './Pages/BankDetails.js';
import CartPage from './Pages/CartPage.js';
import LoadingSpinner from '../src/components/common/Loading/LoadingSpinner.js';
import CheckoutPage from './Pages/CheckoutPage.js';
import SuccessPage from './Pages/SuccessPage.js'
import './App.css';
import '@fortawesome/fontawesome-free/css/all.min.css';

function App() {
  const [backendReady, setBackendReady] = useState(false);
  const [backendError, setBackendError] = useState(false);

  useEffect(() => {
      // Check the health of the backend
      const checkBackendHealth = async () => {
          try {
              await axios.get('http://localhost:5000/api/health');
              setBackendReady(true);
          } catch (error) {
              console.error("Backend health check failed:", error);
              setBackendError(true);
          }
      };
      checkBackendHealth();
  }, []);

  if (!backendReady && !backendError) {
      return <LoadingSpinner />;
  }

  if (backendError) {
      return <div>Error: Backend is currently unavailable. Please try again later.</div>;
  }

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/catalog" element={<CatalogPage />} />
          <Route path="/bank/:id" element={<BankDetails />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/success" element={<SuccessPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

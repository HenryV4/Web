// src/components/cart/CartActions.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './CartActions.css';

function CartActions() {
  const navigate = useNavigate();

  return (
    <div className="cart-actions">
      <button onClick={() => navigate('/catalog')} className="back-button">
        Back to Catalog
      </button>
      <button onClick={() => navigate('/checkout')} className="continue-button">
        Continue
      </button>
    </div>
  );
}

export default CartActions;

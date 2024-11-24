import React from 'react';
import './CartActions.css';

function CartActions({ onProceedToCheckout }) {
  return (
    <div className="cart-actions">
      <button onClick={() => window.location.href = '/catalog'} className="back-button">
        Back to Catalog
      </button>
      <button onClick={onProceedToCheckout} className="continue-button">
        Continue
      </button>
    </div>
  );
}

export default CartActions;

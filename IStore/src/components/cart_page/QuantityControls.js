// src/components/cart_page/QuantityControls.js
import React from 'react';
import './QuantityControls.css';

function QuantityControls({ itemId, quantity, onQuantityChange }) {
    return (
        <div className="quantity-controls">
            <button onClick={() => onQuantityChange(quantity - 1)}>-</button>
            <span>{quantity}</span>
            <button onClick={() => onQuantityChange(quantity + 1)}>+</button>
        </div>
    );
}

export default QuantityControls;
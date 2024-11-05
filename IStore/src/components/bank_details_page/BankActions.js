// src/components/BankDetails/BankActions.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './BankActions.css';

function BankActions() {
    const navigate = useNavigate();

    return (
        <div className="bank-actions">
            <button onClick={() => navigate('/catalog')} className="action-button">Go back</button>
            <button className="action-button add-to-cart-button">Add to cart</button>
        </div>
    );
}

export default BankActions;

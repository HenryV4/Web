// src/components/cart_page/CartSummary.js
import React from 'react';
import './CartSummary.css';

function parsePrice(price) {
    // Check if price is a string and parse it
    if (typeof price === 'string') {
        const numericPart = parseFloat(price.replace(/[^0-9.]/g, '')); // Extract numeric part
        const multiplier = price.includes('b') ? 1e9 : price.includes('m') ? 1e6 : 1; // Handle 'b' for billion, 'm' for million
        return numericPart * multiplier;
    }
    return price; // If it's already a number, return as-is
}

function CartSummary({ cartItems }) {
    const totalAmount = cartItems.reduce((total, item) => {
        const price = parsePrice(item.price) || 0; // Parse and handle missing prices
        const quantity = item.quantity || 1; // Default to 1 if quantity is missing
        return total + price * quantity;
    }, 0);

    return (
        <div className="cart-summary">
            <div className="total-amount">
                Total amount: <strong>${(totalAmount / 1e6).toFixed(2)}m</strong>
            </div>
        </div>
    );
}

export default CartSummary;

import React from 'react';
import './BankActions.css';

function BankActions({ handleAddToCart }) {
    const handleFlyToCart = () => {
        // Locate the 'Add to Cart' button and cart icon
        const button = document.querySelector('.add-to-cart-button');
        const cartIcon = document.querySelector('.cart-icon'); // Ensure your cart icon has this class in the nav

        if (!button || !cartIcon) return;

        // Get button and cart positions
        const buttonRect = button.getBoundingClientRect();
        const cartRect = cartIcon.getBoundingClientRect();

        // Calculate the distance to move
        const translateX = cartRect.left - buttonRect.left;
        const translateY = cartRect.top - buttonRect.top;

        // Create a clone of the button for the flying effect
        const flyElement = document.createElement('div');
        flyElement.className = 'fly-to-cart';
        document.body.appendChild(flyElement);

        // Set the initial position of the fly element
        flyElement.style.left = `${buttonRect.left}px`;
        flyElement.style.top = `${buttonRect.top}px`;

        // Apply CSS variables for the animation distance
        flyElement.style.setProperty('--cart-x', `${translateX}px`);
        flyElement.style.setProperty('--cart-y', `${translateY}px`);

        // Start the animation
        flyElement.style.animation = 'flyToCart 0.7s forwards';

        // Clean up the element after the animation ends
        flyElement.addEventListener('animationend', () => {
            document.body.removeChild(flyElement);
        });

        // Call any other add-to-cart logic
        handleAddToCart();
    };

    return (
        <div className="bank-actions">
            <button onClick={() => window.history.back()} className="action-button">
                Go back
            </button>
            <button onClick={handleFlyToCart} className="action-button add-to-cart-button">
                Add to Cart
            </button>
        </div>
    );
}

export default BankActions;

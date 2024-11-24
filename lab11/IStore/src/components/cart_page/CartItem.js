
// import React, { useState, useEffect } from 'react';
// import QuantityControls from './QuantityControls';
// import './CartItem.css';

// function CartItem({ item, onQuantityChange, onRemoveFromCart }) {
//     const [quantity, setQuantity] = useState(item.quantity); // Local state for quantity
//     const [totalPrice, setTotalPrice] = useState(item.price); // Local state for total price

//     // Whenever item.quantity or item.variant changes, update local state
//     useEffect(() => {
//         setQuantity(item.quantity);
//     }, [item.quantity]);

//     useEffect(() => {
//         // Function to parse and calculate price based on variant
//         const calculatePrice = (basePrice, variant) => {
//             let numericPrice = 0;

//             // Remove any `$` symbol and whitespace
//             if (typeof basePrice === 'string') {
//                 const cleanedPrice = basePrice.replace('$', '').trim();

//                 // Check if price contains "m" or "b" and handle accordingly
//                 if (cleanedPrice.toLowerCase().includes('m')) {
//                     numericPrice = parseFloat(cleanedPrice) * 1_000_000; // Convert "m" to million
//                 } else if (cleanedPrice.toLowerCase().includes('b')) {
//                     numericPrice = parseFloat(cleanedPrice) * 1_000_000_000; // Convert "b" to billion
//                 } else {
//                     numericPrice = parseFloat(cleanedPrice); // Regular numeric string
//                 }
//             } else if (typeof basePrice === 'number') {
//                 numericPrice = basePrice; // Already a number
//             }

//             // Additional check for invalid number
//             if (isNaN(numericPrice) || numericPrice === 0) {
//                 console.error('Invalid base price or price is zero after cleaning:', basePrice);
//                 return 0; // Default to 0 if the price is invalid
//             }

//             // Apply variant multiplier
//             if (variant === 'Premium') {
//                 return numericPrice * 1.3; // 30% more expensive
//             } else if (variant === 'Deluxe') {
//                 return numericPrice * 1.7; // 70% more expensive
//             } else {
//                 return numericPrice; // Standard price
//             }
//         };

//         // Function to format price into a readable format with "M" or "B"
//         const formatPrice = (price) => {
//             if (price >= 1_000_000_000) {
//                 return `$${(price / 1_000_000_000).toFixed(2)}B`; // Format in billions
//             } else if (price >= 1_000_000) {
//                 return `$${(price / 1_000_000).toFixed(2)}M`; // Format in millions
//             } else {
//                 return `$${price.toFixed(2)}`; // Format as regular currency
//             }
//         };

//         // Calculate unit price based on variant
//         const unitPrice = calculatePrice(item.price, item.variant);

//         // Calculate total price (unit price * quantity)
//         const totalItemPrice = unitPrice * quantity;

//         // Format and update total price
//         setTotalPrice(formatPrice(totalItemPrice));
//     }, [item.variant, item.price, quantity]);

//     // Handle quantity change
//     const handleQuantityChange = (newQuantity) => {
//         if (newQuantity < 1) {
//             onRemoveFromCart(item.cart_id); // Use cart_id for removal
//             return;
//         }

//         setQuantity(newQuantity); // Update local state
//         onQuantityChange(item.cart_id, newQuantity); // Update Redux or Backend
//     };

//     return (
//         <div className="cart-item">
//             <img
//                 src={`http://localhost:5000${item.imageSrc}`}
//                 alt={item.name}
//                 className="cart-item-image"
//             />
//             <h3>{item.name}</h3>
//             <div className="center">
//                 <h3>Quantity</h3>
//                 <QuantityControls
//                     itemId={item.cart_id} // Pass cart_id to uniquely identify item in the cart
//                     quantity={quantity}
//                     onQuantityChange={handleQuantityChange} // Update the quantity
//                 />
//             </div>
//             <div className="right-text">
//                 <p>{`Variant: ${item.variant}`}</p> {/* Show the selected variant */}
//                 <p>{`Total Price: ${totalPrice}`}</p> {/* Show the total price based on the variant */}
//             </div>
//         </div>
//     );
// }

// export default CartItem;

import React, { useState, useEffect } from 'react';
import QuantityControls from './QuantityControls';
import './CartItem.css';

function CartItem({ item, onQuantityChange, onRemoveFromCart }) {
    const [quantity, setQuantity] = useState(item.quantity); // Local state for quantity
    const [totalPrice, setTotalPrice] = useState(item.price); // Local state for total price
    const [error, setError] = useState(''); // State for error message

    // Whenever item.quantity or item.variant changes, update local state
    useEffect(() => {
        setQuantity(item.quantity);
    }, [item.quantity]);

    useEffect(() => {
        // Function to parse and calculate price based on variant
        const calculatePrice = (basePrice, variant) => {
            let numericPrice = 0;

            // Remove any `$` symbol and whitespace
            if (typeof basePrice === 'string') {
                const cleanedPrice = basePrice.replace('$', '').trim();

                // Check if price contains "m" or "b" and handle accordingly
                if (cleanedPrice.toLowerCase().includes('m')) {
                    numericPrice = parseFloat(cleanedPrice) * 1_000_000; // Convert "m" to million
                } else if (cleanedPrice.toLowerCase().includes('b')) {
                    numericPrice = parseFloat(cleanedPrice) * 1_000_000_000; // Convert "b" to billion
                } else {
                    numericPrice = parseFloat(cleanedPrice); // Regular numeric string
                }
            } else if (typeof basePrice === 'number') {
                numericPrice = basePrice; // Already a number
            }

            // Additional check for invalid number
            if (isNaN(numericPrice) || numericPrice === 0) {
                console.error('Invalid base price or price is zero after cleaning:', basePrice);
                return 0; // Default to 0 if the price is invalid
            }

            // Apply variant multiplier
            if (variant === 'Premium') {
                return numericPrice * 1.3; // 30% more expensive
            } else if (variant === 'Deluxe') {
                return numericPrice * 1.7; // 70% more expensive
            } else {
                return numericPrice; // Standard price
            }
        };

        // Function to format price into a readable format with "M" or "B"
        const formatPrice = (price) => {
            if (price >= 1_000_000_000) {
                return `$${(price / 1_000_000_000).toFixed(2)}B`; // Format in billions
            } else if (price >= 1_000_000) {
                return `$${(price / 1_000_000).toFixed(2)}M`; // Format in millions
            } else {
                return `$${price.toFixed(2)}`; // Format as regular currency
            }
        };

        // Calculate unit price based on variant
        const unitPrice = calculatePrice(item.price, item.variant);

        // Calculate total price (unit price * quantity)
        const totalItemPrice = unitPrice * quantity;

        // Format and update total price
        setTotalPrice(formatPrice(totalItemPrice));
    }, [item.variant, item.price, quantity]);

    // Handle quantity change
    const handleQuantityChange = (newQuantity) => {
        if (newQuantity > 10) {
            setError('The maximum quantity is 10!'); // Set error message
            return; // Prevent further updates
        }

        setError(''); // Clear the error message if valid

        if (newQuantity < 1) {
            onRemoveFromCart(item.cart_id); // Use cart_id for removal
            return;
        }

        setQuantity(newQuantity); // Update local state
        onQuantityChange(item.cart_id, newQuantity); // Update Redux or Backend
    };

    return (
        <div className="cart-item">
            <img
                src={`http://localhost:5000${item.imageSrc}`}
                alt={item.name}
                className="cart-item-image"
            />
            <h3>{item.name}</h3>
            <div className="center">
                <h3>Quantity</h3>
                <QuantityControls
                    itemId={item.cart_id} // Pass cart_id to uniquely identify item in the cart
                    quantity={quantity}
                    onQuantityChange={handleQuantityChange} // Update the quantity
                />
                {/* Render error message */}
                {error && <p className="error-message">{error}</p>}
            </div>
            <div className="right-text">
                <p>{`Variant: ${item.variant}`}</p> {/* Show the selected variant */}
                <p>{`Total Price: ${totalPrice}`}</p> {/* Show the total price based on the variant */}
            </div>
        </div>
    );
}

export default CartItem;

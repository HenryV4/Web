import React, { useState, useEffect } from 'react';
import CartItem from '../components/cart_page/CartItem';
import CartSummary from '../components/cart_page/CartSummary';
// import Header from '../components/common/header/header';
import Footer from '../components/common/footer/footer';
import CartActions from '../components/cart_page/CartActions';
import LoadingSpinner from '../components/common/Loading/LoadingSpinner';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function CartPage() {
    const [cartItems, setCartItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [cartError, setCartError] = useState(''); // For empty cart checkout error
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCartItems = async () => {
            const token = localStorage.getItem('token');
            if (!token) {
                setError('Please log in to view your cart.');
                setLoading(false);
                return;
            }

            try {
                const response = await axios.get('http://localhost:5000/api/cart', {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setCartItems(response.data);
                setError(null);
            } catch (err) {
                console.error('Error fetching cart items:', err);
                setError('Failed to fetch cart items.');
            } finally {
                setLoading(false);
            }
        };
        fetchCartItems();
    }, []);

    const handleQuantityChange = async (cartId, newQuantity) => {
        const token = localStorage.getItem('token');
        if (!token) {
            setError('Please log in to update the cart.');
            return;
        }

        try {
            await axios.put(
                `http://localhost:5000/api/cart/${cartId}`,
                { quantity: newQuantity },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            setCartItems((prevItems) =>
                prevItems.map((item) =>
                    item.cart_id === cartId ? { ...item, quantity: newQuantity } : item
                )
            );
            setError(null);
        } catch (err) {
            console.error('Error updating cart quantity:', err);
            setError('Failed to update cart quantity.');
        }
    };

    const handleRemoveFromCart = async (cartId) => {
        const token = localStorage.getItem('token');
        if (!token) {
            setError('Please log in to remove items from your cart.');
            return;
        }

        try {
            await axios.delete(`http://localhost:5000/api/cart/${cartId}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setCartItems((prevItems) => prevItems.filter((item) => item.cart_id !== cartId));
            setError(null);
        } catch (err) {
            console.error('Error removing cart item:', err);
            setError('Failed to remove item from cart.');
        }
    };

    const handleProceedToCheckout = () => {
        if (cartItems.length === 0) {
            setCartError('Your cart is empty. Please add items before proceeding to checkout.');
        } else {
            navigate('/checkout');
        }
    };

    if (loading) {
        return (
            <>
                {/* <Header /> */}
                <LoadingSpinner />
                <Footer />
            </>
        );
    }

    if (error) {
        return (
            <>
                {/* <Header /> */}
                <div className="AppContainer">
                    <p className="error-message">{error}</p>
                </div>
                <Footer />
            </>
        );
    }

    return (
        <>
            {/* <Header /> */}
            <div className="AppContainer">
                <h1>Shopping Cart</h1>
                {/* Show error message for empty cart checkout */}
                {cartError && <div className="error-box">{cartError}</div>}
                {cartItems.length === 0 ? (
                    <p>Your cart is empty.</p>
                ) : (
                    <>
                        {cartItems.map((item) => (
                            <CartItem
                                key={item.cart_id}
                                item={item}
                                onQuantityChange={handleQuantityChange}
                                onRemoveFromCart={handleRemoveFromCart}
                            />
                        ))}
                        <CartSummary cartItems={cartItems} />
                    </>
                )}
                <CartActions onProceedToCheckout={handleProceedToCheckout} />
            </div>
            <Footer />
        </>
    );
}

export default CartPage;

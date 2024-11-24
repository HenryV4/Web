import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import CartItem from '../components/cart_page/CartItem';
import CartSummary from '../components/cart_page/CartSummary';
import Header from '../components/common/header/header';
import Footer from '../components/common/footer/footer';
import CartActions from '../components/cart_page/CartActions';
import LoadingSpinner from '../components/common/Loading/LoadingSpinner'; // Import Loading Spinner
import { fetchCartItems, updateCartQuantity, removeFromCart } from '../redux/actions';

function CartPage() {
    const cartItems = useSelector(state => state.cartItems);
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(true);  // State to handle loading

    useEffect(() => {
        setLoading(true);
        // Adding a delay to simulate loading
        const fetchWithDelay = async () => {
            try {
                await dispatch(fetchCartItems());  // Fetch cart items from the Redux store
                setTimeout(() => {
                    setLoading(false);  // Set loading to false after the delay
                }); // Add a delay of 500ms for better UX
            } catch (error) {
                console.error("Error fetching cart items:", error);
                setLoading(false);  // Handle error and stop loading
            }
        };

        fetchWithDelay();
    }, [dispatch]);

    const handleQuantityChange = (itemId, newQuantity) => {
        dispatch(updateCartQuantity(itemId, newQuantity));  // Dispatch action to update quantity
    };

    const handleRemoveFromCart = (itemId) => {
        dispatch(removeFromCart(itemId));  // Dispatch action to remove item from cart
    };

    return (
        <>
            <Header />
            <div className="AppContainer">
                <h1>Shopping Cart</h1>
                {loading ? (
                    <LoadingSpinner />  // Show loading spinner while data is being fetched
                ) : cartItems.length === 0 ? (
                    <p>Your cart is empty.</p>
                ) : (
                    <div className="cart-items">
                        {cartItems.map(item => (
                            <CartItem
                                key={item.cart_id}  // Use cart_id for unique key
                                item={item}
                                onQuantityChange={handleQuantityChange} // Pass quantity change handler
                                onRemoveFromCart={handleRemoveFromCart} // Pass remove handler
                            />
                        ))}
                    </div>
                )}
                {cartItems.length > 0 && <CartSummary cartItems={cartItems} />}
                <CartActions />
            </div>
            <Footer />
        </>
    );
}

export default CartPage;

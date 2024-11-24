import axios from 'axios';

// Base URL
const BASE_URL = 'http://localhost:5000/api';

// Action Types
export const FETCH_CART_ITEMS = 'FETCH_CART_ITEMS';
export const ADD_TO_CART = 'ADD_TO_CART';
export const REMOVE_FROM_CART = 'REMOVE_FROM_CART';
export const UPDATE_CART_QUANTITY = 'UPDATE_CART_QUANTITY';

// Action Creators
export const fetchCartItems = (token) => async (dispatch) => {
    try {
        const response = await axios.get('http://localhost:5000/api/cart', {
            headers: { Authorization: token }, // Pass the token
        });

        dispatch({
            type: FETCH_CART_ITEMS,
            payload: response.data,
        });
    } catch (error) {
        console.error('Error fetching cart items:', error);
        throw error;
    }
};

export const addToCart = (item) => async (dispatch, getState) => {
    try {
        const state = getState();
        const cartItems = state.cart.cartItems;

        // Check if the item with the same ID and variant exists in the cart
        const existingItem = cartItems.find(
            (cartItem) => cartItem.id === item.id && cartItem.variant === item.variant
        );

        if (existingItem) {
            const newQuantity = existingItem.quantity + item.quantity;

            // Enforce maximum quantity limit
            if (newQuantity > 10) {
                alert('The maximum quantity is 10!');
                return; // Prevent adding the item
            }
        }

        // Send the item to the backend
        const response = await axios.post(`${BASE_URL}/cart`, item);

        console.log('Backend response:', response.data); // Debugging log

        // Refresh the cart items after adding
        dispatch(fetchCartItems());
    } catch (error) {
        console.error('Error adding item to cart:', error);

        // Display backend error message (e.g., maximum quantity)
        if (error.response && error.response.data.error) {
            alert(error.response.data.error);
        }
    }
};

export const removeFromCart = (cartId, token) => async (dispatch) => {
    try {
        await axios.delete(`http://localhost:5000/api/cart/${cartId}`, {
            headers: { Authorization: token }, // Pass the token
        });

        // Dispatch an action to update state if needed
    } catch (error) {
        console.error('Error removing item from cart:', error);
        throw error;
    }
};

export const updateCartQuantity = (cartId, newQuantity, token) => async (dispatch) => {
    try {
        await axios.put(
            `http://localhost:5000/api/cart/${cartId}`,
            { quantity: newQuantity },
            { headers: { Authorization: token } } // Pass the token
        );

        // Dispatch an action to update state if needed
    } catch (error) {
        console.error('Error updating cart quantity:', error);
        throw error;
    }
};

// src/redux/reducer.js

import {
    FETCH_CART_ITEMS,
    ADD_TO_CART,
} from './actions';

const initialState = {
    cartItems: [],
};

const cartReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_CART_ITEMS:
            return {
                ...state,
                cartItems: action.payload,
            };
        case ADD_TO_CART:
            return {
                ...state,
                cartItems: [...state.cartItems, action.payload], // Add the new item with quantity and variation
            };
        default:
            return state;
    }
};


export default cartReducer;

import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import BankInfo from '../components/bank_details_page/BankInfo';
import BankActions from '../components/bank_details_page/BankActions';
import Header from '../components/common/header/header';
import Footer from '../components/common/footer/footer';
import LoadingSpinner from '../components/common/Loading/LoadingSpinner';
import axios from 'axios'; // Import axios for API calls
import '../App.css';

function BankDetails() {
    const { id } = useParams(); // Get bank ID from URL params
    const [bank, setBank] = useState(null); // State to store bank details
    const [loading, setLoading] = useState(true); // State to manage loading state
    const [quantity, setQuantity] = useState(1); // State for quantity input
    const [variation, setVariation] = useState("Standard"); // State for selected variant
    const [cartItems, setCartItems] = useState([]); // State to manage cart items

    // Fetch bank details when the page loads
    useEffect(() => {
        const fetchBank = async () => {
            try {
                setLoading(true);
                const response = await axios.get(`http://localhost:5000/api/banks/${id}`);
                setBank(response.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching bank details:', error);
                setLoading(false);
            }
        };
        fetchBank();
    }, [id]);

    // Fetch current cart items when the page loads
    useEffect(() => {
        const fetchCartItems = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/cart');
                setCartItems(response.data); // Save cart items in state
            } catch (error) {
                console.error('Error fetching cart items:', error);
            }
        };

        fetchCartItems();
    }, []);

    // If data is still loading, show the loading spinner
    if (loading) {
        return (
            <>
                <Header />
                <LoadingSpinner />
                <Footer />
            </>
        );
    }

    // If no bank found, display an error message
    if (!bank) {
        return <div>Bank not found.</div>;
    }

    // Handle adding to the cart
    const handleAddToCart = async () => {
        if (!bank) {
            console.error('Bank data is missing');
            return;
        }

        // Check if item with the same `id` and `variant` exists in the cart
        const existingItem = cartItems.find(
            (item) => item.id === bank.id && item.variant === variation
        );

        if (existingItem) {
            const updatedQuantity = existingItem.quantity + quantity;

            // Prevent exceeding the maximum quantity of 10
            if (updatedQuantity > 10) {
                alert('The maximum quantity is 10!');
                return;
            }

            try {
                await axios.put(
                    `http://localhost:5000/api/cart/${existingItem.cart_id}`,
                    { quantity: updatedQuantity }
                );

                // Update the cart items state locally
                setCartItems(
                    cartItems.map((item) =>
                        item.cart_id === existingItem.cart_id
                            ? { ...item, quantity: updatedQuantity }
                            : item
                    )
                );
            } catch (error) {
                console.error('Error updating cart item:', error);
            }
        } else {
            if (quantity > 10) {
                alert('The maximum quantity is 10!');
                return;
            }

            const cartData = {
                id: bank.id,
                name: bank.title,
                price: bank.price,
                imageSrc: bank.imageSrc,
                quantity: quantity,
                variant: variation,
            };

            try {
                const response = await axios.post(
                    'http://localhost:5000/api/cart',
                    cartData
                );

                setCartItems([
                    ...cartItems,
                    { ...cartData, cart_id: response.data.id },
                ]);
            } catch (error) {
                console.error('Error adding item to cart:', error);
            }
        }
    };

    // Handle quantity changes from BankFields
    const handleQuantityChange = (newQuantity) => {
        if (newQuantity > 10) {
            alert('The maximum quantity is 10!');
            setQuantity(10);
        } else if (newQuantity < 1 || isNaN(newQuantity)) {
            setQuantity(1); // Minimum quantity is 1
        } else {
            setQuantity(newQuantity);
        }
    };


    // Handle variation changes
    const handleVariationChange = (newVariation) => {
        setVariation(newVariation); // Update the variation
    };

    return (
        <>
            <Header />
            <div className="AppContainer">
                <BankInfo
                    imageSrc={`http://localhost:5000${bank.imageSrc}`}
                    imageAlt={bank.imageAlt}
                    title={bank.title}
                    description={bank.description}
                    type={bank.type}
                    interestRate={bank.interestRate}
                    foundedYear={bank.foundedYear}
                    handleQuantityChange={handleQuantityChange}
                    handleVariationChange={handleVariationChange}
                />
                <p className="item-price">Price: {bank.price}</p>
                <BankActions handleAddToCart={handleAddToCart} />
            </div>
            <Footer />
        </>
    );
}

export default BankDetails;

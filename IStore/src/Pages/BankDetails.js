import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import BankInfo from '../components/bank_details_page/BankInfo';
import BankActions from '../components/bank_details_page/BankActions';
import Header from '../components/common/header/header';
import Footer from '../components/common/footer/footer';
import LoadingSpinner from '../components/common/Loading/LoadingSpinner';
import axios from 'axios';
import '../App.css';

function BankDetails() {
    const { id } = useParams();
    const [bank, setBank] = useState(null);
    const [loading, setLoading] = useState(true);
    const [quantity, setQuantity] = useState(1); // State for managing quantity
    const [variation, setVariation] = useState("Standard"); // State for managing variation
    const [cartItems, setCartItems] = useState([]);
    const [error, setError] = useState(null);

    // Fetch bank details
    useEffect(() => {
        const fetchBank = async () => {
            try {
                setLoading(true);
                const response = await axios.get(`http://localhost:5000/api/banks/${id}`);
                setBank(response.data);
                setError(null);
            } catch (err) {
                console.error('Error fetching bank details:', err);
                setError('Failed to fetch bank details.');
            } finally {
                setLoading(false);
            }
        };
        fetchBank();
    }, [id]);

    // Handle quantity change
    const handleQuantityChange = (newQuantity) => {
        if (newQuantity < 1) {
            alert('Quantity cannot be less than 1.');
            setQuantity(1);
        } else if (newQuantity > 10) {
            alert('The maximum quantity is 10.');
            setQuantity(10);
        } else {
            setQuantity(newQuantity);
        }
    };

    // Handle variation change
    const handleVariationChange = (newVariation) => {
        setVariation(newVariation); // Update variation state
    };

    const handleAddToCart = async () => {
        const token = localStorage.getItem('token');
        if (!token) {
            setError('Please log in to add items to the cart.');
            return;
        }

        const cartData = {
            product_id: bank.id,
            name: bank.title,
            price: bank.price,
            imageSrc: bank.imageSrc,
            quantity,
            variant: variation,
        };

        try {
            const response = await axios.post('http://localhost:5000/api/cart', cartData, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setCartItems([...cartItems, { ...cartData, cart_id: response.data.id }]);
            // alert('Item added to cart successfully!');
        } catch (err) {
            console.error('Error adding item to cart:', err);
            alert('Failed to add item to cart.');
        }
    };

    if (loading) {
        return (
            <>
                <Header />
                <LoadingSpinner />
                <Footer />
            </>
        );
    }

    if (error) {
        return (
            <>
                <Header />
                <div className="AppContainer">
                    <p className="error-message">{error}</p>
                </div>
                <Footer />
            </>
        );
    }

    return (
        <>
            <Header />
            <div className="AppContainer">
                <BankInfo
                    imageSrc={`http://localhost:5000${bank.imageSrc}`}
                    imageAlt={bank.imageAlt || bank.title}
                    title={bank.title}
                    description={bank.description}
                    type={bank.type}
                    interestRate={bank.interestRate}
                    foundedYear={bank.foundedYear}
                    handleQuantityChange={handleQuantityChange} // Pass quantity handler
                    handleVariationChange={handleVariationChange} // Pass variation handler
                />
                <BankActions handleAddToCart={handleAddToCart} />
            </div>
            <Footer />
        </>
    );
}

export default BankDetails;

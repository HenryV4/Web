// src/pages/BankDetails.js
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

    useEffect(() => {
        const fetchBank = async () => {
            try {
                setLoading(true);
                const response = await axios.get(`http://localhost:5000/api/banks/${id}`);
                
                // Artificial delay of 0.5 seconds
                setTimeout(() => {
                    setBank(response.data);
                    setLoading(false);
                }, 500);
                
            } catch (error) {
                console.error("Error fetching bank details:", error);
                setLoading(false);
            }
        };
        fetchBank();
    }, [id]);

    if (loading) {
        return (
            <>
                <Header />
                <LoadingSpinner />
                <Footer />
            </>
    );
    }

    if (!bank) {
        return <div>Bank not found.</div>;
    }

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
                />
                <p className="item-price">Price: {bank.price}</p>
                <BankActions />
            </div>
            <Footer />
        </>
    );
}

export default BankDetails;

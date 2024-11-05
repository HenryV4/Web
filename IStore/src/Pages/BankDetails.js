import React, { useContext } from 'react';
import { useParams } from 'react-router-dom';
import { BanksContext } from '../data/BanksContext';
import BankInfo from '../components/bank_details_page/BankInfo';
import BankActions from '../components/bank_details_page/BankActions';
import '../App.css';
import Header from '../components/common/header/header';
import Footer from '../components/common/footer/footer';

function BankDetails() {
    const { id } = useParams();
    const banks = useContext(BanksContext);
    const bank = banks.find(bank => bank.id === parseInt(id));

    if (!bank) {
        return <div>Bank not found.</div>;
    }

    return (
        <>
        <Header />
        <div className="AppContainer">
            <BankInfo 
                imageSrc={bank.imageSrc} 
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
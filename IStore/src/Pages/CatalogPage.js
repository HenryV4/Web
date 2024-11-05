// src/pages/CatalogPage.js

import React, { useState, useContext } from 'react';
import Header from '../components/common/header/header';
import Footer from '../components/common/footer/footer';
import CatalogItems from '../components/catalog_page/CatalogItems';
import FilterBar from '../components/catalog_page/FilterBar';
import { BanksContext } from '../data/BanksContext'; 
import '../App.css';

function CatalogPage() {
    const banks = useContext(BanksContext);
    const [filters, setFilters] = useState({
        type: '',
        interestRate: '',
        foundedYear: ''
    });
    const [searchTerm, setSearchTerm] = useState('');

    const handleApplyFilters = (appliedFilters) => {
        console.log('Applying filters:', appliedFilters);
        setFilters({ ...appliedFilters });
    };

    const handleSearch = (term) => {
        setSearchTerm(term);
    };

    const filteredBanks = banks.filter((bank) => {
        const typeMatches = filters.type === '' || bank.type === filters.type;
        const interestRateValue = parseFloat(bank.interestRate.replace(/[^\d.-]/g, ''));
        const interestRateMatches = filters.interestRate === '' || 
            (filters.interestRate === 'Low (<1%)' && interestRateValue < 1) ||
            (filters.interestRate === 'Moderate (1-3%)' && interestRateValue >= 1 && interestRateValue <= 3) ||
            (filters.interestRate === 'High (>3%)' && interestRateValue > 3);
        const foundedYearMatches = filters.foundedYear === '' || 
            (filters.foundedYear === 'Before 1950' && bank.foundedYear < 1950) ||
            (filters.foundedYear === '1950-2000' && bank.foundedYear >= 1950 && bank.foundedYear <= 2000) ||
            (filters.foundedYear === '2000+' && bank.foundedYear > 2000);

        const searchMatches = searchTerm === '' || 
            bank.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            bank.description.toLowerCase().includes(searchTerm.toLowerCase());

        return typeMatches && interestRateMatches && foundedYearMatches && searchMatches;
    });

    return (
        <>
            <Header showSearch onSearch={handleSearch} />
            <FilterBar onApplyFilters={handleApplyFilters} />
            <div className="AppContainer">
                <CatalogItems banks={filteredBanks} />
            </div>
            <Footer />
        </>
    );
}

export default CatalogPage;

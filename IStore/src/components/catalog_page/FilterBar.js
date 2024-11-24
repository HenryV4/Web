// src/components/catalog_page/FilterBar.js

import React, { useState } from 'react';
import './FilterBar.css';
import SelectFilter from './SelectFilter';

function FilterBar({ onApplyFilters, onSearch }) {
    const [type, setType] = useState('');
    const [interestRate, setInterestRate] = useState('');
    const [foundedYear, setFoundedYear] = useState('');
    const [searchTerm, setSearchTerm] = useState('');

    const handleSearchChange = (e) => {
        const value = e.target.value;
        setSearchTerm(value);
        onSearch(value);
    };

    const handleApplyFilters = () => {
        onApplyFilters({ type, interestRate, foundedYear });
    };

    return (
        <div className="filter-bar">
            <SelectFilter 
                label="Type" 
                options={['No type filter', 'Retail', 'Commercial', 'Investment', 'Online']} 
                value={type}
                onChange={setType}
            />
            <SelectFilter 
                label="Interest Rates" 
                options={['No Interest Rate filter', 'Low (<1%)', 'Moderate (1-3%)', 'High (>3%)']} 
                value={interestRate}
                onChange={setInterestRate}
            />
            <SelectFilter 
                label="Founded Year" 
                options={['No Founded Year filter', 'Before 1950', '1950-2000', '2000+']} 
                value={foundedYear}
                onChange={setFoundedYear}
            />
            <button className="apply-button" onClick={handleApplyFilters}>Apply</button>
            <input
                type="text"
                placeholder="Search..."
                className="search-input"
                value={searchTerm}
                onChange={handleSearchChange}
            />
        </div>
    );
}

export default FilterBar;

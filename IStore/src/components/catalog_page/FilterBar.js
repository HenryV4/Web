// src/components/catalog_page/FilterBar.js

import React, { useState } from 'react';
import './FilterBar.css';
import SelectFilter from './SelectFilter';

function FilterBar({ onApplyFilters }) {
    const [type, setType] = useState('');
    const [interestRate, setInterestRate] = useState('');
    const [foundedYear, setFoundedYear] = useState('');

    const handleApplyFilters = () => {
        onApplyFilters({ type, interestRate, foundedYear });
    };

    return (
        <div className="filter-bar">
            <SelectFilter 
                label="Type" 
                options={['', 'Retail', 'Commercial', 'Investment', 'Online']} 
                value={type}
                onChange={setType}
            />
            <SelectFilter 
                label="Interest Rates" 
                options={['', 'Low (<1%)', 'Moderate (1-3%)', 'High (>3%)']} 
                value={interestRate}
                onChange={setInterestRate}
            />
            <SelectFilter 
                label="Founded Year" 
                options={['', 'Before 1950', '1950-2000', '2000+']} 
                value={foundedYear}
                onChange={setFoundedYear}
            />
            <button className="apply-button" onClick={handleApplyFilters}>Apply</button>
        </div>
    );
}

export default FilterBar;

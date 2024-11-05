// src/components/catalog_page/SelectFilter.js

import React from 'react';
import './SelectFilter.css';

function SelectFilter({ label, options, value, onChange }) {
    return (
        <select 
            className="filter-option" 
            value={value} 
            onChange={(e) => onChange(e.target.value)}
        >
            <option value="">{label}</option>
            {options.map((option, index) => (
                <option key={index} value={option}>
                    {option}
                </option>
            ))}
        </select>
    );
}

export default SelectFilter;

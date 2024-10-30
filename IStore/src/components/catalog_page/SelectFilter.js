// src/components/catalog_page/SelectFilter.js

import React from 'react';
import './SelectFilter.css';

function SelectFilter({ label, options }) {
    return (
        <select className="filter-option">
            <option>{label}</option>
            {options.map((option, index) => (
                <option key={index} value={option}>
                    {option}
                </option>
            ))}
        </select>
    );
}

export default SelectFilter;

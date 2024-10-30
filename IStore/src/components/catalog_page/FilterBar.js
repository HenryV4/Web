// src/components/catalog_page/FilterBar.js

import React from 'react';
import './FilterBar.css';
import SelectFilter from './SelectFilter';

function FilterBar() {
    return (
        <div className="filter-bar">
            <SelectFilter label="Filter 1" options={['Option 1', 'Option 2', 'Option 3']} />
            <SelectFilter label="Filter 2" options={['Option A', 'Option B', 'Option C']} />
            <SelectFilter label="Filter 3" options={['Option X', 'Option Y', 'Option Z']} />
            <button className="apply-button">Apply</button>
        </div>
    );
}

export default FilterBar;

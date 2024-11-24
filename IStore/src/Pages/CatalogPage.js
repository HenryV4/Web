// src/pages/CatalogPage.js
import React, { useState, useEffect } from 'react';
// import Header from '../components/common/header/header';
import Footer from '../components/common/footer/footer';
import CatalogItems from '../components/catalog_page/CatalogItems';
import FilterBar from '../components/catalog_page/FilterBar';
import { fetchBanks } from '../api/api';
import LoadingSpinner from '../components/common/Loading/LoadingSpinner';
import useDebounce from '../hooks/useDebounce';

function CatalogPage() {
    const [banks, setBanks] = useState([]);
    const [filters, setFilters] = useState({});
    const [loading, setLoading] = useState(true);

    const debouncedFilters = useDebounce(filters, 300);

    const handleApplyFilters = (appliedFilters) => {
        setFilters((prevFilters) => ({ ...prevFilters, ...appliedFilters }));
    };

    const handleSearch = (searchTerm) => {
        setFilters((prevFilters) => ({ ...prevFilters, searchTerm }));
    };

    useEffect(() => {
        setLoading(true);
        const fetchWithDelay = async () => {
            try {
                const response = await fetchBanks(debouncedFilters);
                setBanks(response.data);
            } catch (error) {
                console.error('Error fetching banks:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchWithDelay();
    }, [debouncedFilters]);

    return (
        <>
            {/* <Header /> */}
            <FilterBar onApplyFilters={handleApplyFilters} onSearch={handleSearch} />
            <div className="AppContainer">
                {loading ? <LoadingSpinner /> : <CatalogItems banks={banks} />}
            </div>
            <Footer />
        </>
    );
}

export default CatalogPage;

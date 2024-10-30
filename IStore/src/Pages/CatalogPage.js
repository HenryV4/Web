// src/pages/CatalogPage.js

import React from 'react';
import Header from '../components/common/header/header';
import Footer from '../components/common/footer/footer';
import CatalogItems from '../components/catalog_page/CatalogItems';
import FilterBar from '../components/catalog_page/FilterBar';
import '../App.css';

function CatalogPage() {
    return (
        <>
            <Header showSearch /> {/* Enabling the search bar */}
            <FilterBar />
            <div className="AppContainer">
                <CatalogItems />
            </div>
            <Footer />
        </>
    );
}

export default CatalogPage;

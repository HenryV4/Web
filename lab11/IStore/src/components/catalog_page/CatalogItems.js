// src/components/catalog_page/CatalogItems.js
import React from 'react';
import CatalogItem from '../common/CatalogItem/CatalogItem';
import './CatalogItems.css'

const CatalogItems = ({ banks }) => (
    <div className="catalog-items">
        {banks.map(bank => (
            <CatalogItem
                key={bank.id}
                id={bank.id}
                imageSrc={bank.imageSrc}
                imageAlt={bank.title}
                title={bank.title}
                description={bank.description}
                price={bank.price}
            />
        ))}
    </div>
);

export default CatalogItems;

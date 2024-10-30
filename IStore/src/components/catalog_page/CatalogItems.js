import React from 'react';
import CatalogItem from '../common/CatalogItem/CatalogItem';
import './CatalogItems.css';
import banks from '../../data/banks';

function CatalogItems(){
    return(
    <div className="catalog-items">
        {banks.map((bank, index) => (
            <CatalogItem 
                key={index}
                imageSrc={bank.imageSrc}
                imageAlt={bank.imageAlt}
                title={bank.title}
                description={bank.description}
                price={bank.price}
            />
        ))}
    </div>
    );
}

export default CatalogItems
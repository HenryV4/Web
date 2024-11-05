import React from 'react';
import CatalogItem from '../common/CatalogItem/CatalogItem';
import './CatalogItems.css';

function CatalogItems({ banks }) { // Receive banks as a prop
    console.log("Rendering CatalogItems with banks:", banks);
    return (
        <div className="catalog-items">
            {banks.map((bank) => (
                <CatalogItem 
                    key={bank.id} // Use the unique id as the key
                    id={bank.id} // Pass id to CatalogItem
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

export default CatalogItems;

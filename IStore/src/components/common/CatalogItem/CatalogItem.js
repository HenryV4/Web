// CatalogItem.js
import React from 'react';
import './CatalogItem.css';

function CatalogItem({ imageSrc, imageAlt, title, description, price }) {
    return (
        <div className="catalog-item">
            <div className="item-image">
                <img src={imageSrc} alt={imageAlt} />
            </div>
            <h3>{title}</h3>
            <p>{description}</p>
            <p className="price">{price}</p>
            <button>Show Bank</button>
        </div>
    );
}

export default CatalogItem;

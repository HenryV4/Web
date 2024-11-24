// src/components/common/CatalogItem/CatalogItem.js
import React from 'react';
import { Link } from 'react-router-dom';
import './CatalogItem.css';

function CatalogItem({ id, imageSrc, imageAlt, title, description, price }) {
    return (
        <div className="catalog-item">
            <div className="item-image">
                <img src={`http://localhost:5000${imageSrc}`} alt={imageAlt} />
            </div>
            <h3>{title}</h3>
            <p>{description}</p>
            <p className="price">{price}</p>
            <Link to={`/bank/${id}`} className="show-bank">Show Bank</Link>
        </div>
    );
}

export default CatalogItem;

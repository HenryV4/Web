// CatalogPreview.js
import React, { useState, useContext } from 'react';
import './CatalogPreview.css';
import { BanksContext } from '../../../data/BanksContext';
import CatalogItem from '../../common/CatalogItem/CatalogItem';
import './CatalogPreview.css'

function CatalogPreview() {
    const banks = useContext(BanksContext);
    const [expanded, setExpanded] = useState(false); // Control view state

    const handleToggleView = () => {
        setExpanded(!expanded); // Toggle expanded state
    };

    return (
        <section className="catalog-preview">
            <div className={`preview-tiles ${expanded ? 'expanded' : ''}`}>
                {banks.map((bank, id) => (
                    <CatalogItem
                        key={bank.id}
                        id={bank.id}
                        imageSrc={bank.imageSrc}
                        imageAlt={bank.imageAlt}
                        title={bank.title}
                        description={bank.description}
                        price={bank.price}
                    />
                ))}
            </div>
            <div className="view-all">
                <button onClick={handleToggleView} className="toggle-view-button">
                    {expanded ? "Show Less" : "View More"}
                </button>
            </div>
        </section>
    );
}

export default CatalogPreview;

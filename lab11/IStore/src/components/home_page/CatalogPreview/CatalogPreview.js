// src/components/home_page/CatalogPreview/CatalogPreview.js
import React, { useState, useEffect, useRef } from 'react';
import CatalogItem from '../../common/CatalogItem/CatalogItem';
import LoadingSpinner from '../../common/Loading/LoadingSpinner';
import axios from 'axios';
import './CatalogPreview.css';

function CatalogPreview() {
    const [banks, setBanks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [expanded, setExpanded] = useState(false);
    const [height, setHeight] = useState('100px'); // Set initial height for loading spinner visibility
    const containerRef = useRef(null);

    useEffect(() => {
        setLoading(true);
        // Adding a 1-second delay before updating the banks data
        axios.get('http://localhost:5000/api/banks')
            .then(response => {
                setTimeout(() => {
                    setBanks(response.data.slice(0, 6)); // Fetch first 6 banks
                    setLoading(false);
                }); // 1-second delay
            })
            .catch(error => {
                console.error("Error fetching banks:", error);
                setLoading(false);
            });
    }, []);

    useEffect(() => {
        if (containerRef.current) {
            setHeight(expanded ? `${containerRef.current.scrollHeight}px` : '530px');
        }
    }, [expanded, banks]);

    const handleToggleView = () => {
        setExpanded(!expanded);
    };

    const displayedBanks = expanded ? banks : banks.slice(0, 3);

    return (
        <section className="catalog-preview">
            <div
                ref={containerRef}
                className="preview-tiles"
                style={{
                    height: height,
                    transition: 'height 0.5s ease'
                }}
            >
                {loading ? (
                    <LoadingSpinner />
                ) : (
                    displayedBanks.map((bank) => (
                        <CatalogItem
                            key={bank.id}
                            id={bank.id}
                            imageSrc={bank.imageSrc}
                            imageAlt={bank.imageAlt}
                            title={bank.title}
                            description={bank.description}
                            price={bank.price}
                        />
                    ))
                )}
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

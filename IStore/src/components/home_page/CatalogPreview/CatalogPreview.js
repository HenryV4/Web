import React from 'react';
import './CatalogPreview.css';
import Chase_Bank from '../../../images/Chase.jpg'; // Corrected path
import HSBC from '../../../images/HSBC.png'; // Corrected path
import ING from '../../../images/ING.jpg'; // Corrected path
import CatalogItem from '../../common/CatalogItem/CatalogItem'; // Corrected path
import { Link } from 'react-router-dom';

function CatalogPreview() {
    return (
        <section className="catalog-preview">
            <div className='preview-tiles'>
                <CatalogItem 
                    imageSrc={Chase_Bank} 
                    imageAlt="Chase Bank" 
                    title="Chase Bank" 
                    description="A major U.S. bank offering personal and business banking services." 
                    price="$10m" 
                />
                <CatalogItem 
                    imageSrc={HSBC} 
                    imageAlt="HSBC Bank" 
                    title="HSBC" 
                    description="A global bank headquartered in London, providing international banking services." 
                    price="$1.3b" 
                />
                <CatalogItem 
                    imageSrc={ING} 
                    imageAlt="ING Bank" 
                    title="ING" 
                    description="A Dutch multinational bank specializing in online banking services." 
                    price="$2.5m" 
                />
            </div>
            <div className="view-all">
                <Link to="/catalog" className="view-all-link">View More</Link>
            </div>
        </section>
    );
}

export default CatalogPreview;

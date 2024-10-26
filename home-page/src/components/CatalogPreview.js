import React from 'react';
import './CatalogPreview.css';
import Chase_Bank from '../images/Chase.jpg';
import HSBC from '../images/HSBC.png';
import ING from '../images/ING.jpg';

function CatalogPreview() {
    return (
        <section className="catalog-preview">
            <div className='preview-tiles'>
                <div className="catalog-item">
                    <div className="item-image"><img className='CHASE_BANK' src={Chase_Bank} alt='Chase_Bank'></img></div>
                    <h3>Chase Bank</h3>
                    <p> A major U.S. bank offering personal and business banking services.</p>
                    <p className="price">$10m</p>
                    <button>Show More</button>
                </div>
                <div className="catalog-item">
                    <div className="item-image"><img className='HSBC_BANK' src={HSBC} alt='Chase_Bank'></img></div>
                    <h3>HSBC</h3>
                    <p>A global bank headquartered in London, providing international banking services.</p>
                    <p className="price">$1.3b</p>
                    <button>Show More</button>
                </div>
                <div className="catalog-item">
                    <div className="item-image"><img className='ING_BANK' src={ING} alt='Chase_Bank'></img></div>
                    <h3>ING</h3>
                    <p>A Dutch multinational bank specializing in online banking services.</p>
                    <p className="price">$2.5m</p>
                    <button>Show More</button>
                </div>
            </div>
            <div className="view-all">
                <button>View All</button>
            </div>
        </section>
    );
}

export default CatalogPreview;

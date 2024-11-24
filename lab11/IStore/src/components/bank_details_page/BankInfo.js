import React from 'react';
import BankFields from './BankFields';  // Import BankFields component
import './BankInfo.css';

function BankInfo({ 
    imageSrc, imageAlt, title, description, 
    type, interestRate, foundedYear, 
    handleQuantityChange, handleVariationChange 
}) {
    return (
        <div className="bank-info-cont">
            <img src={imageSrc} alt={imageAlt} className="bank-image" />
            <div className="bank-info">
                <h1 className="bank-title">{title}</h1>
                <p className="bank-description">{description}</p>
                <p><strong>Type:</strong> {type}</p>
                <p><strong>Interest Rate:</strong> {interestRate}</p>
                <p><strong>Founded Year:</strong> {foundedYear}</p>
                
                {/* Pass the props to BankFields */}
                <BankFields 
                    handleQuantityChange={handleQuantityChange} 
                    handleVariationChange={handleVariationChange}  // Ensure handleVariationChange is passed here
                />
            </div>
        </div>
    );
}

export default BankInfo;

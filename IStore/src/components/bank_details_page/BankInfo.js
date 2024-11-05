import React from 'react';
import BankCharacteristics from './BankCharacteristics';
import BankFields from './BankFields';
import './BankInfo.css';

function BankInfo({ imageSrc, imageAlt, title, description, type, interestRate, foundedYear }) {
    return (
        <div className="bank-info-cont">
            <img src={imageSrc} alt={imageAlt} className="bank-image" />
            <div className="bank-info">
                <BankCharacteristics />
                <h1 className="bank-title">{title}</h1>
                <p className="bank-description">{description}</p>
                <p><strong>Type:</strong> {type}</p>
                <p><strong>Interest Rate:</strong> {interestRate}</p>
                <p><strong>Founded Year:</strong> {foundedYear}</p>
                <BankFields />
            </div>
        </div>
    );
}

export default BankInfo;
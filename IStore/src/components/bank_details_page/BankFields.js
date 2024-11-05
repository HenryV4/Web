// src/components/BankDetails/BankFields.js
import React from 'react';
import './BankFields.css';

function BankFields() {
    return (
        <div className="bank-fields">
            <div>
                <label className="field-label">Countable field</label>
                <input type="text" defaultValue="1337..." className="countable-field" />
            </div>
            <div>
                <label className="field-label">Selectable Field</label>
                <select className="selectable-field">
                    <option>Select</option>
                </select>
            </div>
        </div>
    );
}

export default BankFields;

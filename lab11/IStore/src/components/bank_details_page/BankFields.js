import React from 'react';
import './BankFields.css';
import SelectFilter from '../catalog_page/SelectFilter';  // Select component for variations

function BankFields({ handleQuantityChange, handleVariationChange, quantity, variation }) {
    const onQuantityChange = (e) => {
        const updatedQuantity = parseInt(e.target.value, 10);
        if (updatedQuantity > 0) {
            handleQuantityChange(updatedQuantity);  // Call the passed function to update quantity in parent component
        }
    };

    const onVariationChange = (value) => {
        handleVariationChange(value);  // Call the passed function to update variation in parent component
    };

    return (
        <div className="bank-fields">
            <div>
                <label className="field-label">Countable field</label>
                <input
                    type="number"
                    defaultValue={1}
                    value={quantity}  // Bind input value to quantity state
                    onChange={onQuantityChange}  // Handle change in quantity
                    min="1"  // Ensure quantity can't go below 1
                    max="10"
                    className="countable-field"
                />
            </div>
            <div>
                <label className="field-label">Selectable Field</label>
                <SelectFilter
                    label="Select Variant"
                    options={["Standard", "Premium", "Deluxe"]}
                    value={variation}
                    onChange={onVariationChange}  // Handle variation change
                />
            </div>
        </div>
    );
}

export default BankFields;

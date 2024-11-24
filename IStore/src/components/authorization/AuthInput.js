import React from 'react';
import './AuthInput.css';

const AuthInput = ({ label, type, name, value, onChange }) => {
    return (
        <div className="auth-input">
            <label>{label}</label>
            <input
                type={type}
                name={name}
                value={value}
                onChange={onChange}
                required
            />
        </div>
    );
};

export default AuthInput;

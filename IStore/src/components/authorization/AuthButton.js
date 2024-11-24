import React from 'react';
import './AuthButton.css';

const AuthButton = ({ text, onClick, type = 'submit' }) => {
    return (
        <button className="auth-button" type={type} onClick={onClick}>
            {text}
        </button>
    );
};

export default AuthButton;

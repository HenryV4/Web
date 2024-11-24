import React from 'react';
import AuthInput from './AuthInput';
import AuthButton from './AuthButton';
import './AuthForm.css';

const AuthForm = ({ title, fields, onSubmit, buttonText, footer }) => {
    return (
        <div className="auth-form">
            <h2>{title}</h2>
            <form onSubmit={onSubmit}>
                {fields.map((field, index) => (
                    <AuthInput
                        key={index}
                        label={field.label}
                        type={field.type}
                        name={field.name}
                        value={field.value}
                        onChange={field.onChange}
                    />
                ))}
                <AuthButton text={buttonText} />
            </form>
            <div className="auth-footer">{footer}</div>
        </div>
    );
};

export default AuthForm;

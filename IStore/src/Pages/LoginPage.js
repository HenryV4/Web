import React, { useState } from 'react';
import AuthForm from '../../src/components/authorization/AuthForm';
import { login } from '../api/api';
import { useNavigate } from 'react-router-dom';
import Header from '../../src/components/common/header/header';
import Footer from '../../src/components/common/footer/footer';

const LoginPage = ({ onLogin }) => {
    const [form, setForm] = useState({
        email: '',
        password: '',
    });
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await login({
                email: form.email,
                password: form.password,
            });
            localStorage.setItem('token', response.data.token); // Store token
            localStorage.setItem('email', form.email); // Store email (optional)
            onLogin(); // Update isAuthenticated in App.js
            navigate('/'); // Redirect to the home page
        } catch (err) {
            setError(err.response?.data?.error || 'Invalid credentials');
        }
    };

    const fields = [
        { label: 'E-mail', type: 'email', name: 'email', value: form.email, onChange: handleChange },
        { label: 'Password', type: 'password', name: 'password', value: form.password, onChange: handleChange },
    ];

    return (
        <>
            <Header />
            <div className="AppContainer">
                <AuthForm
                    title="Submit the form to sign in"
                    fields={fields}
                    onSubmit={handleSubmit}
                    buttonText="Login Me"
                    footer={
                        <p>
                            Not a member? <a href="/signup">Sign up</a>
                        </p>
                    }
                />
                {error && <p className="error">{error}</p>}
            </div>
            <Footer />
        </>
    );
};

export default LoginPage;

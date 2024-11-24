import React, { useState } from 'react';
import AuthForm from '../../src/components/authorization/AuthForm';
import { signup } from '../api/api'; // API call for signup
import { useNavigate } from 'react-router-dom';
import Header from '../../src/components/common/header/header';
import Footer from '../../src/components/common/footer/footer';

const SignUpPage = () => {
    const [form, setForm] = useState({
        username: '',
        email: '', // Add email field
        password: '',
        confirmPassword: '',
    });
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (form.password !== form.confirmPassword) {
            setError("Passwords don't match");
            return;
        }
        try {
            await signup({
                username: form.username,
                email: form.email, // Include email field
                password: form.password,
            });
            navigate('/login'); // Redirect to login page after successful signup
        } catch (err) {
            setError(err.response?.data?.error || 'Something went wrong');
        }
    };

    const fields = [
        { label: 'Username', type: 'text', name: 'username', value: form.username, onChange: handleChange },
        { label: 'E-mail', type: 'email', name: 'email', value: form.email, onChange: handleChange }, // Email input
        { label: 'Password', type: 'password', name: 'password', value: form.password, onChange: handleChange },
        { label: 'Retype Password', type: 'password', name: 'confirmPassword', value: form.confirmPassword, onChange: handleChange },
    ];

    return (
        <>
            <Header />
            <div className="AppContainer">
                <AuthForm
                    title="Register the new account"
                    fields={fields}
                    onSubmit={handleSubmit}
                    buttonText="Sign Me Up"
                    footer={
                        <p>
                            Already a member? <a href="/login">Login</a>
                        </p>
                    }
                />
                {error && <p className="error">{error}</p>}
            </div>
            <Footer />
        </>
    );
};

export default SignUpPage;

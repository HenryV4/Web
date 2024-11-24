import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import axios from 'axios';

const ProtectedRoute = ({ component: Component }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(null); // Track auth state

    useEffect(() => {
        const validateToken = async () => {
            const rawToken = localStorage.getItem('token');
            if (!rawToken) {
                console.log('No token found in localStorage');
                setIsAuthenticated(false);
                setLoadingAuth(false);
                return;
            }
        
            const token = `Bearer ${rawToken}`;
            try {
                const response = await axios.get('http://localhost:5000/api/validate-token', {
                    headers: { Authorization: token },
                });
                console.log('Token validation successful:', response.data);
                setIsAuthenticated(response.data.valid);
            } catch (error) {
                console.error('Token validation failed:', error.response?.data || error.message);
        
                // Check if the error explicitly indicates an invalid token
                if (error.response?.status === 401 && error.response?.data?.message === 'Invalid token') {
                    console.warn('Removing invalid token from localStorage');
                    localStorage.removeItem('token'); // Only clear token if explicitly invalid
                }
                setIsAuthenticated(false);
            } finally {
                setLoadingAuth(false);
            }
        };
        

        validateToken();
    }, []);

    if (isAuthenticated === null) {
        return <div>Loading...</div>; // Show a loading state while validating
    }

    return isAuthenticated ? <Component /> : <Navigate to="/login" />;
};

export default ProtectedRoute;

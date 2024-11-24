// import React, { useEffect, useState } from 'react'; // Fix useState and useEffect
// import axios from 'axios'; // Fix axios import
// import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'; // Fix Router-related imports
// import Home from './Pages/Home'; // Import Home component
// import CatalogPage from './Pages/CatalogPage'; // Import CatalogPage component
// import BankDetails from './Pages/BankDetails'; // Import BankDetails component
// import CartPage from './Pages/CartPage'; // Import CartPage component
// import LoadingSpinner from '../src/components/common/Loading/LoadingSpinner'; // Import LoadingSpinner
// import CheckoutPage from './Pages/CheckoutPage'; // Import CheckoutPage component
// import SuccessPage from './Pages/SuccessPage'; // Import SuccessPage component
// import SignUpPage from './Pages/SignUpPage'; // Import SignUpPage component
// import LoginPage from './Pages/LoginPage'; // Import LoginPage component
// import './App.css'; // Import styles
// import '@fortawesome/fontawesome-free/css/all.min.css'; // Import FontAwesome CSS


// function App() {
//     const [backendReady, setBackendReady] = useState(false);
//     const [backendError, setBackendError] = useState(false);
//     const [isAuthenticated, setIsAuthenticated] = useState(false);
//     const [loadingAuth, setLoadingAuth] = useState(true);

//     // Check the backend and validate token
//     useEffect(() => {
//         const checkBackendHealth = async () => {
//             try {
//                 await axios.get('http://localhost:5000/api/health');
//                 setBackendReady(true);
//             } catch (error) {
//                 console.error('Backend health check failed:', error);
//                 setBackendError(true);
//             }
//         };

//         const validateToken = async () => {
//             const token = localStorage.getItem('token');
//             if (!token) {
//                 setIsAuthenticated(false);
//                 setLoadingAuth(false);
//                 return;
//             }

//             try {
//                 const response = await axios.get('http://localhost:5000/api/validate-token', {
//                     headers: {
//                         Authorization: token,
//                     },
//                 });

//                 setIsAuthenticated(response.data.valid);
//             } catch (error) {
//                 console.error('Token validation failed:', error);
//                 setIsAuthenticated(false);
//                 localStorage.removeItem('token'); // Clear invalid token
//             } finally {
//                 setLoadingAuth(false);
//             }
//         };

//         checkBackendHealth();
//         validateToken();
//     }, []);

//     // Callback to handle login
//     const handleLogin = () => {
//         setIsAuthenticated(true);
//     };

//     if (!backendReady && !backendError) {
//         return <LoadingSpinner />;
//     }

//     if (backendError) {
//         return <div>Error: Backend is currently unavailable. Please try again later.</div>;
//     }

//     if (loadingAuth) {
//         return <LoadingSpinner />;
//     }

//     return (
//         <Router>
//             <div className="App">
//                 <Routes>
//                     {/* Public Routes */}
//                     <Route
//                         path="/signup"
//                         element={!isAuthenticated ? <SignUpPage /> : <Navigate to="/" />}
//                     />
//                     <Route
//                         path="/login"
//                         element={
//                             !isAuthenticated ? (
//                                 <LoginPage onLogin={handleLogin} />
//                             ) : (
//                                 <Navigate to="/" />
//                             )
//                         }
//                     />

//                     {/* Protected Routes */}
//                     <Route
//                         path="/"
//                         element={isAuthenticated ? <Home /> : <Navigate to="/login" />}
//                     />
//                     <Route
//                         path="/catalog"
//                         element={isAuthenticated ? <CatalogPage /> : <Navigate to="/login" />}
//                     />
//                     <Route
//                         path="/cart"
//                         element={isAuthenticated ? <CartPage /> : <Navigate to="/login" />}
//                     />
//                     <Route
//                         path="/checkout"
//                         element={isAuthenticated ? <CheckoutPage /> : <Navigate to="/login" />}
//                     />
//                     <Route
//                         path="/success"
//                         element={isAuthenticated ? <SuccessPage /> : <Navigate to="/login" />}
//                     />

//                     {/* Assuming BankDetails is public */}
//                     <Route path="/bank/:id" element={<BankDetails />} />

//                     {/* Redirect unknown routes */}
//                     <Route path="*" element={<Navigate to={isAuthenticated ? "/" : "/login"} />} />
//                 </Routes>
//             </div>
//         </Router>
//     );
// }

// export default App;

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './Pages/Home';
import CatalogPage from './Pages/CatalogPage';
import BankDetails from './Pages/BankDetails';
import CartPage from './Pages/CartPage';
import LoadingSpinner from './components/common/Loading/LoadingSpinner';
import CheckoutPage from './Pages/CheckoutPage';
import SuccessPage from './Pages/SuccessPage';
import SignUpPage from './Pages/SignUpPage';
import LoginPage from './Pages/LoginPage';
import Header from './components/common/header/header';
import './App.css';
import '@fortawesome/fontawesome-free/css/all.min.css';

function App() {
    const [backendReady, setBackendReady] = useState(false);
    const [backendError, setBackendError] = useState(false);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loadingAuth, setLoadingAuth] = useState(true);

    useEffect(() => {
        const checkBackendHealth = async () => {
            try {
                await axios.get('http://localhost:5000/api/health');
                setBackendReady(true);
            } catch (error) {
                console.error('Backend health check failed:', error);
                setBackendError(true);
            }
        };

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
        
                console.log('Token validation response:', response.data);
                setIsAuthenticated(response.data.valid);
            } catch (error) {
                console.error('Token validation failed:', error.response?.data || error.message);
        
                // Remove token only if explicitly invalid
                if (error.response?.status === 401) {
                    console.warn('Token marked as invalid. Delaying removal for debugging.');
                    // Delay token removal for debugging
                    setTimeout(() => {
                        console.warn('Removing invalid token from localStorage.');
                        localStorage.removeItem('token');
                    }, 5000);
                }
        
                setIsAuthenticated(false);
            } finally {
                setLoadingAuth(false);
            }
        };
        
               

        checkBackendHealth();
        validateToken();
    }, []);

    const handleLogin = () => {
        setIsAuthenticated(true);
    };

    const handleLogout = () => {
        setIsAuthenticated(false);
        localStorage.removeItem('token');
    };

    if (!backendReady && !backendError) {
        return <LoadingSpinner />;
    }

    if (backendError) {
        return <div>Error: Backend is currently unavailable. Please try again later.</div>;
    }

    if (loadingAuth) {
        return <LoadingSpinner />;
    }

    return (
        <Router>
            <div className="App">
                <Routes>
                    {/* Public Routes */}
                    <Route
                        path="/signup"
                        element={!isAuthenticated ? <SignUpPage /> : <Navigate to="/" />}
                    />
                    <Route
                        path="/login"
                        element={
                            !isAuthenticated ? (
                                <LoginPage onLogin={handleLogin} />
                            ) : (
                                <Navigate to="/" />
                            )
                        }
                    />

                    {/* Protected Routes */}
                    <Route
                        path="/"
                        element={
                            isAuthenticated ? (
                                <>
                                    <Header onLogout={handleLogout} setIsAuthenticated={setIsAuthenticated} />
                                    <Home />
                                </>
                            ) : (
                                <Navigate to="/login" />
                            )
                        }
                    />
                    <Route
                        path="/catalog"
                        element={
                            isAuthenticated ? (
                                <>
                                    <Header onLogout={handleLogout} setIsAuthenticated={setIsAuthenticated} />
                                    <CatalogPage />
                                </>
                            ) : (
                                <Navigate to="/login" />
                            )
                        }
                    />
                    <Route
                        path="/cart"
                        element={
                            isAuthenticated ? (
                                <>
                                    <Header onLogout={handleLogout} setIsAuthenticated={setIsAuthenticated} />
                                    <CartPage />
                                </>
                            ) : (
                                <Navigate to="/login" />
                            )
                        }
                    />
                    <Route
                        path="/checkout"
                        element={
                            isAuthenticated ? (
                                <>
                                    <Header onLogout={handleLogout} setIsAuthenticated={setIsAuthenticated} />
                                    <CheckoutPage />
                                </>
                            ) : (
                                <Navigate to="/login" />
                            )
                        }
                    />
                    <Route
                        path="/success"
                        element={
                            isAuthenticated ? (
                                <>
                                    <Header onLogout={handleLogout} setIsAuthenticated={setIsAuthenticated} />
                                    <SuccessPage />
                                </>
                            ) : (
                                <Navigate to="/login" />
                            )
                        }
                    />

                    {/* Public Route */}
                    <Route path="/bank/:id" element={<BankDetails />} />

                    {/* Redirect unknown routes */}
                    <Route path="*" element={<Navigate to={isAuthenticated ? "/" : "/login"} />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;



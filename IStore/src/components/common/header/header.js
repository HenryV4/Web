// // src/components/common/header/Header.js

// import React from "react";
// import { Link } from 'react-router-dom';
// import './header.css';
// import logo from '../../../images/logo.png';

// function Header({ showSearch, onSearch }) {
//     const handleSearchInputChange = (e) => {
//         if (onSearch) {
//             onSearch(e.target.value.trim(" ")); // Trim spaces before passing the search term
//         }
//     };

//     return (
//         <header className="header">
//             <img className="logo" src={logo} alt="Logo" />
//             <nav className="nav-container">
//                 <ul className="nav-links">
//                     <li><Link to="/">Home</Link></li>
//                     <li><Link to="/catalog">Catalog</Link></li>
//                     <li><Link to="/cart" className="cart-icon">Cart</Link></li>
//                 </ul>
//                 {showSearch && (
//                     <input
//                         type="text"
//                         placeholder="Search..."
//                         className="search-bar"
//                         onChange={handleSearchInputChange} // Handle search input changes
//                     />
//                 )}
//             </nav>
//         </header>
//     );
// }

// export default Header;
// src/components/common/header/Header.js

import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "./header.css";
import logo from "../../../images/logo.png";

function Header({ showSearch, onSearch, setIsAuthenticated }) {
    const location = useLocation();
    const navigate = useNavigate();

    const handleSearchInputChange = (e) => {
        if (onSearch) {
            onSearch(e.target.value.trim());
        }
    };

    const handleLogout = () => {
        if (window.confirm("Are you sure you want to logout?")) {
            localStorage.removeItem("token");
            setIsAuthenticated(false); // Properly update the state
            navigate("/login");
        }
    };

    const isAuthPage = location.pathname === "/login" || location.pathname === "/signup";

    return (
        <header className="header">
            <img className="logo" src={logo} alt="Logo" />
            {!isAuthPage && (
                <nav className="nav-container">
                    <ul className="nav-links">
                        <li>
                            <Link to="/">Home</Link>
                        </li>
                        <li>
                            <Link to="/catalog">Catalog</Link>
                        </li>
                        <li>
                            <Link to="/cart" className="cart-icon">
                                Cart
                            </Link>
                        </li>
                    </ul>
                    {showSearch && (
                        <input
                            type="text"
                            placeholder="Search..."
                            className="search-bar"
                            onChange={handleSearchInputChange}
                        />
                    )}
                    <button className="logout-button" onClick={handleLogout}>
                        Logout
                    </button>
                </nav>
            )}
        </header>
    );
}

export default Header;

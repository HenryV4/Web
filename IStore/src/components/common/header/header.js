// src/components/common/header/Header.js

import React from "react";
import { Link } from 'react-router-dom';
import './header.css';
import logo from '../../../images/logo.png';

function Header({ showSearch, onSearch }) {
    const handleSearchInputChange = (e) => {
        if (onSearch) {
            onSearch(e.target.value.trim(" ")); // Trim spaces before passing the search term
        }
    };

    return (
        <header className="header">
            <img className="logo" src={logo} alt="Logo" />
            <nav className="nav-container">
                <ul className="nav-links">
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/catalog">Catalog</Link></li>
                    <li><Link to="/cart">Cart</Link></li>
                </ul>
                {showSearch && (
                    <input
                        type="text"
                        placeholder="Search..."
                        className="search-bar"
                        onChange={handleSearchInputChange} // Handle search input changes
                    />
                )}
            </nav>
        </header>
    );
}

export default Header;

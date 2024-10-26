import React from "react";
import './header.css';
import logo from '../images/logo.png';

function Header(){

    return (
        <header className="header">
            <img className="logo" src={logo} alt="Logo" />
            <nav className="nav-container">
                <ul className="nav-links">
                    <li><a href="#">Home</a></li>
                    <li><a href="#">Catalog</a></li>
                    <li><a href="#">Cart</a></li>
                </ul>
            </nav>
        </header>
    );
}

export default Header
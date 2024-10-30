import React from 'react';
import './footer.css';
import logo from '../../../images/logo.png';

function Footer() {
    return (
        <footer className="footer">
            <div className="footer-content">
                <div className="branding">
                    <h3>Banks profit from the very debt they tell you to fear.</h3>
                    <p>You need a good credit score to borrow money, but to build credit, you first have to borrow — convenient, isn’t it?</p>
                </div>
                <div className="footer-logo">
                    <img src={logo} alt="Logo" />
                </div>
                <div className="social-icons">
                    <a href="#"><i className="fab fa-facebook"></i></a>
                    <a href="#"><i className="fab fa-twitter"></i></a>
                    <a href="#"><i className="fab fa-linkedin"></i></a>
                    <a href="#"><i className="fab fa-google-plus"></i></a>
                </div>
            </div>
            <hr />
            <div className="copyright">
                <p>2020 IoT © Copyright all rights reserved, bla bla</p>
            </div>
        </footer>
    );
}

export default Footer;

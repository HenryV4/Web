import React from "react";
import './hero.css';
import hero_image from '../../../images/hero-image.png';

function Hero() {
    return (
        <section className="hero">
            <div className="hero-image"><img src={hero_image} alt="best-banking"></img></div>
            <div className="hero-content">
                <h1>Best banking system calogue.</h1>
                <h2>"Your Trust, Our Commitment."</h2>
                <p>
                    We prioritize your financial well-being with secure, reliable, and easy-to-use banking services. 
                </p>
            </div>
        </section>
    );
}

export default Hero;
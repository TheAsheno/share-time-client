import React, { useEffect } from 'react';
import { initCarousel, handleMouseEnter, currentIndex } from './index.js';

const Carousel = () => {
    useEffect(() => {
        initCarousel();
        return () => {
            handleMouseEnter();
        };
    }, []);

    const images = [
        "images/batman.jpg",
        "images/interstellar.jpg",
        "images/The_Shawshank_Redemption.jpg",
        "images/joker.jpg",
        "images/the-legend-of-1900.jpg"
    ];

    return (
        <section className="py-5 bg-tertiary bg-cover bg-size--contain" style={{ backgroundColor: "#153448" }}>
            <div className="container text-center">
                <div className="row justify-content-center">
                    <div className="carousel-container">
                        {images.map((src, index) => (
                            <img
                                key={index}
                                className={`carousel-item ${currentIndex === index ? 'active' : ''}`}
                                src={src}
                                alt="carousel item"
                            />
                        ))}
                        <div className="carousel-indicators">
                            {images.map((src, index) => (
                                <span key={index} className={`carousel-indicator ${index === currentIndex ? 'active' : ''}`}></span>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Carousel;
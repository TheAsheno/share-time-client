import React, { useEffect } from 'react';
import { initCarousel, handleMouseEnter } from './animation';
import { BASE_URL } from '../../config/constants';

const Carousel = ({ MovieData }) => {
    const images = MovieData.map(movie => `${BASE_URL}/movie/images/${encodeURIComponent(movie.image)}`);
    useEffect(() => {
        initCarousel();
        return () => {
            handleMouseEnter();
        };
    }, [images]);
    return (
        <section className="py-5 bg-tertiary bg-cover bg-size--contain" style={{ backgroundColor: "#153448" }}>
            <div className="container text-center">
                <div className="row justify-content-center">
                    <div className="carousel-container">
                        {images.map((src, index) => (
                            <img
                                key={index}
                                className='carousel-item'
                                src={src}
                                alt="carousel item"
                            />
                        ))}
                        <div className="carousel-indicators">
                            {images.map((src, index) => (
                                <span key={index} className='carousel-indicator'></span>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Carousel;
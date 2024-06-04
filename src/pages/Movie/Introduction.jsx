import React, { useEffect } from "react";
import Item from "./Item";

const Introduction = ({ MovieData }) => {
    useEffect(() => {
        const observeElements = (selector, hiddenClass) => {
            const elements = document.querySelectorAll(selector);
            elements.forEach(element => {
                const observer = new IntersectionObserver((entries, observer) => {
                    entries.forEach(entry => {
                        if (entry.isIntersecting) {
                            element.classList.remove(hiddenClass);
                            observer.unobserve(entry.target);
                        }
                    });
                });
                observer.observe(element);
            });
        };
        observeElements('.movie-text', 'movie-text-hidden');
        observeElements('.movie-info', 'movie-info--hidden');
    }, []);
    return (
        <section className="introduction">
            {MovieData.map((movie, index) => (
                <Item key={index} id={`movie-${index + 1}`} data={movie} />
            ))}
            <div style={{ height: '120px' }} />
        </section>
    );
}

export default Introduction;
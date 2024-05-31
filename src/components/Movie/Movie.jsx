import React, { Component } from "react";
import './style.css';
import Carousel from "./Carousel";
import Introduction from "./Introduction";
const imagesLoaded = require('imagesloaded');

export default class Movie extends Component {
    componentDidMount() {
        const preloadImages = () => {
            return new Promise((resolve, reject) => {
                imagesLoaded(document.querySelectorAll('.carousel-container img'), resolve);
            });
        };
        Promise.all([preloadImages()]).then(() => {
            const moviepage = document.querySelector('.moviepage');
            moviepage.classList.remove('loading');
        });
    }
    render() {
        return (
            <div className="moviepage loading" style={{ animation: 'fadeIn 1s' }}>
                <Carousel />
                <Introduction />
            </div>
        )
    }
}
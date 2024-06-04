import React, { Component } from "react";
import './style.css';
import Carousel from "./Carousel";
import Introduction from "./Introduction";
import { movieServer } from '../../services';
const imagesLoaded = require('imagesloaded');

export default class Movie extends Component {
    constructor(props) {
        super(props);
        this.state = {
            MovieData: null,
        };
    }

    componentDidMount() {
        const preloadList = () => {
            return movieServer.getMovieList()
                .then(response => response.data)
                .then(data => {
                    this.setState({ MovieData: data });
                });
        }
        const preloadImages = () => {
            return new Promise((resolve, reject) => {
                imagesLoaded(document.querySelectorAll('.carousel-container img'), resolve);
            });
        };
        Promise.all([preloadImages(), preloadList()]).then(() => {
            const observer = new MutationObserver((mutationsList, observer) => {
                for (let mutation of mutationsList) {
                    if (mutation.type === 'childList') {
                        const moviepage = document.querySelector('.moviepage');
                        if (moviepage) {
                            moviepage.classList.remove('loading');
                            observer.disconnect();
                        }
                    }
                }
            });
            observer.observe(document.body, { childList: true, subtree: true });
        });
    }
    render() {
        const { MovieData } = this.state;
        if (!MovieData) {
            return <div>Loading...</div>;
        }
        return (
            <div className="moviepage loading " style={{ animation: 'fadeIn 1s' }}>
                <canvas className="canvas-background" />
                <Carousel MovieData={MovieData} />
                <Introduction MovieData={MovieData} />
            </div>
        );
    }
}
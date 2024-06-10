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
            return new Promise((resolve, reject) => {
                movieServer.getMovieList()
                    .then(response => response.data)
                    .then(data => {
                        this.setState({ MovieData: data }, resolve);
                    });
            })
        }
        const preloadImages = () => {
            return new Promise((resolve, reject) => {
                imagesLoaded(document.querySelectorAll('.carousel-container img'), resolve);
            });
        };
        Promise.all([preloadImages(), preloadList()]).then(() => {
            const moviepage = document.getElementById('moviepage');
            if (moviepage) {
                moviepage.classList.remove('loading');
            }
        });
    }
    render() {
        const { MovieData } = this.state;
        if (!MovieData) {
            return <div>Loading...</div>;
        }
        return (
            <div id="moviepage" className="loading page">
                <canvas className="canvas-background" />
                <Carousel MovieData={MovieData} />
                <Introduction MovieData={MovieData} />
            </div>
        );
    }
}
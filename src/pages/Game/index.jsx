import React, { Component } from "react";
import './style.css';
import Slider from "./slider.jsx";
import Slideshow from './main.js';
import Content from "./content.jsx";
import Frame from "./frame.jsx";
import { gameServer } from '../../services';
const imagesLoaded = require('imagesloaded');

export default class Game extends Component {
    constructor(props) {
        super(props);
        this.state = {
            translate: false,
            GameData: null,
        };
    }
    componentDidMount() {
        const preloadList = () => {
            return new Promise((resolve, reject) => {
                gameServer.getGameList()
                    .then(response => response.data)
                    .then(data => {
                        this.setState({ GameData: data }, resolve);
                    })
            });
        }
        const preloadImages = () => {
            return new Promise((resolve, reject) => {
                imagesLoaded(document.querySelectorAll('.slide__img'), { background: true }, resolve);
            });
        };
        Promise.all([preloadImages(), preloadList()]).then(() => {
            const gamepage = document.getElementById('gamepage');
            let images = this.state.GameData.map(game => game.background);
            gamepage.slideshow = new Slideshow(document.querySelector('.slideshow'), images);
            gamepage.classList.remove('loading');
        });
    }
    onTranslate = () => {
        this.setState(prevState => ({ translate: !prevState.translate }));
    };
    render() {
        const { GameData } = this.state;
        if (!GameData) {
            return <div>Loading...</div>;
        }
        return (
            <div id="gamepage" className="page loading">
                <Frame onTranslate={this.onTranslate} />
                <Slider GameData={GameData} />
                <Content GameData={GameData} isTranslate={this.state.translate} />
            </div>
        )
    }
}
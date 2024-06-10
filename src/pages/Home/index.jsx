import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './style.css';
import Navigation from './navigation';
const imagesLoaded = require('imagesloaded');
const WebFont = require('webfontloader');

export default class Home extends Component {
    componentDidMount() {
        document.body.style.overflow = 'hidden';
        const preloadImages = () => {
            return new Promise((resolve, reject) => {
                imagesLoaded(document.querySelectorAll('.screen'), { background: true }, resolve);
            });
        };
        const preloadFonts = () => {
            return new Promise((resolve, reject) => {
                WebFont.load({
                    typekit: {
                        id: 'cze1cgq'
                    },
                    active: resolve
                });
            });
        };
        Promise.all([preloadImages(), preloadFonts()]).then(() => {
            new Navigation(document.querySelector('.menu'));
            const homepage = document.getElementById('homepage');
            homepage.classList.remove('loading');
        });
    }
    componentWillUnmount() {
        document.body.style.overflow = 'auto';
    }
    render() {
        return (
            <div id='homepage' className="loading page">
                <div className="screens" aria-hidden="true">
                    <div className="screen-item" style={{ '--bg-img': 'url(images/1.jpg)' }}>
                        <div className="screen screen--full"></div>
                        <div className="screen screen--clip screen--clip-1"></div>
                    </div>
                    <div className="screen-item" style={{ '--bg-img': 'url(images/2.jpg)' }}>
                        <div className="screen screen--full"></div>
                        <div className="screen screen--clip screen--clip-1"></div>
                    </div>
                    <div className="screen-item" style={{ '--bg-img': 'url(images/3.jpg)' }}>
                        <div className="screen screen--full"></div>
                        <div className="screen screen--clip screen--clip-1"></div>
                    </div>
                    <div className="screen-item" style={{ '--bg-img': 'url(images/4.jpg)' }}>
                        <div className="screen screen--full"></div>
                        <div className="screen screen--clip screen--clip-1"></div>
                    </div>
                </div>
                <div className="content">
                    <nav className="menu">
                        <span className="menu-item" href="#">
                            <span className="menu-item-tag">Watch something?</span>
                            <Link className="menu-item-link" to="/movie">Movie</Link>
                        </span>
                        <span className="menu-item" href="#">
                            <span className="menu-item-tag">Let's listen!</span>
                            <Link className="menu-item-link" to="/music">Music</Link>
                        </span><br />
                        <span className="menu-item" href="#">
                            <span className="menu-item-tag">No game no life.</span>
                            <Link className="menu-item-link" to="/game">Game</Link>
                        </span>
                        <span className="menu-item" href="#">
                            <span className="menu-item-tag">Long time no read.</span>
                            <Link className="menu-item-link" to="/book">Book</Link>
                        </span>
                    </nav>
                </div>
            </div>
        )
    }
}
import React, { Component } from "react";
import './style.css';
import './main.js';
import Motion from "./motion";
import Message from "./message";
const imagesLoaded = require('imagesloaded');

export default class Board extends Component {
    componentDidMount() {
        const preloadImages = () =>
            Promise.all([
                imagesLoaded(document.querySelectorAll('.boardpage'), { background: true }),
                imagesLoaded(document.querySelectorAll('.stack img'))
            ]);
        preloadImages().then(() => {
            const boardpage = document.getElementById('boardpage');
            if (boardpage) {
                boardpage.classList.remove('loading');
            }
        });
    }
    render() {
        return (
            <div id="boardpage" className="page loading" style={{ backgroundImage: 'url(images/board.jpg)' }}>
                <section className="board-content">
                    <div className="grid grid--effect-hamal">
                        <Motion />
                        <Message />
                    </div>
                </section>
            </div>
        )
    }
}
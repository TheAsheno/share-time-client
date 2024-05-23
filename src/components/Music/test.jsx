import React from "react";
import './style.css';

const Test = () => {
    return (
        <section className="music-player-section row">
            <div className="music-info col-2">
                <h1 className="current-song-name">song 2</h1>
                <p className="artist-name hide">artist 2</p>
            </div>
            <div className="music-navbar col-8">
                <div className="controls">
                    <i className="bi bi-repeat side"></i>
                    <div className="main">
                        <i className="bi bi-skip-backward-fill active"></i>
                        <i className="bi bi-play-circle-fill active center"></i>
                        <i className="bi bi-pause-circle-fill center"></i>
                        <i className="bi bi-skip-forward-fill active"></i>
                    </div>
                    <input type="range" className="volume-slider" max="1" value="1" step="0.1" />
                    <i className="bi bi-volume-up-fill side"></i>
                </div>
                <div className="music-seek-bar-container">
                    <p className="current-time">0:00</p>
                    <input type="range" className="music-seek-bar" value="0" />
                    <p className="duration">0:00</p>
                </div>
            </div>
            <div className="col-2">

            </div>
        </section>
    )
}

export default Test;
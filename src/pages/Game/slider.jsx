import React from "react";
import { BASE_URL } from "../../config/constants";

const Slider = ({ GameData }) => {
    return (
        <div className="slideshow">
            <div className="slideshow__deco"></div>
            {GameData.map((game, index) => (
                <div key={index} className="slide">
                    <div className="slide__img-wrap">
                        <div className="slide__img" style={{ backgroundImage: `url(${BASE_URL}/game/images/${encodeURIComponent(GameData[index].image)})` }}></div>
                    </div>
                    <div className="slide__side">{game.side}</div>
                    <div className="slide__title-wrap">
                        <span className="slide__number">{index + 1}</span>
                        <h3 className="slide__title">{game.name}</h3>
                    </div>
                </div>
            ))}
            <i className="game-nav nav--prev bi bi-arrow-up-left" />
            <i className="game-nav nav--next bi bi-arrow-down-right" />
        </div>
    )
}

export default Slider;
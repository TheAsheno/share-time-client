import React from "react";

const Content = ({ GameData, isTranslate }) => {
    return (
        <div className="game-content">
            {GameData.map((game, index) => (
                <div className="content__item" key={index}>
                    <span className="content__number">{index + 1}</span>
                    <h3 className="content__title">{isTranslate ? game.name2 : game.name}</h3>
                    <h4 className="content__subtitle">{isTranslate ? game.subtitle2 : game.subtitle}</h4>
                    <div className="content__text">{isTranslate ? game.text2 : game.text}</div>
                </div>
            ))}
            <i className="bi bi-arrow-left content__close" />
        </div>
    );
}
export default Content;
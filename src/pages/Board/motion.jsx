import React, { useEffect } from "react";
import HamalFx from './main';

const Motion = () => {
    const currentDate = new Date();
    const dateString = `${currentDate.getFullYear()}-${currentDate.getMonth() + 1}-${currentDate.getDate()}`;
    useEffect(() => {
        const gridItems = document.querySelectorAll('.grid--effect-hamal > .grid__item');
        gridItems.forEach(stackEl => new HamalFx(stackEl));
    }, []);
    return (
        <div className="grid__item grid__item--c4">
            <div className="stack">
                <div className="stack__deco"></div>
                <div className="stack__deco"></div>
                <div className="stack__deco"></div>
                <div className="stack__deco"></div>
                <div className="stack__figure">
                    <img className="stack__img" src="images/letter.jpg" alt="Image" />
                </div>
            </div>
            <div className="grid__item-caption">
                <h3 className="grid__item-title">Message Board</h3>
                <div className="column column--left">
                    <span className="column__text">To</span>
                    <span className="column__text">Date</span>
                    <span className="column__text">Status</span>
                </div>
                <div className="column column--right">
                    <span className="column__text">Asheno</span>
                    <span className="column__text">{dateString}</span>
                    <span className="column__text">Alive</span>
                </div>
            </div>
        </div>
    );
}

export default Motion;
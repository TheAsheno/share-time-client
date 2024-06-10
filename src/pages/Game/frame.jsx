import React from "react";

const Frame = ({ onTranslate }) => {
    return (
        <div className="game-frame" >
            <header className="game-header">
                <i className="bi bi-translate" onClick={onTranslate}/>
            </header>
        </div>
    )
}
export default Frame;
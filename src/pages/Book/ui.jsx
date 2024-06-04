import React from 'react';

function UI({ onNext, onPrev, onTranslate }) {
    return (
        <div className="content content--fixed" style={{ backgroundImage: 'url(images/book-background.jpg)' }}>
            <header className="header">
            </header>
            <nav className="controller">
                <i className="bi bi-translate" onClick={onTranslate} />
                <i className="bi bi-arrow-left" onClick={onPrev} />
                <i className="bi bi-arrow-right" onClick={onNext} />
            </nav>
            <div className="deco deco--title">detective & science fiction</div>
        </div>
    );
}

export default UI;
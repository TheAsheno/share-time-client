import React from 'react';

function UI({ onNext, onPrev, onTranslate }) {
    return (
        <div className="ui-content ui-content--fixed" style={{ backgroundImage: 'url(images/book-background.jpg)' }}>
            <header className="ui-header">
            </header>
            <nav className="ui-controller">
                <i className="bi bi-translate" onClick={onTranslate} />
                <i className="bi bi-arrow-left" onClick={onPrev} />
                <i className="bi bi-arrow-right" onClick={onNext} />
            </nav>
            <div className="ui-deco">detective & science fiction</div>
        </div>
    );
}

export default UI;
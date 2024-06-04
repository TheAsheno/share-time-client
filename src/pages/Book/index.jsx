import React, { Component } from 'react';
import './style.css';
import Content from './content';
import Ui from './ui';
import { bookServer } from '../../services';
const imagesLoaded = require('imagesloaded');

export default class Book extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentContent: 0,
            translate: false,
            BookData: null,
            dataLength: 0,
        };
    }
    componentDidMount() {
        const preloadList = () => {
            return bookServer.getBookList()
                .then(response => response.data)
                .then(data => {
                    this.setState({ BookData: data });
                    this.setState({ dataLength: data.length});
                });
        }
        const preloadImages = () => {
            return new Promise((resolve, reject) => {
                imagesLoaded(document.querySelectorAll('.fragment-wrap'), { background: true }, resolve);
            });
        };
        Promise.all([preloadImages(), preloadList()]).then(() => {
            const observer = new MutationObserver((mutationsList, observer) => {
                for (let mutation of mutationsList) {
                    if (mutation.type === 'childList') {
                        const moviepage = document.querySelector('.bookpage');
                        if (moviepage) {
                            moviepage.classList.remove('loading');
                            observer.disconnect();
                        }
                    }
                }
            });
            observer.observe(document.body, { childList: true, subtree: true });
        });
    }
    onNext = () => {
        this.setState({ translate: false });
        this.setState(prevState => ({ currentContent: (prevState.currentContent + 1) % this.state.dataLength }));
    };
    onPrev = () => {
        this.setState({ translate: false });
        this.setState(prevState => ({ currentContent: prevState.currentContent - 1 < 0 ? this.state.dataLength - 1 : prevState.currentContent - 1 }));
    };
    onTranslate = () => {
        this.setState(prevState => ({ translate: !prevState.translate }));
    };
    render() {
        const { BookData } = this.state;
        if (!BookData) {
            return <div>Loading...</div>;
        }
        return (
            <div className='bookpage loading' style={{ animation: 'fadeIn 1s' }}>
                <Ui onNext={this.onNext} onPrev={this.onPrev} onTranslate={this.onTranslate} />
                <Content key={this.state.currentContent} index={this.state.currentContent} BookData={BookData} isTranslate={this.state.translate} />
            </div>
        )
    }
};
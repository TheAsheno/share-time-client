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
            return new Promise((resolve, reject) => {
                bookServer.getBookList()
                .then(response => response.data)
                .then(data => {
                    this.setState({ BookData: data, dataLength: data.length }, resolve);
                });
            })
        }
        const preloadImages = () => {
            return new Promise((resolve, reject) => {
                imagesLoaded(document.querySelectorAll('.fragment-wrap'), { background: true }, resolve);
            });
        };
        Promise.all([preloadImages(), preloadList()]).then(() => {
            const moviepage = document.getElementById('bookpage');
            if (moviepage) {
                moviepage.classList.remove('loading');
            }
        });
    }
    onNext = () => {
        this.setState(prevState => ({ currentContent: (prevState.currentContent + 1) % this.state.dataLength }));
    };
    onPrev = () => {
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
            <div id='bookpage' className='loading page'>
                <Ui onNext={this.onNext} onPrev={this.onPrev} onTranslate={this.onTranslate} />
                <Content key={this.state.currentContent} index={this.state.currentContent} BookData={BookData} isTranslate={this.state.translate} />
            </div>
        )
    }
};
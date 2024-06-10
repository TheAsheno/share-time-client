import React, { Component } from 'react';
import './style.css';
import Player from './Player';

export default class Music extends Component {
    render() {
        return (
            <div className='musicpage page'>
                <Player />
            </div>
        )
    }
};
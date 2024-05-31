import React, { useState } from 'react';
import Controller from './Controller';
import Lyricify from './Lyrics';
import List from './List';

const Player = () => {
    const [isListShow, setIsListShow] = useState(false);
    const onChangeList = () => {
        setIsListShow(!isListShow);
    }
    return (
        <section className='music-player-section'>
            <Lyricify />
            <div className={`list-container ${isListShow ? 'active' : ''}`}>
                <List />
            </div>
            <Controller onChangeList={onChangeList} />
        </section>
    );
};

export default Player;
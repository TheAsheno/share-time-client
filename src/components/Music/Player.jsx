import React, { useState, useEffect, useRef } from 'react';
import server from '../../services/api';
import Controller from './Controller';
import Lyricify from './Lyrics';
import List from './List';

const Player = () => {
    const [files, setFiles] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const audioRef = useRef(null);
    const [isListShow, setIsListShow] = useState(false);
    const [isFirstLoad, setIsFirstLoad] = useState(true);
    const currentSong = files[currentIndex];
    useEffect(() => {
        server.getMusic()
            .then(response => response.data)
            .then(file => {
                setFiles(file);
            });
    }, []);
    useEffect(() => {
        if (currentSong && audioRef.current && !isFirstLoad) {
            audioRef.current.play();
        }
    }, [currentSong]);
    const musicPlaying = (index) => {
        setIsFirstLoad(false);
        setCurrentIndex(index);
    };
    const onPlay = () => {
        if (audioRef.current) {
            audioRef.current.play();
        }
    };
    const onPause = () => {
        if (audioRef.current) {
            audioRef.current.pause();
        }
    };
    const onPrev = () => {
        const newIndex = currentIndex > 0 ? currentIndex - 1 : files.length - 1;
        setIsFirstLoad(false);
        setCurrentIndex(newIndex);
    };
    const onNext = () => {
        const newIndex = (currentIndex + 1) % files.length;
        setIsFirstLoad(false);
        setCurrentIndex(newIndex);
    };
    const onChangeList = () => {
        setIsListShow(!isListShow);
    }
    if (!currentSong) {
        return <div>Loading...</div>;
    }
    return (
        <section className='music-player-section'>
            <audio src={`http://localhost:3001/music/audios/${encodeURIComponent(currentSong.name)}.${currentSong.type}`} ref={audioRef} />
            <Lyricify currentSong={currentSong} audioRef={audioRef} />
            <div className={`list-container ${isListShow ? 'active' : ''}`}>
                <List files={files} musicPlaying={musicPlaying} currentIndex={currentIndex} />
            </div>
            <Controller audioRef={audioRef} onPlay={onPlay} onPause={onPause} onPrev={onPrev} onNext={onNext} onChangeList={onChangeList} currentSong={currentSong} />
        </section>
    );
};

export default Player;
import React, { useState, useEffect, useRef } from 'react';
import server from '../../services/api';
import Controller from './Controller';
import Lyricify from './Lyrics';
import List from './List';

const Player = () => {
    const [files, setFiles] = useState([]);
    const [currentFile, setCurrentFile] = useState('');
    const [currentIndex, setCurrentIndex] = useState(0);
    const audioRef = useRef(null);
    const [isListShow, setIsListShow] = useState(false);
    const [isFirstLoad, setIsFirstLoad] = useState(true);
    useEffect(() => {
        server.getMusic()
            .then(response => response.data)
            .then(file => {
                setFiles(file);
                setCurrentFile(`${encodeURIComponent(file[currentIndex].name)}.${file[currentIndex].type}`);
            });
    }, []);
    useEffect(() => {
        if (currentFile && audioRef.current && !isFirstLoad) {
            audioRef.current.play();
        }
    }, [currentFile]);
    const musicPlaying = (index) => {
        setIsFirstLoad(false);
        setCurrentIndex(index);
        setCurrentFile(`${encodeURIComponent(files[index].name)}.${files[index].type}`);
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
        setCurrentFile(`${encodeURIComponent(files[newIndex].name)}.${files[newIndex].type}`);
    };
    const onNext = () => {
        const newIndex = (currentIndex + 1) % files.length;
        setIsFirstLoad(false);
        setCurrentIndex(newIndex);
        setCurrentFile(`${encodeURIComponent(files[newIndex].name)}.${files[newIndex].type}`);
    };
    const onChangeList = () => {
        setIsListShow(!isListShow);
    }
    return (
        <section className='music-player-section'>
            <audio src={`http://localhost:3001/music/audios/${currentFile}`} ref={audioRef} />
            <Lyricify />
            <div className={`list-container ${isListShow ? 'active' : ''}`}>
                <List files={files} musicPlaying={musicPlaying} currentIndex={currentIndex} />
            </div>
            <Controller audioRef={audioRef} onPlay={onPlay} onPause={onPause} onPrev={onPrev} onNext={onNext} onChangeList={onChangeList} files={files} currentIndex={currentIndex} />
        </section>
    );
};

export default Player;
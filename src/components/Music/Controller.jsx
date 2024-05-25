import React, { useEffect, useState, useRef } from "react";

const Controller = ({ audioRef, onPlay, onPause, onPrev, onNext, onChangeList, files, currentIndex }) => {
    const [bartime, setBarTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const isDragging = useRef(false);
    const [isHovered, setIsHovered] = useState(false);
    const [volume, setVolume] = useState(0.3);
    const [isMuted, setIsMuted] = useState(false);
    const [isLooping, setIsLooping] = useState(false);
    const currentSong = files[currentIndex];
    const handleChange = (event) => {
        setBarTime(event.target.value);
    };
    const handleVolumeChange = (event) => {
        setVolume(event.target.value);
        if (audioRef.current) {
            audioRef.current.volume = event.target.value;
        }
    }
    const onChangeVolume = () => {
        if (audioRef.current) {
            if (isMuted) {
                audioRef.current.volume = volume;
                setIsMuted(false);
            }
            else {
                audioRef.current.volume = 0;
                setIsMuted(true);
            }
        }
    }
    const onRepeat = () => {
        if (audioRef.current) {
            audioRef.current.loop = !audioRef.current.loop;
            setIsLooping(audioRef.current.loop);
        }
    }
    useEffect(() => {
        if (audioRef.current) {
            const audioElement = audioRef.current;
            audioElement.volume = 0.3;
            audioElement.addEventListener('loadedmetadata', () => {
                setDuration(audioElement.duration);
            });
            audioElement.addEventListener('timeupdate', () => {
                if (!isDragging.current) {
                    setBarTime(audioElement.currentTime);
                }
            });
            return () => {
                audioElement.removeEventListener('loadedmetadata', () => { });
                audioElement.removeEventListener('timeupdate', () => { });
            };
        }
    }, [audioRef]);
    if (!currentSong) {
        return <div>Loading...</div>;
    }
    const timeprogress = (bartime - 0) / (duration - 0) * 100 + 0.5;
    const volumeprogress = (volume - 0) / (1 - 0) * 100;
    return (
        <div className="music-navbar row">
            <div className="music-info col-3 d-none d-md-flex">
            <img src={`http://localhost:3001/music/covers/${encodeURIComponent(currentSong.album)}.jpg`} alt={currentSong.name} className="music-image" />
                <div>
                    <p className="music-name">{currentSong.name}</p>
                    <p className="music-author">{currentSong.artist}</p>
                </div>
            </div>
            <div className="music-control-bar col-12 col-md-6">
                <div className="controls">
                    <i className={`bi bi-repeat side ${isLooping ? 'active' : ''}`} onClick={onRepeat} />
                    <div className="main">
                        <i className="bi bi-skip-backward-fill active" onClick={onPrev} />
                        <i className={`bi bi-play-circle-fill center ${audioRef.current && !audioRef.current.paused ? '' : 'active'}`} onClick={onPlay} />
                        <i className={`bi bi-pause-circle-fill center ${audioRef.current && !audioRef.current.paused ? 'active' : ''}`} onClick={onPause} />
                        <i className="bi bi-skip-forward-fill active" onClick={onNext} />
                    </div>
                    <div className="volume-container"
                        onMouseEnter={() => setIsHovered(true)}
                        onMouseLeave={() => setIsHovered(false)}>
                        <i className={`bi bi-volume-up-fill side ${isMuted ? '' : 'active'} ${isHovered ? 'bright' : ''}`} onClick={onChangeVolume} />
                        <i className={`bi bi-volume-mute-fill side ${isMuted ? 'active' : ''} ${isHovered ? 'bright' : ''}`} onClick={onChangeVolume} />
                        <input type="range" className={`volume-slider ${isHovered ? 'active' : ''}`} min="0" max="1" value={volume} step="0.05" onChange={handleVolumeChange}
                            style={{
                                background: `linear-gradient(to right, white 0%, white ${volumeprogress}%, grey ${volumeprogress}%, grey 100%)`
                            }} />
                    </div>
                </div>
                <div className="music-seek-bar-container">
                    <p className="current-time">{formatTime(bartime)}</p>
                    <input type="range" className="music-seek-bar" id="slider" value={bartime} min="0" max={duration}
                        onMouseDown={() => { isDragging.current = true; }}
                        onMouseUp={() => {
                            isDragging.current = false;
                            if (audioRef.current) {
                                audioRef.current.currentTime = bartime;
                            }
                        }}
                        onChange={handleChange}
                        style={{
                            background: `linear-gradient(to right, white 0%, white ${timeprogress}%, grey ${timeprogress}%, grey 100%)`
                        }} />
                    <p className="duration">{formatTime(duration)}</p>
                </div>
            </div>
            <div className="col-3 sidebar d-none d-md-flex">
                <i className="bi bi-plus-circle" />
                <i className="bi bi-music-note-list" onClick={onChangeList} />
            </div>
        </div>
    )
}

export default Controller;

function formatTime(time) {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
}
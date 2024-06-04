import React, { useEffect, useState, useRef, useContext } from "react";
import { AudioContext } from "../../components";

const Controller = ({ onChangeList}) => {
    const { currentSong, audioRef, onPrev, onNext, duration, volume, setVolume, isMuted, setIsMuted, isLooping, setIsLooping, albumCovers } = useContext(AudioContext);
    const isDragging = useRef(false);
    const [isBarHovered, setIsBarHovered] = useState(false);
    const [isVolumnHovered, setIsVolumnHovered] = useState(false);
    const [bartime, setBarTime] = useState(0);
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
    const onRepeat = () => {
        if (audioRef.current) {
            audioRef.current.loop = !audioRef.current.loop;
            setIsLooping(audioRef.current.loop);
        }
    }
    useEffect(() => {
        if (audioRef.current) {
            const audio = audioRef.current;
            setBarTime(audio.currentTime);
            if (!isMuted) {
                audio.volume = volume;
            }
            const ControllerTimeUpdate = () => {
                if (!isDragging.current) {
                    setBarTime(audio.currentTime);
                }
            };
            audio.addEventListener('timeupdate', ControllerTimeUpdate);
            return () => {
                if (audio) {
                    audio.removeEventListener('timeupdate', ControllerTimeUpdate);
                }
            };
        }
    }, [audioRef]);
    const timeprogress = (bartime - 0) / (duration - 0) * 100 + 0.5;
    const volumeprogress = (volume - 0) / (1 - 0) * 100;
    return (
        <div className="music-navbar row">
            <div className="music-info col-3 d-none d-md-flex">
                <img src={albumCovers[currentSong.album]} alt={currentSong.name} className="music-image" />
                <div>
                    <p className="music-name">{currentSong.name}</p>
                    <p className="music-author">{currentSong.artist}</p>
                </div>
            </div>
            <div className="music-control-bar col-12 col-md-6">
                <div className="controls">
                    <i className={`bi bi-repeat side ${isLooping ? 'active' : ''}`} onClick={onRepeat} />
                    <div className="controls-main">
                        <i className="bi bi-skip-backward-fill active" onClick={onPrev} />
                        <i className={`bi bi-play-circle-fill center ${audioRef.current && !audioRef.current.paused ? '' : 'active'}`} onClick={onPlay} />
                        <i className={`bi bi-pause-circle-fill center ${audioRef.current && !audioRef.current.paused ? 'active' : ''}`} onClick={onPause} />
                        <i className="bi bi-skip-forward-fill active" onClick={onNext} />
                    </div>
                    <div className="volume-container"
                        onMouseEnter={() => setIsVolumnHovered(true)}
                        onMouseLeave={() => setIsVolumnHovered(false)}>
                        <i className={`bi bi-volume-up-fill side ${isMuted ? '' : 'active'} ${isVolumnHovered ? 'bright' : ''}`} onClick={onChangeVolume} />
                        <i className={`bi bi-volume-mute-fill side ${isMuted ? 'active' : ''} ${isVolumnHovered ? 'bright' : ''}`} onClick={onChangeVolume} />
                        <input type="range" className={`volume-slider ${isVolumnHovered ? 'hovered' : ''}`} min="0" max="1" value={volume} step="0.05" onChange={handleVolumeChange}
                            style={{
                                background: `linear-gradient(to right, white 0%, white ${volumeprogress}%, grey ${volumeprogress}%, grey 100%)`
                            }} />
                    </div>
                </div>
                <div className="music-seek-bar-container">
                    <p className="current-time">{formatTime(bartime)}</p>
                    <input type="range" className={`music-seek-bar ${isBarHovered ? 'hovered' : ''}`} value={bartime} min="0" max={duration}
                        onMouseDown={() => { isDragging.current = true; }}
                        onMouseUp={() => {
                            isDragging.current = false;
                            if (audioRef.current) {
                                audioRef.current.currentTime = bartime;
                            }
                        }}
                        onMouseEnter={() => setIsBarHovered(true)}
                        onMouseLeave={() => setIsBarHovered(false)}
                        onChange={handleChange}
                        style={{
                            background: `linear-gradient(to right, ${isBarHovered ? '#41B06E' : 'white'} 0%, ${isBarHovered ? '#41B06E' : 'white'} ${timeprogress}%, grey ${timeprogress}%, grey 100%)`
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
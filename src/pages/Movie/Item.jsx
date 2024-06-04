import React, { useState, useRef } from "react";
import { BASE_URL } from '../../config/constants';

const Item = ({ id, data }) => {
    const audioRef = useRef(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const onPlay = () => {
        if (audioRef.current) {
            audioRef.current.volume = 0.3;
            audioRef.current.play();
            setIsPlaying(true);
        }
    };
    const onPause = () => {
        if (audioRef.current) {
            audioRef.current.pause();
            setIsPlaying(false);
        }
    };
    return (
        <div id={id} className="movie-item" style={{ '--bg-img': `url(${BASE_URL}/movie/images/${encodeURIComponent(data.background)})` }}>
            <div className="movie-text movie-text-hidden">
                <p>{data.text}</p>
                {data.text2 && <p>{data.text2}</p>}
            </div>
            <h2 className="movie-info movie-info--hidden">
                <div className="movie-headline" >
                    <p className="movie-name">{data.name}</p><p className="movie-director">{data.director}</p>
                </div>
                <p className="movie-name2">{data.name2}</p>
            </h2>
            <div className="movie-extra">
                <audio ref={audioRef} src={`${BASE_URL}/movie/bgm/${encodeURIComponent(data.bgm)}`} />
                <i className={`bi bi-play-circle movie-bgm ${isPlaying ? '' : 'active'}`} onClick={onPlay} />
                <i className={`bi bi-pause-circle movie-bgm ${isPlaying ? 'active' : ''}`} onClick={onPause} />
                <i className="bi bi-box-arrow-up-right movie-link" onClick={() => window.open(`${data.link}`, "_blank")} />
            </div>
        </div>
    );
}

export default Item;
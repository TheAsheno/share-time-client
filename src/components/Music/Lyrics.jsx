import React, { useEffect, useState, useRef } from "react";
import server from "../../services/api";
import ColorThief from 'colorthief';

const Lyrics = ({ currentSong, audioRef }) => {
    const [currentTime, setCurrentTime] = useState('');
    const [currentLyc, setCurrentLyc] = useState(0);
    const [lyricList, setLyricList] = useState([]);
    const lyricRefs = useRef([]);
    const colorThief = new ColorThief();
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.src = `http://localhost:3001/music/covers/${encodeURIComponent(currentSong.album)}.jpg`;
    img.onload = function () {
        const palette = colorThief.getPalette(img, 2);
        const color1 = palette[0];
        const color2 = palette[1];
        const musicLyricify = document.querySelector('.music-lyricify');
        musicLyricify.style.background = `linear-gradient(45deg, rgba(${color1[0]}, ${color1[1]}, ${color1[2]}, 0.9), rgba(${color2[0]}, ${color2[1]}, ${color2[2]}, 0.9))`;
        musicLyricify.style.backdropFilter = 'blur(10px)';
    };
    useEffect(() => {
        server.getLyrics(currentSong.name)
            .then(response => response.data)
            .then(lyrics => {
                const lines = lyrics.split(/[\n]/);
                const list = lines.map(line => {
                    const temp = line.split(/\[(.+?)\]/);
                    return {
                        time: temp[1],
                        lyc: temp[2]
                    };
                }).filter(v => v.lyc);
                setCurrentLyc(0);
                setLyricList(list);
                lyricRefs.current = list.map(() => React.createRef());
            });
    }, [currentSong]);
    useEffect(() => {
        audioRef.current.addEventListener('timeupdate', LyricsTimeUpdate);
        return () => {
            if (audioRef.current) {
                audioRef.current.removeEventListener('timeupdate', LyricsTimeUpdate);
            }
        };
    }, [lyricList]);
    const LyricsTimeUpdate = () => {
        const currentTime = format(audioRef.current.currentTime);
        setCurrentTime(currentTime);
        const nextLyc = lyricList.findIndex(lyric => lyric.time > currentTime);
        if (nextLyc !== -1) {
            setCurrentLyc(nextLyc > 0 ? nextLyc - 1 : 0);
        } else {
            setCurrentLyc(lyricList.length - 1);
        }
    };
    useEffect(() => {
        if (lyricRefs.current[currentLyc] && lyricRefs.current[currentLyc].current) {
            const offsetTop = lyricRefs.current[currentLyc].current.offsetTop;
            const parentHeight = lyricRefs.current[currentLyc].current.parentElement.offsetHeight;
            console.log(offsetTop, parentHeight);
            const scrollTop = offsetTop - parentHeight / 2 + 15;
            lyricRefs.current[currentLyc].current.parentElement.scrollTop = scrollTop;
        }
    }, [currentLyc]);
    const format = (value) => {
        if (!value) return '';
        const interval = Math.floor(value);
        const minute = (Math.floor(interval / 60)).toString().padStart(2, '0');
        const second = (interval % 60).toString().padStart(2, '0');
        return `${minute}:${second}`;
    };
    return (
        <div className="music-lyricify">
            {lyricList.map((lyric, index) => (
                <p key={index} ref={lyricRefs.current[index]} className={index === currentLyc ? 'current-lyric' : (index < currentLyc ? 'white-lyric' : '')}>
                    {lyric.lyc}
                </p>
            ))}
        </div>
    );
}
export default Lyrics;
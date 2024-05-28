import React, { useEffect, useState, useRef } from "react";
import server from "../../services/api";
import ColorThief from 'colorthief';

const Lyrics = ({ currentSong, audioRef }) => {
    const [currentLyc, setCurrentLyc] = useState(0);
    const [lyricList, setLyricList] = useState([]);
    const [userIsScrolling, setUserIsScrolling] = useState(false);
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
        let scrollTimeout = null;
        const handleScroll = () => {
            setUserIsScrolling(true);
            clearTimeout(scrollTimeout);
            scrollTimeout = setTimeout(() => {
                setUserIsScrolling(false);
            }, 1000);
        };
        const scrollContainer = document.querySelector('.music-lyricify');
        scrollContainer.addEventListener('wheel', handleScroll);
        return () => {
            scrollContainer.removeEventListener('wheel', handleScroll);
            clearTimeout(scrollTimeout);
        };
    }, []);
    useEffect(() => {
        const currentAudioRef = audioRef.current;
        audioRef.current.addEventListener('timeupdate', LyricsTimeUpdate);
        return () => {
            if (currentAudioRef) {
                currentAudioRef.removeEventListener('timeupdate', LyricsTimeUpdate);
            }
        };
    }, [lyricList]);
    const LyricsTimeUpdate = () => {
        const currentTime = audioRef.current.currentTime;
        const nextLyc = lyricList.findIndex(lyric => timeToSeconds(lyric.time) > currentTime);
        if (nextLyc !== -1) {
            setCurrentLyc(nextLyc > 0 ? nextLyc - 1 : 0);
        } else {
            setCurrentLyc(lyricList.length - 1);
        }
    };
    useEffect(() => {
        if (!userIsScrolling && lyricRefs.current[currentLyc] && lyricRefs.current[currentLyc].current) {
            const offsetTop = lyricRefs.current[currentLyc].current.offsetTop;
            const parentHeight = lyricRefs.current[currentLyc].current.parentElement.offsetHeight;
            const scrollTop = offsetTop - parentHeight / 2 + 15;
            lyricRefs.current[currentLyc].current.parentElement.scrollTop = scrollTop;
        }
    }, [currentLyc]);
    const timeToSeconds = (time) => {
        const parts = time.split(':').map(part => {
            if (part.includes('.')) {
                return parseFloat(part);
            }
            return parseInt(part, 10);
        });
    
        let seconds = 0;
        if (parts.length === 2) {
            seconds = parts[0] * 60 + parts[1];
        } else if (parts.length === 3) {
            seconds = parts[0] * 3600 + parts[1] * 60 + parts[2];
        }
        return seconds;
    };
    return (
        <div className="music-lyricify">
            {lyricList.map((lyric, index) => (
                <p
                    key={index}
                    ref={lyricRefs.current[index]}
                    className={`lyric ${index === currentLyc ? 'current-lyric' : (index < currentLyc ? 'white-lyric' : '')}`}
                    onClick={() => {
                        audioRef.current.currentTime = timeToSeconds(lyric.time);
                    }}
                >
                    {lyric.lyc}
                </p>
            ))}
        </div>
    );
}
export default Lyrics;
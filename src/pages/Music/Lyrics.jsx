import React, { useEffect, useState, useContext } from "react";
import ColorThief from 'colorthief';
import { AudioContext } from "../../components";

const Lyrics = () => {
    const { currentSong, audioRef, currentLyc, setCurrentLyc, lyricList, lyricRefs, albumCovers } = useContext(AudioContext);
    const [userIsScrolling, setUserIsScrolling] = useState(false);
    const colorThief = new ColorThief();
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.src = albumCovers[currentSong.album];
    img.onload = function () {
        const palette = colorThief.getPalette(img, 2);
        const color1 = palette[0];
        const color2 = palette[1];
        const musicLyricify = document.querySelector('.music-lyricify');
        musicLyricify.style.background = `linear-gradient(45deg, rgba(${color1[0]}, ${color1[1]}, ${color1[2]}, 0.9), rgba(${color2[0]}, ${color2[1]}, ${color2[2]}, 0.9))`;
        musicLyricify.style.backdropFilter = 'blur(10px)';
    };
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
            const scrollTop = offsetTop - parentHeight / 2 + 20;
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
                        setUserIsScrolling(false);
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
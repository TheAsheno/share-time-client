import { createContext, useRef, useState, useEffect, createRef } from 'react';
import musicServer from '../../services/musicApi';

export const AudioContext = createContext();

export const AudioProvider = ({ children }) => {
    const [files, setFiles] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const audioRef = useRef(null);
    const [duration, setDuration] = useState(0);
    const [volume, setVolume] = useState(0.3);
    const [isMuted, setIsMuted] = useState(false);
    const [isLooping, setIsLooping] = useState(false);
    const [isFirstLoad, setIsFirstLoad] = useState(true);
    const [currentLyc, setCurrentLyc] = useState(0);
    const [lyricList, setLyricList] = useState([]);
    const lyricRefs = useRef([]);
    const [albumCovers, setAlbumCovers] = useState({});
    const currentSong = files[currentIndex];
    useEffect(() => {
        musicServer.getMusicList()
            .then(response => response.data)
            .then(files => {
                setFiles(files);
                const newAlbumCovers = {};
                files.forEach(song => {
                    if (!albumCovers[song.album]) {
                        newAlbumCovers[song.album] = `http://localhost:3001/music/covers/${encodeURIComponent(song.album)}.jpg`;
                    }
                });
                setAlbumCovers(prev => ({ ...prev, ...newAlbumCovers }));
            });
    }, []);
    useEffect(() => {
        if (!currentSong) {
            return;
        }
        musicServer.getLyrics(currentSong.name)
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
                lyricRefs.current = list.map(() => createRef());
            });
    }, [currentSong]);
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
    const musicPlaying = (index) => {
        setIsFirstLoad(false);
        setCurrentIndex(index);
    };
    useEffect(() => {
        if (audioRef.current) {
            const audio = audioRef.current;
            const onEnded = () => {
                onNext();
            };
            const ControllerLoadedMetadata = () => {
                setDuration(audio.duration);
            };
            audio.addEventListener('loadedmetadata', ControllerLoadedMetadata);
            audio.addEventListener('ended', onEnded);
            return () => {
                audio.removeEventListener('loadedmetadata', ControllerLoadedMetadata);
                audio.removeEventListener('ended', onEnded);
            };
        }
    }, [audioRef, files]);
    useEffect(() => {
        if (!isFirstLoad) {
            audioRef.current.oncanplaythrough = () => {
                audioRef.current.play();
            };
        }
    }, [currentSong]);
    if (!currentSong) {
        return <div>Loading...</div>;
    }
    return (
        <AudioContext.Provider value={{ currentSong, audioRef, files, currentIndex, onPrev, onNext, musicPlaying, duration, volume, setVolume, isMuted, setIsMuted, isLooping, setIsLooping, currentLyc, setCurrentLyc, lyricList, lyricRefs, albumCovers }}>
            <audio src={`http://localhost:3001/music/audios/${encodeURIComponent(currentSong.name)}.${currentSong.type}`} ref={audioRef} />
            {children}
        </AudioContext.Provider>
    );
};
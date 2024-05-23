import React, { useState, useEffect } from 'react';
import server from '../../services/api';

const MusicPlayer = () => {
    const [files, setFiles] = useState([]);
    const [currentFile, setCurrentFile] = useState('');

    useEffect(() => {
        server.getMusic()
            .then(response => response.data)
            .then(file => {
                setFiles(file);
                setCurrentFile(`audios/${file[0].data}.mp3`);
            });
    }, []);

    const musicPlaying = (index) => {
        setCurrentFile(`audios/${files[index].title}.mp3`);
    };

    return (
        <section>
            <audio id="audio1" src={currentFile} controls/>
            <h2>播放列表</h2>
            <table id="myTable">
                <tbody>
                    {files.map((file, index) => (
                        <tr key={index}>
                            <td>
                                <input
                                    type="text"
                                    className="ML"
                                    readOnly
                                    value={file.title}
                                    onClick={() => musicPlaying(index)}
                                />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </section>
    );
};

export default MusicPlayer;
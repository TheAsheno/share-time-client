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
                setCurrentFile(`audio/${file[0].data}.mp3`);
                console.log(currentFile);
            });
    }, []);

    const musicPlaying = (index) => {
        setCurrentFile(`audio/${files[index].data}.mp3`);
    };

    return (
        <div>
            <audio id="audio1" src={currentFile} controls />
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
        </div>
    );
};

export default MusicPlayer;
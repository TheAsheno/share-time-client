import React from "react";

const List = ({ files, musicPlaying, currentIndex }) => {
    const handleClick = (index) => {
        musicPlaying(index);
    };
    return (
        <div className="list-border">
            <h4 className="list-name">PlayList</h4>
            <hr className="divider" style={{ border: 'none', borderTop: '2px solid #ffffff' }} />
            <table className="music-list">
                <tbody>
                    {files.map((file, index) => (
                        <tr key={index}>
                            <td>
                                <div className="list-item" onClick={() => handleClick(index)}>
                                    <img src={`http://localhost:3001/music/covers/${encodeURIComponent(file.album)}.jpg`} alt={file.name} className="music-image" />
                                    <div>
                                        <p className={`music-name ${currentIndex === index ? 'selected' : ''}`}>{file.name}</p>
                                        <p className="music-author">{file.artist}</p>
                                    </div>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default List;
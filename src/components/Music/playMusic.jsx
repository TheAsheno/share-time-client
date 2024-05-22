import React from 'react';

const PlayMusic = () => {
    return (
        <div>
            <audio controls='controls'></audio>
            <h2>播放列表</h2>
            <div className="musicList">
                <table id="myTable"></table>
            </div>
            <button>上一首</button>
            <button>下一首</button>
            <button id="music_rand">随机播放</button>
            <input type="checkbox" id="loop_ck" />
            <label htmlFor="loop_ck">单曲循环</label>
            <style jsx="true">{`
                .musicList{width: 300px; height: 10em;border: 1px solid black;table-layout: fixed;}
                #myTable{width: 100%;border: 1px solid black;border-collapse: collapse;table-layout: fixed;overflow-y: auto;}
                td{text-align: left;font-weight: 700; border: 1px solid black;}
                th{text-align: left;writing-mode: vertical-rl;transform: rotate(180deg);padding: 0.25em;vertical-align: text-bottom;border: 1px solid black}
                .ML{width: 95.5%;padding-left: 0.5em;outline: none;cursor: pointer}
            `}</style>
        </div>
    )
}

export default PlayMusic;
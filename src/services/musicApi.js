import http from "../http-common";

const getMusicList = () => {
    return http.get("/api/musiclist");
}

const getLyrics = (song) => {
    return http.get(`/music/lyrics/${song}.lrc`);
}

const musicServer = {
    getMusicList,
    getLyrics
}

export default musicServer;
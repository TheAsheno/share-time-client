import { httpLocal } from "../http-common";

const getMusicList = () => {
    return httpLocal.get("/api/musiclist");
}

const getLyrics = (song) => {
    return httpLocal.get(`/music/lyrics/${song}.lrc`);
}

const musicServer = {
    getMusicList,
    getLyrics
}

export default musicServer;
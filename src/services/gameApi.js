import http from "../http-common";

const getGameList = () => {
    return http.get("/game/gamelist");
}

const gameServer = {
    getGameList
}

export default gameServer;
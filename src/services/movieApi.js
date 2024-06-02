import http from "../http-common";

const getMovieList = () => {
    return http.get("/api/movielist");
}

const movieServer = {
    getMovieList
}

export default movieServer;
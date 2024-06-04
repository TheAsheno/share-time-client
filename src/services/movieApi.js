import http from "../http-common";

const getMovieList = () => {
    return http.get("/movie/movielist");
}

const movieServer = {
    getMovieList
}

export default movieServer;
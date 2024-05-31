import { httpLocal } from "../http-common";

const getMoviesList = () => {
    return httpLocal.get("/api/movieslist");
}

const movieServer = {
    getMoviesList
}

export default movieServer;
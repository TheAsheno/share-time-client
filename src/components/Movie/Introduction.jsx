import React, {useEffect, useState} from "react";
import Item from "./Item";
import movieServer from "../../services/movieApi";

const Introduction = () => {
    const [movies, setMovies] = useState([]);
    useEffect(() => {
        movieServer.getMoviesList()
            .then(response => response.data)
            .then(movies => {
                console.log(movies);
                setMovies(movies);
            });
    }
    , []);
    return (
        <section className="introduction">
            <div className="container">
                <div className="row">
                    <Item id="target1" />
                    <Item id="target2" />
                    <Item id="target3" />
                    <Item id="target4" />
                </div>
            </div>
        </section>
    );
}

export default Introduction;
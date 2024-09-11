import React from 'react';
import HorrorMovies from "./HorrorMovies";
import ComedyMovies from "./ComedyMovies";
import AnimeMovies from "./AnimeMovies";

function Movies(props) {
    return (
        <div className='MovieAction'>
            <div className="container">
                <HorrorMovies/>
                <ComedyMovies/>
                <AnimeMovies/>
            </div>
        </div>
    );
}

export default Movies;
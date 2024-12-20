import React from 'react';
import HorrorMovies from "./HorrorMovies";
import ComedyMovies from "./ComedyMovies";
import AnimeMovies from "./AnimeMovies";
import FantasyMovies from './FantasyMovies';

function Movies(props) {
    return (
        <div className='MovieAction'>
            <div className="container">
                <HorrorMovies/>
                <ComedyMovies/>
                <AnimeMovies/>
                <FantasyMovies/>
            </div>
        </div>
    );
}

export default Movies;